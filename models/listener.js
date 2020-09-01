var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  text: String
});

var listenerSchema = new mongoose.Schema({
    name: String,
    googleID: String,
    songs: [songSchema]
});

module.exports = mongoose.model('Listener', listenerSchema);