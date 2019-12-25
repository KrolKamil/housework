const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Task = mongoose.model('Task', new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 200
  },
  position: {
    type: String,
    enum: ['TODO', 'INPROGRESS', 'DONE'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    required: true
  }
}));

const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(1).max(200),
    timestamp: Joi.date().timestamp().required()
  });
  return schema.validateAsync(task);
};

const validateTaskEdit = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(30),
    description: Joi.string().min(1).max(200)
  });
  return schema.validateAsync(task);
};

const validTaskPosition = (position) => {
  const positions = ['TODO', 'INPROGRESS', 'DONE'];
  if (positions.includes(position)) {
    return true;
  }
  return false;
};

exports.Task = Task;
exports.validateTask = validateTask;
exports.validTaskPosition = validTaskPosition;
exports.validateTaskEdit = validateTaskEdit;
