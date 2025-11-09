const Course = require("../Models/Course")
const Quiz = require("../Models/Quiz")
const Lesson = require('../Models/Lesson')



const createQuiz = async (req, res) => {
   
   try {

      // console.log(req.body);
   
      if (!req.body || !req.body.questions || req.body.questions.length === 0) {
         return res.status(400).json({
            message: 'Quiz data not found or empty'
         });
      }

      const {courseId, lessonId} = req.params
      if(!courseId || !lessonId)
         return res.status(400).json({
            message: 'CourseId not found'
         })

      const course = await Course.findById(courseId)
      if(!course)
         return res.status(404).json({
            message: 'Unavailable course'
         })

      const lesson = await Lesson.findById(lessonId)
      if(!lesson)
         return res.status(404).json({
            message: 'Unavailable Lesson'
         })


      const quiz = await Quiz.create({...req.body, courseId, lessonId})
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
      // console.log(req.params)

      const {courseId, lessonId} = req.params
      if(!courseId)
         return res.status(400).json({
            message: 'CourseId not found'
         })

      if(!lessonId)
         return res.status(400).json({
            message: 'LessonId not found'
         })
      
      const quiz = await Quiz.find({courseId, lessonId}) || {}
      if(!quiz || quiz.length===0)
         return res.status(400).json({
            success: false,
            message: 'Quiz not found'
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
      
      const {lessonId, courseId} = req.body
      const responses = req.body.answers
      const studentId = req.user?._id
      // console.log(req.user)
      if(!lessonId || !courseId)
         return res.status(400).json({
            success: false,
            message: 'QuizId or CourseId not found'
         })

      if(!studentId)
         return res.status(400).json({
            success: false,
            message: 'StudentId not found'
         })
      
      if(!responses || responses.length === 0)
         return res.status(400).json({
            success: false,
            message: 'Responses not found'
         })


      const quiz = await Quiz.findOne({lessonId, courseId})
      if(!quiz)
         return res.status(400).json({
            success: false,
            message: 'Quiz not found'
         })


      // console.log(quiz)

      let score = 0
      responses.forEach((response, index) => {
         if(response.answer === quiz.questions[index].correctAnswer)
            score++
      })

      const existing = quiz.answers.find(a => a.studentId.toString() === studentId.toString());
      // console.log(existing)
      if(existing){
         // console.log(existing)
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




const updateQuiz = async (req, res)=>{


   try {
      
      const {id} = req.params
      if(!id)
         return res.status(400).json({
            message: 'Id not found'
         })

      const quiz = await Quiz.findById(id)
      if(!quiz)
         return res.status(400).json({
            message: 'Quiz not found'
         })

      const updated = await Quiz.findByIdAndUpdate(id, req.body)
      res.status(201).json({
         success: true,
         updated
      }) 
   } catch (error) {
      
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
         error: error.message
      })
   }
}


module.exports = {createQuiz, getQuizes, submitQuiz, updateQuiz}