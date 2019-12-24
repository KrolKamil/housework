const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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

// const validateUser = (user) => {
//   const schema = {
//     name: joi.string().min(5).max(50).required(),
//     password: joi.string().min(5).max(255).required()
//   };
//   return joi;
// };

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validateAsync(user);
};

exports.User = User;
exports.validateUser = validateUser;
