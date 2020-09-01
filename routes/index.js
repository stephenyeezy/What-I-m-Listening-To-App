var router = require('express').Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.redirect('/listeners')
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/listeners',
    failureRedirect: '/listeners',
  }
));

// Logging out
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/listeners');
});

module.exports = router;
