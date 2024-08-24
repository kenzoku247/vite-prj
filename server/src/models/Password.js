const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const PasswordSchema = new Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  resetToken: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  authType: {
    type: String,
    default: 'email',
  },
  loggedSessions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// PasswordSchema.index({ user: 1 });
// generating a hash
PasswordSchema.methods.generateHash = function (salt, password) {
  return bcrypt.hashSync(salt + password);
};

module.exports = mongoose.model('Password', PasswordSchema);
