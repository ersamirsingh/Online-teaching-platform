const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({

   firstName: {
      type: String,
      minlength: 3,
      maxLength: 20,
      required: true,
   },

   lastName: {
      type: String,
      minlength: 3,
      maxLength: 20,
   },

   emailId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      immutable: true
   },

   contact: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
      immutable: true
   },

   password: {
      type: String,
      minLength: 6,
      required: true
   },

   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
   },

})


const User = mongoose.model('user', userSchema)
module.exports = User