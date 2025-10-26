const express = require('express');
const router = express.Router();
const {
  addModule,
  getAllModules,
  getModuleById,
  getModulesByUserId,
  updateModule,
  deleteModule
} = require('../controllers/learningModuleController');
const { validateToken } = require('../authUtils');

router.post('/addModule', validateToken, addModule);
router.post('/getAllModules', validateToken, getAllModules);
router.get('/getModuleById/:id', validateToken, getModuleById);
router.post('/getModulesByUserId', validateToken, getModulesByUserId);
router.put('/updateModule/:id', validateToken, updateModule);
router.delete('/deleteModule/:id', validateToken, deleteModule);

module.exports = router;