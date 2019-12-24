const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 30
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 200
  },
  position: {
    type: String,
    enum: ['TODO', 'INPROGRESS', 'DONE']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
});

module.exports = mongoose.model('Task', TaskSchema);
