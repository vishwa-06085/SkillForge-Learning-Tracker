const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const validateToken = (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(400).json({ message: 'Authentication failed' });
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Authentication failed' });
  }
};

module.exports = { generateToken, validateToken };
