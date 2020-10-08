
const passport = require('passport'),
mainStrategy = require('passport-local').Strategy,
User = require('../models/User.js'),
bcrypt = require('bcryptjs');

module.exports = () => {
  passport.use(new mainStrategy ({
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ where: { email: username } })
    .then((user) => {
      if (!user) {
        return done(null, false); 
      }
      bcrypt.compare(password, user.password, (bcryptErr, verified) => { 
        if (verified) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });  
    })
    .catch((err) => {   
      console.log(err);
      done(err);
    });
  }));
}