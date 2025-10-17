const express = require('express')
const authenticateAdmin = require('../Middlewares/authenticateAdmin')
const authenticateUser = require('../Middlewares/authenticateUser')
const quizRouter = express.Router()
const {createQuiz, getQuizes, submitQuiz} = require('../Controllers/QuizController')


//Quiz for practices
// quizRouter.post('/create', authenticateAdmin, createQuiz)  
// quizRouter.get('/', authenticateUser, getQuiz)
// quizRouter.patch('/:id/update', authenticateAdmin, updateQuiz)  //id -> quizId
// quizRouter.delete('/:id/delete', authenticateAdmin, deleteQuiz) //id -> quizId


//Course wise Quiz
quizRouter.post('/:courseId/create', authenticateAdmin, createQuiz)  //id -> courseId
quizRouter.get('/:courseId', authenticateUser, getQuizes)  //id -> courseId
quizRouter.post('/:quizId/submit', authenticateUser, submitQuiz)
// quizRouter.patch('/:id/update', authenticateAdmin, updateCourseQuiz)  




module.exports = quizRouter