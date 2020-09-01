var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  songs: [songSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);