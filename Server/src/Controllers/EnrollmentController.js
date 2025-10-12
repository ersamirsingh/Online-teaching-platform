const Enrollment = require('../Models/Enrollment');
const Course = require('../Models/Course');
const User = require('../Models/User')



const createEnrollment = async (req, res) => {

   try {
      const { courseId, studentId } = req.body;

      if (!courseId || !studentId) 
         return res.status(400).json({ 
            message: 'Course ID and Student ID are required' 
         });


      const course = await Course.findById(courseId);
      if (!course) {
         return res.status(404).json({ 
            message: 'Course not found' 
         });
      }

      const student = await User.findById(studentId)
      if (!student) {
         return res.status(404).json({ 
            message: 'Student not found' 
         });
      }

      const existing = await Enrollment.findOne({ courseId, studentId });
      if (existing) 
         return res.status(400).json({ 
            message: 'Student already enrolled in this course' 
         });
      

      const enrollment = await Enrollment.create({ courseId, studentId });
      res.status(201).json({
         message: 'Enrollment successful',
         enrollment,
      });

   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }
};




const getEnrollmentsByStudent = async (req, res) => {

   try {
      const { studentId } = req.params;
      if(!studentId)
         return res.status.json({
            message: 'StudentId not found'
         })

      const student = await User.findById(studentId)
      if(!student)
         return res.status(404).json({
            message: 'Student not found'
         })

      const enrollments = await Enrollment.find({ studentId }).populate('courseId', 'title category price thumbnail');
      if(enrollments.length == 0)
         return res.status(404).json({
            message: 'Enrollment not found'
         })

      res.status(200).json({
         message: 'Enrollments fetched successfully',
         enrollments,
      });
      
   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }
};




const updateProgress = async (req, res) => {

   try {
      const { id } = req.params;
      const { progress } = req.body;
      if(!id || !progress)
         return res.status(400).json({
            message: 'Missing fields'
         })

      if (progress == null || progress < 0 || progress > 100)
         return res.status(400).json({ 
            message: 'Progress must be between 0 and 100' 
         });
      

      const enrollment = await Enrollment.findByIdAndUpdate(id, { progress }, { new: true });
      if (!enrollment)
         return res.status(404).json({ 
            message: 'Enrollment not found' 
         });
      

      res.status(200).json({
         message: 'Progress updated successfully',
         enrollment,
      });

   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }
};




const deleteEnrollment = async (req, res) => {

   try {
      const { id } = req.params;
      const enrollment = await Enrollment.findByIdAndDelete(id);
 
      if (!enrollment) {
         return res.status(404).json({ 
            message: 'Enrollment not found' 
         });
      }

      res.status(200).json({
         message: 'Enrollment deleted successfully',
      });

   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }
};



module.exports = { createEnrollment, getEnrollmentsByStudent, updateProgress, deleteEnrollment,};
