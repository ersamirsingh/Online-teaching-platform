const express = require('express')
const authenticateAdmin = require('../Middlewares/authenticateAdmin')
const lessonRouter = express.Router()
const {addLesson, deleteLesson, updateLesson} = require('../Controllers/LessonController')



lessonRouter.post('/add', authenticateAdmin, addLesson)
lessonRouter.patch('/update/:id', authenticateAdmin, updateLesson)
lessonRouter.delete('/delete/:id', authenticateAdmin, deleteLesson)


module.exports = lessonRouter