const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({

   title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 35,
   },
   description: {
      type: String,
      minLength: 10,
      maxLength: 1000,
   },
   category: {
      type: String,
      maxLength: 50,
   },
   price: {
      type: Number,
      required: true,
   },
   lessons: [
      {
        title: String,
        content: String,
        duration: Number,
        order: Number,
      },
   ],
   teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
   },
   thumbnail: {
      type: String,
      required: true,
   }

},{ timestamps: true });




const Course = mongoose.model('course', courseSchema);
module.exports = Course;
