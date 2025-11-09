const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema(
  {
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
      immutable: true,
      validate: {
        validator: function (email) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
        },
        message: 'Please enter a valid email',
      },
    },

    contact: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
      immutable: true,
    },

    password: {
      type: String,
      required: true,
      minLength: [6, 'Password must be at least 6 characters'],
      validate: {
        validator: function (password) {
          return /^(?=.*[A-Z])(?=.*\d)/.test(password);
        },
        message:
          'Password must contain at least one uppercase letter and one number',
      },
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    
  },
  { timestamps: true }
);




const User = mongoose.model('user', userSchema);
module.exports = User;
