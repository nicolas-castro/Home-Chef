const express = require('express');
const router  = express.Router();

const Recipe = require('../models/recipe-model');
const User    = require('../models/user-model');

router.get('/recipes', (req,res,next)=> {
  if(!req.user){
    req.flash('error', 'Please login');
    res.redirect('/login');
    return
  }
  res.render('user-pages/profile-page')
})

module.exports = router;