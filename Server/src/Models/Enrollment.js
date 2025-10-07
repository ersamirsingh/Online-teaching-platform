const mongoose = require('mongoose');
const { Schema } = mongoose;



const enrollmentSchema = new Schema({

   courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
   },

   studentId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
   },

   progress: {
      type: Number,
      default: 0, // percentage (0–100)
      min: 0,
      max: 100,
   }
   
}, { timestamps: true });

const Enrollment = mongoose.model('enrollment', enrollmentSchema);
module.exports = Enrollment;
