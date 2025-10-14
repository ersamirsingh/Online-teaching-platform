const express = require('express')
const couresRouter = express.Router()
const {CreateCourse, UpdateCourse, DeleteCourse, getCourses} = require('../Controllers/CourseController')
const authenticateAdmin = require('../Middlewares/authenticateAdmin')
const authenticateUser = require('../Middlewares/authenticateUser')




couresRouter.get('/', authenticateUser, getCourses)
// couresRouter.post('/:id', authenticateUser, getSingleCourse)
couresRouter.post('/create', authenticateAdmin, CreateCourse)
couresRouter.patch('/update/:id', authenticateAdmin, UpdateCourse)
couresRouter.delete('/delete/:id', authenticateAdmin, DeleteCourse)





module.exports = couresRouter