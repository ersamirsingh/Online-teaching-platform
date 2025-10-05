const express = require('express')
const couresRouter = express.Router()
const {CreateCourse, UpdateCourse, DeleteCourse, getCourses} = require('../Controllers/CourseController')
const authenticateAdmin = require('../Middlewares/authenticateAdmin')




couresRouter.get('/', authenticateAdmin, getCourses)
couresRouter.post('/create', authenticateAdmin,CreateCourse)
couresRouter.patch('/update', authenticateAdmin, UpdateCourse)
couresRouter.delete('/delete', authenticateAdmin, DeleteCourse)




module.exports = couresRouter