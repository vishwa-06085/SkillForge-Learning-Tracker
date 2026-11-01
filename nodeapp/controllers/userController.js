const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../authUtils');

const SALT_ROUNDS = 10;

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ firstName, lastName, mobileNumber, email, role, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByUsernameAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ message: 'Invalid Credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser, getUserByUsernameAndPassword, getAllUsers };
