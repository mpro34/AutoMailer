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

  app.get('/api/logout', (req, res) => {
    req.logout(); //kills cookie from request object via passport
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
