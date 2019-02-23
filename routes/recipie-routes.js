const express = require('express');
const router  = express.Router();

const Recipe  = require('../models/recipe-model');
const User    = require('../models/user-model');

const fileUploader = require('../config/upload-setup/cloudinary');

router.get('/recipe/add', isLoggedIn, (req, res, next) => {
  res.render('recipe-pages/addRecipe');
})

router.post('/create/recipe', fileUploader.single('imageUrl'),(req, res, next) => {
  
  const { title, cuisine, difficulty, time , ingredients } = req.body;
  Recipe.create({
    title,
    cuisine,
    difficulty,
    time,
    ingredients,
    imageUrl: req.file.secure_url,
    owner: req.user._id
  })
  .then( newRecipe => {
    console.log('Recipe created: ', newRecipe)
    res.redirect('/recipes');
  } )
  .catch( err => next(err) )
})

router.get('/recipes', (req, res, next) => {
  Recipe.find().populate('owner')
  .then(recipesFromDB => {
    recipesFromDB.forEach(oneRecipe => {
      if(oneRecipe.owner.equals(req.user._id)){
        oneRecipe.isOwner = true;
      }
    })
    res.render('recipe-pages/recipes', { recipesFromDB })
  })
})

function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

module.exports = router;