const express = require('express');
const router  = express.Router();

const Recipe  = require('../models/recipe-model');
const User    = require('../models/user-model');

const fileUploader = require('../config/upload-setup/cloudinary');

router.get('/recipe/add', isLoggedIn, (req, res, next) => {
  res.render('recipe-pages/addRecipe');
})




function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

module.exports = router;