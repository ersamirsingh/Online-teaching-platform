const Course = require("../Models/Course")
const Quiz = require("../Models/Quiz")



const createQuiz = async (req, res) => {
   
   try {

      // console.log(req.body);
   
      if (!req.body || !req.body.questions || req.body.questions.length === 0) {
         return res.status(400).json({
            message: 'Quiz data not found or empty'
         });
      }

      const {courseId} = req.params
      if(!courseId)
         return res.status(400).json({
            message: 'CourseId not found'
         })

      const course = await Course.findById(courseId)
      if(!course)
         return res.status(404).json({
            message: 'Unavailable course'
         })


      const quiz = await Quiz.create({...req.body, courseId})
      if(!quiz)
         return res.status(404).json({
            message: 'Quiz not created'
         })
      // console.log(quiz)
      res.status(201).json({
         success: true,
         quiz
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
         error: error.message
      })
      
   }
}



const getQuizes = async (req, res) => {
   
   try {
      // console.log(req.body)

      const {courseId} = req.body
      if(!courseId)
         return res.status(400).json({
            message: 'CourseId not found'
         })

      const quiz = await Quiz.find({courseId})
      if(!quiz)
         return res.status(404).json({
            message: 'Unavailable course'
         })

      res.status(201).json({
         success: true,
         quiz
      })
      
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
         error: error.message
      })
   }
}



const submitQuiz = async (req, res) => {

   try {
      
      const {quizId} = req.params
      const {responses} = req.body
      const studentId = req.user?._id
      // console.log(req.user)
      if(!quizId)
         return res.status(400).json({
            message: 'QuizId not found'
         })

      if(!studentId)
         return res.status(400).json({
            message: 'StudentId not found'
         })
      
      if(!responses || responses.length === 0)
         return res.status(400).json({
            message: 'Responses not found'
         })

      const quiz = await Quiz.findById(quizId)
      if(!quiz)
         return res.status(400).json({
            message: 'Quiz not found'
         })

      // console.log(quiz)

      let score = 0
      responses.forEach((response, index) => {
         if(response.answer === quiz.questions[index].correctAnswer)
            score++
      })

      const existing = quiz.answers.find(a => a.studentId.toString() === studentId.toString());
      console.log(existing)
      if(existing){
         console.log(existing)
         existing.score = score
         existing.responses = responses
      }
      else{
         quiz.answers.push({ studentId, responses, score })
      }

      await quiz.save()
      // console.log(quiz)
      res.status(201).json({
         success: true,
         score
      })
      
      

   } catch (error) {
      
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
         error: error.message
      })
   }
   
}



module.exports = {createQuiz, getQuizes, submitQuiz}