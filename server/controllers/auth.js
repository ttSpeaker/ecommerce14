const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createUser, findUserByEmail, updateUser } = require('../models/user');
const salt = 10;

const registerUser = async (req, res, next) => {
  // save user with model
  try {
    const userBody = req.body;
    if (await searchUserByEmailExists(userBody.email)) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }
    //validate password
    const hash = await bcrypt.hash(userBody.password, salt);
    userBody.password = hash;
    const newUser = await createUser(userBody);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUserByEmailExists = async (email) => {
  const user = await findUserByEmail(email);
  return user;
};

const loginUser = async (req, res, next) => {
  const userBody = req.body;
  const user = await searchUserByEmailExists(userBody.email);
  if (user) {
    try {
      const result = await bcrypt.compare(userBody.password, user.password);
      if (result) {
        const accessToken = await jwt.sign(
          {
            userId: user._id,
            email: user.email,
            role: user.role || 'none',
          },
          process.env.ACCES_TOKEN_KEY,
          { expiresIn: 10 }
        );
        const refreshToken = await jwt.sign(
          {
            userId: user._id,
            email: user.email,
            role: user.role || 'none',
          },
          process.env.REFRESH_TOKEN_KEY,
          { expiresIn: 60 * 60 * 24 }
        );
        if (user.tokens && user.tokens.length > 0) {
          user.tokens.push(refreshToken);
        } else {
          user.tokens = [refreshToken];
        }
        await updateUser(user);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: 'Invalid credentials' });
      return;
    }
  }
  console.log(error);
  res.status(403).json({ message: 'User not found' });
  return;
};

const refreshToken = async (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) {
    res.status(401).json({ message: 'Missing token: not authorized' });
    return;
  }
  const token = tokenHeader.split(' ')[1];
  try {
    const data = await jwt.verify(token, process.env.REFRESH_TOKEN_KEY);

    const user = await findUserByEmail(data.email);

    // encontra el indice del token el la lista
    const index = user.tokens.indexOf(token);
    if (index === -1) {
      res.status(403).json({
        message: 'Token not valid',
        error: 'Token not in valid tokens list',
      });
      return;
    }
    const accessToken = await jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role || 'none',
      },
      process.env.ACCES_TOKEN_KEY,
      { expiresIn: 10 }
    );
    const refreshToken = await jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role || 'none',
      },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: 60 * 60 * 24 }
    );

    user.tokens.splice(index, 1).pop();
    user.tokens.push(refreshToken);
    await updateUser(user);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    res.status(403).json({ message: 'Token not valid', error: error.message });
    return;
  }
};

module.exports = { registerUser, loginUser, refreshToken };
