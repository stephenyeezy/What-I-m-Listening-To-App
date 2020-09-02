const User = require('../models/user');
const Song = require('../models/user');

module.exports = {
  index,
  addSong,
  delSong
};

function index(req, res, next) {
  console.log(req.query)
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    res.render('users/index', { users, name: req.query.name, sortKey });
  });
}

function addSong(req, res, next) {
  req.user.songs.push(req.body);
  req.user.save(function(err) {
    res.redirect('/users');
  });
}

function delSong(req, res, next) {
  Song.findByIdAndDelete(req.params.songs, function(err) {
    res.redirect('/users');
  });
}
