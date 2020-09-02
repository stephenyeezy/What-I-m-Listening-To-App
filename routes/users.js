var router = require('express').Router();
var usersCtrl = require('../controllers/users');

router.get('/users', usersCtrl.index);

router.post('/users/:id/songs', isLoggedIn, usersCtrl.addSong);

router.delete('/songs/:id', isLoggedIn, usersCtrl.delSong);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
