const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'checked out'],
    default: 'available'
  },
  checkedOutBy: {
    type: String,
    default: ''
  },
  dueDate: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Book', bookSchema);