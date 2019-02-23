const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  slackId: String,
  googleId: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)