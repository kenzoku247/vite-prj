const { required } = require('joi');
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
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10
  },
  fullName: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
    unique: true
  },
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
    default: Date.now
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user'],
  },
});

module.exports = mongoose.model('User', userSchema);
