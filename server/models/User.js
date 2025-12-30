const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee'
  }
}, { timestamps: true });


UserSchema.pre('save', async function() {
  
  if (!this.isModified('password')) return;

  try {
    
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    
    throw error;
  }
});

module.exports = mongoose.model('User', UserSchema);
