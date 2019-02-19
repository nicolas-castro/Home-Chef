const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  userName: String,
  slackId: String,
  googleId: String,
  recipies: [{ type: Schema.Types.ObjectId, ref: 'Recipie' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)