const jwt = require('jsonwebtoken');

const authAdmin = async (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) {
    res.status(401).json({ message: 'Missing token: not authorized' });
    return;
  }
  const token = tokenHeader.split(' ')[1];
  try {
    const data = await jwt.verify(token, process.env.ACCES_TOKEN_KEY);
    if (data.role !== 'admin') {
      res.status(403).json({ message: 'Not allowed to perform this action' });
      return;
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token not valid', error: error.message });
    return;
  }
};

module.exports = { authAdmin };
