const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  name: { type: String, required: true },
  surname: { type: String },
  photo: {
    type: String,
    trim: true,
  },
  gender: { 
    type: String, 
    required: true, 
  },
  mobile: { 
    type: String, 
    default: '' 
  },
  address: { 
    type: String, 
    default: '' 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1d'
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user'],
  },
});

module.exports = mongoose.model('User', userSchema);
