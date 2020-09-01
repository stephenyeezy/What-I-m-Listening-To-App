var router = require('express').Router();
var listenersCtrl = require('../controllers/listeners');

router.get('/listeners', listenersCtrl.index)

router.post('/songs', isLoggedIn, listenersCtrl.addSong);

router.delete('/songs/:id', isLoggedIn, listenersCtrl.delSong);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
