const Lesson = require('../Models/Lesson')
const Course = require('../Models/Course')





const addLesson = async (req, res) => {

   try {

      const { courseId, title, videoUrl, resources, duration } = req.body;

      const course = await Course.findById(courseId);
      if (!course)
         return res.status(404).json({ message: "Course not found" });

      const lesson = await Lesson.create({
         courseId,
         title,
         videoUrl,
         resources,
         duration,
      });

      // console.log(course?.lessons)

      course.lessons.push(lesson._id);
      await course.save();

      res.status(201).json({
         message: "Lesson added successfully",
         lesson,
      });

   } catch (error) {
      res.status(500).json({ 
         message: error.message 
      });
   }
};




const deleteLesson = async (req, res) => {


   try {

      const { id } = req.params;
      if(!id)
         return res.status(404).json({
            message: 'Invalid request'
         })

      const deletedLesson = await Lesson.findByIdAndDelete(id);
      if (!deletedLesson)
         return res.status(404).json({ 
            message: 'Lesson not found' 
         });
      

      await Course.updateOne(
         { _id: deletedLesson.courseId },
         { $pull: { lessons: deletedLesson._id } }
      );

      res.status(200).json({ message: 'Lesson deleted successfully' });

   } catch (error) {
      console.error(error);
      res.status(500).json({ 
         message: 'Internal server error', 
         error: error.message 
      });
   }

};




const updateLesson = async (req, res)=>{


   try {

      const data = req.body
      if(!data)
         return res.status(400).json({
            message: 'Nothing for update'
         })
      
      const {id} = req.params
      if(!id)
         throw new Error('Invalid request')

      let lesson = await Lesson.findOne({_id:id})
      if(!lesson)
         return res.status(404).json({
            message: 'Lesson not found'
         })

      lesson = await Lesson.findByIdAndUpdate({_id: id}, data, {new: true});
      res.status(201).json({
         success: true,
         message: 'lesson updated successfully',
         lesson
      })
      
   } catch (error) {

      res.status(500).json({
         message: "Internal server error",
         error: error.message
      })
      
   }
}



const fetchAllLessons = async (req, res) => {

   try {

      const {courseId} = req.params
      if(!courseId)
         return res.status(400).json({
            success: false,
            message: 'CourseId not found'
         })
      
      const lessons = await Lesson.find({courseId})
      if(!lessons)
         return res.status(404).json({
            message: 'Lessons not found'
         })

      res.status(201).json({
         success: true,
         lessons,
      })

   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         message: error.message
      })
   }
}





module.exports = {addLesson, deleteLesson, updateLesson, fetchAllLessons}