const express = require('express');
const router = express.Router();
const { addUser, getUserByUsernameAndPassword, getAllUsers } = require('../controllers/userController');
const { validateToken } = require('../authUtils');

router.post('/signup', addUser);
router.post('/login', getUserByUsernameAndPassword);
router.get('/getAllUsers', validateToken, getAllUsers);

module.exports = router;