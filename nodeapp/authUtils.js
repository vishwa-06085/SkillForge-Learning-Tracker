const jwt = require('jsonwebtoken');

const JWT_SECRET = 'skillforge_secret_key';

const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, JWT_SECRET);
};

const validateToken = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(400).json({ message: 'Authentication failed' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Authentication failed' });
  }
};

module.exports = { generateToken, validateToken };