// server/models/Test.js
const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    option_a: {
      type: String,
      required: true
    },
    option_b: {
      type: String,
      required: true
    },
    option_c: {
      type: String,
      required: true
    },
    option_d: {
      type: String,
      required: true
    },
    correct_option: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      required: true
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', TestSchema);
