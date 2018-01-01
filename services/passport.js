const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //user.id is shorthand for user._id.$oid in mongo
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//console.developers.google.com - Google+ API Google oath API
//TODO Add Facebook and Linkedin Strategy for Login as well!
passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
          .then((existingUser) => {
            if (existingUser) {
              //We already have a record with the given profile ID
              done(null, existingUser);
            } else {
              //We don't have a record with this profile ID, create new record.
              new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user));

            }
          })
    }
  )
);
