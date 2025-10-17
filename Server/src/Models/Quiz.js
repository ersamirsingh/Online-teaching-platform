const mongoose = require('mongoose');
const { Schema } = mongoose;


const quizSchema = new Schema({

   courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
      required: true,
   },

   questions: [
      {
         question: { 
            type: String, 
            required: true 
         },
         options: [
            { 
               type: String, 
               required: true 
            }
         ],
         correctAnswer: { 
            type: String, 
            required: true 
         },
      }
   ],

   answers: [
      {
         studentId: { 
            type: Schema.Types.ObjectId, 
            ref: 'user' 
         },
         responses: [
            {
               questionId: { 
                  type: Schema.Types.ObjectId 
               },
               answer: { 
                  type: String 
               },
            }
         ],
         score: { 
            type: Number, 
            default: 0 
         },
      }
   ],

}, { timestamps: true });



const Quiz = mongoose.model('quiz', quizSchema);
module.exports = Quiz;
