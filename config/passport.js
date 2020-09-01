const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Listener = require('../models/listener');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    Listener.findOne({ googleId: profile.id }, function (err, listener) {
      if (err) return cb(err);
      if (listener) {
        return cb(null, listener);
      } else {
        const newlistener = new Listener({
          name: profile.displayName,
          googleId: profile.id,
        });
        newListener.save(function (err) {
          if (err) return cb(err);
          return cb(null, newListener);
        });
      }
    });
  }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      return done(err, user);
    });
  });