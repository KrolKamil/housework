const mongoose = require('mongoose');
const joi = require('@hapi/joi');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true
  }
}));

const validateUser = (user) => {
  const schema = {
    name: joi.string().min(5).max(50).required(),
    password: joi.string().min(5).max(255).required()
  };
  return joi.validate(user, schema);
};

exports.User = User;
exports.validateUser = validateUser;
