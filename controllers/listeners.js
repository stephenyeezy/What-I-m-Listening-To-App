const Listener = require('../models/listener');

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
    .sort(sortKey).exec(function(err, listeners) {
      if (err) return next(err);
      res.render('listeners/index', { listeners, name: req.query.name, sortKey });
    });
  }

  function addSong(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/listeners');
    });
  }
  
  function delSong(req, res, next) {
  
  }