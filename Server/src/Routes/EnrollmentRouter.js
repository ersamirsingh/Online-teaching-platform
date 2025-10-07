const express = require('express')
const enrollmentRouter = express.Router()


enrollmentRouter.get('/enrolled', getAllEnrolledCourses)
enrollmentRouter.post('/:id/enroll', courseEnrollment)
enrollmentRouter.get('/:id/students', enrolledStudent)   ///:id -> course id