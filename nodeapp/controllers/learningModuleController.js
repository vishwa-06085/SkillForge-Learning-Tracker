const LearningModule = require('../models/learningModuleModel');

const addModule = async (req, res) => {
  try {
    await LearningModule.create(req.body);
    res.status(201).json({ message: 'Learning Module Added Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllModules = async (req, res) => {
  try {
    const { sortOrder = 1 } = req.body;
    const modules = await LearningModule.find().sort({ estimatedCompletionTime: sortOrder });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getModuleById = async (req, res) => {
  try {
    const module = await LearningModule.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Learning module not found' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getModulesByUserId = async (req, res) => {
  try {
    const { userId, category } = req.body;
    const filter = { userId };
    if (category) {
      filter.category = category;
    }
    
    const modules = await LearningModule.find(filter);
    if (modules.length === 0) {
      return res.status(404).json({ message: 'Learning module not found' });
    }
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateModule = async (req, res) => {
  try {
    const module = await LearningModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) {
      return res.status(404).json({ message: 'Learning module not found' });
    }
    res.status(200).json({ message: 'Learning Module Updated Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteModule = async (req, res) => {
  try {
    const module = await LearningModule.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Learning module not found' });
    }
    res.status(200).json({ message: 'Learning Module Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addModule,
  getAllModules,
  getModuleById,
  getModulesByUserId,
  updateModule,
  deleteModule
};