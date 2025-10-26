const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'DevOps', 'Database', 'Soft Skills', 'Other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  durationInHours: {
    type: Number,
    required: true,
    min: 1
  },
  format: {
    type: String,
    default: 'Video',
    enum: ['Video', 'Article', 'Project', 'Interactive', 'Other']
  },
  estimatedCompletionTime: {
    type: Number,
    min: 1
  },
  resources: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('LearningModule', learningModuleSchema);