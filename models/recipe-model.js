const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  cuisine: String,
  difficulty: String,
  time: String,
  rating: String,
  imageUrl: String,
  ingredients: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
  
  }, {
  timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)