const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function capitalize (val) {
  if (typeof val !== 'string') {
      val = '';
  }
  return val.charAt(0).toUpperCase() + val.substring(1);
}

const recipeSchema = new Schema({
  title: {
    type : String,
    set: capitalize
  },
  cuisine: { 
    type: String, 
    set: capitalize
  },
  difficulty: String,
  time: String,
  rating: String,
  imageUrl: String,
  // likes: [
  //   {
  //   theUser: { type: Schema.Types.ObjectId, ref: 'User'},
  //   like: Number,
  //   }
  // ],
  likes: [],
  ingredients: [],
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
  
  }, {
  timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)