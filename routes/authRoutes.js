const passport = require('passport');

module.exports = (app) => {
  //passes GET requests to GoogleStrategy, giving access to users' profile and email
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google')
  );
};
