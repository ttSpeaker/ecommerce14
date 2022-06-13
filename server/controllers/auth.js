const { createUser, findUserByEmail } = require('../models/user');

const registerUser = async (req, res, next) => {
  // save user with model
  try {
    const userBody = req.body;
    if (await userWithEmailExists(userBody.email)) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }
    const newUser = await createUser(userBody);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userWithEmailExists = async (email) => {
  const user = await findUserByEmail(email);
  return user;
};

const loginUser = async (req, res, next) => {
  // verify user with model
};

module.exports = { registerUser, loginUser };
