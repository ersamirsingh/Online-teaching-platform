const express = require('express')
const couresRouter = express.Router()
const {CreateCourse, UpdateCourse, DeleteCourse} = require('../Controllers/CourseController')



couresRouter.post('create', CreateCourse)