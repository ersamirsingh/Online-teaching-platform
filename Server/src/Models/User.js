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
         minLength: 6,
         required: true,
      },

      role: {
         type: String,
         enum: ['user', 'admin'],
         default: 'user',
      },
   },
   { timestamps: true }
);

// Add pre-save hook for password hashing (you'll need to npm install bcrypt)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const bcrypt = require('bcrypt');
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
