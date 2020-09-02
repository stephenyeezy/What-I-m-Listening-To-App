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

// function addSong(req, res, next) {
//   const song = new Song(req.body.song)
//   console.log('look here', song)
//   song.save(function(err) {
//     if (err) return next(err);
//     res.redirect('/users');
//   });
// }

// function delSong(req, res) {
//   Song.findByIdAndDelete(req.params.id, function(err) {
//     res.redirect('/users');
//   });
// }

function addSong(req, res) {
  User.findById(req.params.id, function(err, user) {
    const song = req.body;
    //song.description = song.description.trim();
    console.log('here', song)
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