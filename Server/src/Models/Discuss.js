const mongoose = require('mongoose');
const { Schema } = mongoose;


const discussionSchema = new Schema({

   courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
   },

   userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
   },

   message: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
   },

   replies: [
      {
         userId: { 
            type: Schema.Types.ObjectId, 
            ref: 'user' 
         },
         message: { 
            type: String, 
            trim: true, 
            maxLength: 1000 
         },
         createdAt: { 
            type: Date, 
            default: Date.now 
         },
      }
   ]
   
}, { timestamps: true });


const Discussion = mongoose.model('discussion', discussionSchema);
module.exports = Discussion;
