const express = require('express');
const router  = express.Router();

const Recipe  = require('../models/recipe-model');
const User    = require('../models/user-model');

const fileUploader = require('../config/upload-setup/cloudinary');

router.get('/recipe/add', isLoggedIn, (req, res, next) => {
  res.render('recipe-pages/addRecipe');
})

router.post('/create/recipe', fileUploader.single('imageUrl'),(req, res, next) => {
  
  const { title, cuisine, difficulty, time } = req.body;

  const ingr = req.body.ingredients;
  // The / mark the beginning and end of the regular expression
  // The , matches the comma
  // The \s means whitespace characters (space, tab, etc) and the * means 0 or more
  // The $ at the end signifies the end of the string
  const ingrArr = ingr.replace(/,\s*$/, "").split(',');
  Recipe.create({
    title,
    cuisine,
    difficulty,
    time,
    ingredients: ingrArr,
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

router.post('/recipes/:theRecipeId/delete', (req,res,next)=> {
  Recipe.findByIdAndDelete(req.params.theRecipeId)
  .then( theRecipe => {
    res.redirect('/recipes')
    console.log("The Deleted Recipe is : ", theRecipe)
  })
  .catch( err => next(err) )
})



router.get('/recipes/:theRecipeId/edit', (req,res, next)=>{
  Recipe.findById(req.params.theRecipeId)
  .then( foundRecipe => {
      res.render('recipe-pages/editRecipe', { foundRecipe })
    })
    .catch( err => next(err) )
  })

router.post('/recipes/:theRecipeId/update', fileUploader.single('imageUrl'), (req, res, next)=>{

    const { title, cuisine, difficulty, time,  } = req.body;
    const ingr = req.body.ingredients;
    const ingrArr = ingr.replace(/,\s*$/, "").split(',');

    const updatedRecipe = {
      title,
      cuisine,
      difficulty,
      time,
      ingredients: ingrArr,
      owner: req.user._id
    }
    if(req.file){
      updatedRecipe.imageUrl = req.file.secure_url;
    }

    Recipe.findByIdAndUpdate(req.params.theRecipeId, updatedRecipe)
    .then( updatedRecipe => {
      console.log("This Recipe is updated: ",{updatedRecipe})
      res.redirect(`/recipes`)
    })
    .catch( err => next(err) )
  })  

  router.get('/ingredients/:id', (req,res,next) =>{
    Recipe.findById(req.params.id)
  .then( foundRecipe => {
      res.render('recipe-pages/deleteIngredients', { foundRecipe })
    })
    .catch( err => next(err) )
  })

  router.post('/ingredients/:id', (req, res, next) => {
    console.log('body: ', req.body)
    Recipe.findById(req.params.id)
    .then(recipe => {
      const indOfDelEl = req.body.theIndex;
      // console.log('before',recipe.ingredients)

      recipe.ingredients.splice(indOfDelEl, 1)
      // console.log('after:',recipe.ingredients)
      recipe.save()
      .then(() => {
        res.redirect(`/ingredients/${recipe._id}`)
      })
      .catch()
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