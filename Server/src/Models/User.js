const mongoose = require('mongoose');
const validate = require('../Utils/Validate');
const { Schema } = mongoose;


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

    location:{
      type: String,
      trim: true
    },

    professionalTitle:{
      type: [String],
      validate: {
        validator: (arr) => arr.length <= 20,
        message: 'Maximum 20 titles allowed.',
      }
    },

    dob:{
      type: String,
      maxLength:11,
    },

    bio:{
      type: String,
      maxLength: 1000,
      minLength: 30,
    },

    skills:{
      type: [String],
      validate: {
        validator: (arr) => arr.length <= 25,
        message: 'Maximum 25 interests allowed.',
      },
    },

    interst:{
      type: [String],
      maxLength: 40
    },

    workExperience: [
      {
        role: {
          type: String,
          maxLength: 30,
          minLength: 4,
        },
        organization: {
          type: String,
          maxLength: 50 
        },
        period: {
          type: Number
        }
      }
    ]

    
  },{ timestamps: true }
);




const User = mongoose.model('user', userSchema);
module.exports = User;
