const mongoose = require('mongoose');
const { Schema } = mongoose;


const lessonSchema = new Schema({

   courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
   },

   title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      unique: true
   },

   videoUrl: {
      type: String,
      required: true,
   },

   resources: [
      {
         type: String, // could be URLs or filenames
      }
   ],

   duration: {
      type: Number, // in minutes
      required: true,
   }

}, { timestamps: true });


const Lesson = mongoose.model('lesson', lessonSchema);
module.exports = Lesson;
