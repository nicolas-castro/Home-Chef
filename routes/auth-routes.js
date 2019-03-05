const express = require('express');
const router  = express.Router();
const User    = require('../models/user-model');
const bcrypt  = require('bcryptjs');
const bcryptSalt = 10;
const passport= require('passport');

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
})

router.post('/register', (req, res, next)=>{

  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userFirstName = req.body.firstName;
  const userLastName = req.body.lastName;

  if(userEmail==''||userPassword==''||userFirstName==''||userLastName==''){
    req.flash('error', 'Please fill out all the fields !')
    res.redirect('signup',)
    return;
  }

  User.findOne({ email: userEmail })
  .then(foundUser =>{
    if(foundUser !== null){
      req.flash('error', 'That email is already register, please use another email or login');
      res.redirect('login');
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    
    User.create({
      email: userEmail,
      password: hashPassword,
      firstName: userFirstName,
      lastName: userLastName,
    })
    .then(user => {
      req.login(user, (err) => {
        if(err){
          req.flash('error', 'Auto login failed, please log in manually');
          res.redirect('/login');
          return;
        }
        res.redirect('/recipes')
      })
    })
    .catch( err => next(err)); //closing User.create
  })
  .catch( err => next(err)); // closing User.findOne
})

router.get('/login', (req,res,next)=>{
  res.render('auth/login');
})

router.post('/login', passport.authenticate ('local', {
  successRedirect: '/recipes',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}))

//////////logout///////////

router.post('/logout', (req, res, next) => {
  req.logout(); // <== .logout() method comes from passport and takes care of the destroying the session for us
  res.redirect('/login');
})

//////////slack///////////

router.get('/slack-login', passport.authenticate('slack'));
router.get('/slack/callback', passport.authenticate('slack', {
  successReturnToOrRedirect:'/recipes',
  successFlash:'Slack login successful!',
  failureRedirect:'/login',
  failureMessage:'Slack login failed. Pease try to login manually. 🙏🏻'
}))

//////////google///////////

router.get('/google-login', passport.authenticate('google', {
  scope: [
    "https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.profile.emails.read"
  ]
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/recipes',
  failureRedirect: '/login',

}))

module.exports = router;