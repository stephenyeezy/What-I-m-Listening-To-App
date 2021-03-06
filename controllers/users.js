const User = require('../models/user');
const Song = require('../models/user');
const Comment = require('../models/user');

module.exports = {
  index,
  addSong,
  delSong,
  update,
  addComment
};

function index(req, res, next) {
  // console.log(req.query)
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    res.render('users/index', { users, name: req.query.name, sortKey });
  });
}

function addSong(req, res) {
  User.findById(req.params.id, function(err, user) {
    const song = req.body;
    user.songs.push(song)
    user.save(function(err) {
      res.redirect('/users');
    });
  });
}

function delSong(req, res) {
  User.findOne({'songs._id': req.params.id}, function(err, user) {
    const songSubdoc = user.songs.id(req.params.id);
    songSubdoc.remove();
    user.save(function(err) {
      res.redirect('/users');
    });
  });
}

function update(req, res) {
  User.findOne({'songs._id': req.params.id}, function(err, user) {
    const songSubdoc = user.songs.id(req.params.id);
    if (!user._id.equals(req.user.id)) return res.redirect('/users')
    songSubdoc.text = req.body.text;
    user.save(function(err) {
      res.redirect('/users');
    });
  });
}

function addComment(req, res) {
  User.findById(req.params.id, function(err, user) {
    const comment = req.body;
    user.comments.push(comment)
    console.log(comment, 'here')
    user.save(function(err) {
      res.redirect('/users');
    });
  });
}