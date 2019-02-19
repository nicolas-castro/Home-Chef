const passport = require('passport');
const User = require('../../models/user-model');
const flash = require('connect-flash');

require('./local-strategy');
require('./slack-strategy');
require('./google-strategy');

passport.serializeUser((user, cb) => {
  cb(null, user._id);
})

passport.deserializeUser((userId, cb) => {
  User.findById(userId)
  .then(user => {
    cb(null, user);
  })
  .catch( err => cb(err));
})

function passportBasicSetup(basicSetUp){

  basicSetUp.use(passport.initialize());
  basicSetUp.use(passport.session());

  basicSetUp.use(flash());

  basicSetUp.use((req, res, next)=> {
    res.locals.messages = req.flash();
    if(req.user){
      res.locals.currentUser = req.user;
    }
    next();
  })
}

module.exports = passportBasicSetup;