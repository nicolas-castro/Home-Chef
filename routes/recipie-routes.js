const express = require('express');
const router  = express.Router();

const Recipe  = require('../models/recipe-model');
const User    = require('../models/user-model');
const Review  = require('../models/review-model');

const fileUploader = require('../config/upload-setup/cloudinary');

router.get('/recipe/add', isLoggedIn, (req, res, next) => {
  res.render('recipe-pages/addRecipe');
})

router.post('/create/recipe', fileUploader.single('imageUrl'),(req, res, next) => {
  
  const { title, cuisine, difficulty, time, likes } = req.body;

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
    likes,
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
      oneRecipe.newDate = oneRecipe.updatedAt;
      // console.log(oneRecipe.newDate);
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

  router.get('/recipes/:theRecipeId/view', (req,res, next)=>{
    Recipe.findById(req.params.theRecipeId)
    .then( foundRecipe => {
      console.log("======================= ", foundRecipe.likes);
      counter = 0
      foundRecipe.likes.forEach(oneLike => {
        if(oneLike.like === 1) {
          counter += 1;
        }
      })
      data = {
        foundRecipe: foundRecipe,
        counter: counter
      }
        res.render('recipe-pages/uniqueRecipe', data)
      })
      .catch( err => next(err) )
    })

router.post('/likes/:theRecipeId', (req,res,next)=> {
  Recipe.findByIdAndUpdate(req.params.theRecipeId)
  .then(theRecipe => {
    foundUser = false;
    // console.log("the info to add to the likes ________________________", req.user._id, theRecipe)
    if(theRecipe.likes.length > 0) {
      theRecipe.likes.forEach(oneLike => {
        // console.log("running the foreach loop ;;;;;;;;;;;;;;;;;;;;", oneLike, "the user id >>> ", req.user._id);
        if(oneLike.theUser.toString() === req.user._id.toString()){
          foundUser = true;
          console.log("inside the first if user id found >>>>>>>>>>>>>>>>>>>>>>>>>", oneLike.theUser,  req.user._id)
          if(oneLike.like === 1){
            console.log("if statement that like being changed to 0 <<<<<<<<<<<<<<<<<<")
            oneLike.like = 0
          } else {
            console.log("a like was found and it changes value to 1 //////////////////////");
            oneLike.like = 1
          }
        }
      })
    }
    if(!foundUser) {
      // console.log("there was no like found the current user. in the else statement .....................");
      theRecipe.likes.push({theUser: req.user._id, like: 1})
    }

    // console.log('here: ', theRecipe)
    theRecipe.markModified("likes");
    theRecipe.save()
    .then(updatedRecipe => {
      // console.log("the updated recipe to be displayed ------------ ", updatedRecipe)
      res.redirect(`/recipes/${updatedRecipe._id}/view`)
    })
    .catch( err => next(err) )
  })
  .catch( err => next(err) )
})



function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

module.exports = router;