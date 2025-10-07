const express = require('express')
const enrollmentRouter = express.Router()
const {createEnrollment, getEnrollmentsByStudent, updateProgress, deleteEnrollment} = require('../Controllers/EnrollmentController');
const authenticateUser = require('../Middlewares/authenticateUser');


enrollmentRouter.post('/', authenticateUser, createEnrollment)
enrollmentRouter.get('/:studentId', authenticateUser, getEnrollmentsByStudent)
enrollmentRouter.patch('/:id', authenticateUser, updateProgress)
enrollmentRouter.delete('/:id', authenticateUser, deleteEnrollment)



module.exports = enrollmentRouter