const express = require('express')
const authenticateAdmin = require('../Middlewares/authenticateAdmin')
const authenticateUser = require('../Middlewares/authenticateUser')
const quizRouter = express.Router()
const {createQuiz, getQuizes, submitQuiz, updateQuiz} = require('../Controllers/QuizController')


//Quiz for practices without any courses
// quizRouter.post('/create', authenticateAdmin, createQuiz)  
// quizRouter.get('/', authenticateUser, getQuiz)
// quizRouter.patch('/:id/update', authenticateAdmin, updateQuiz)  //id -> quizId
// quizRouter.delete('/:id/delete', authenticateAdmin, deleteQuiz) //id -> quizId


//Course wise Quiz
quizRouter.post('/:courseId/create', authenticateAdmin, createQuiz)  //id -> courseId
quizRouter.get('/:courseId', authenticateUser, getQuizes)  //id -> courseId
quizRouter.post('/:quizId/submit', authenticateUser, submitQuiz)  //id -> quizId
quizRouter.patch('/:id/update', authenticateAdmin, updateQuiz)   //id -> quizId




module.exports = quizRouter