const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createUser, findUserByEmail } = require('../models/user');
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
        const accesToken = await jwt.sign(
          {
            userId: user._id,
            email: user.email,
            role: user.role || 'none',
          },
          process.env.ACCES_TOKEN_KEY,
          { expiresIn: 1800 }
        );
        res.json({ accesToken: accesToken });
        return;
      }
    } catch (error) {}
  }
  res.status(403).json({ message: 'Invalid credentials' });
  return;
};

module.exports = { registerUser, loginUser };
