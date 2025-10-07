const express = require('express')
const authenticateAdmin = require('../Middlewares/authenticateAdmin')
const lessonRouter = express.Router()
const {addLesson, deleteLesson, updateLesson} = require('../Controllers/LessonController')
const authenticateUser = require('../Middlewares/authenticateUser')


// lessonRouter.get('/', authenticateUser, fetchAllLesson)
lessonRouter.post('/add', authenticateAdmin, addLesson)
// lessonRouter.get('/:id', authenticateUser, getLesson)
lessonRouter.patch('/update/:id', authenticateAdmin, updateLesson)   //id -> lesson id
lessonRouter.delete('/delete/:id', authenticateAdmin, deleteLesson)


module.exports = lessonRouter