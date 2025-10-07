const Course = require("../Models/Course")




const CreateCourse = async (req, res)=>{

   try {
      
      if(!req.body)
         return res.status(400).json({
            message: 'Info not found'
         })

      if(!req.user)
         throw new Error("Unauthorized access");


      //Need to implement cloudinary for store thumbnail link
         
      
      req.body.teacherId = req.user._id
      const course = await Course.create(req.body)

      res.status(200).json({
         course, 
         message: 'course created successfully'
      })
      
      
   } catch (error) {
      // console.log(error)
      res.status(500).json({
         message: error.message,
      })
   }
}



const UpdateCourse = async (req, res)=>{

   try {

      if(!req.body)
         throw new Error('Missing field')

      const _id = req.user._id
      if(!_id)
         return res.status(404).json({
            message: 'unauthorized access'
         })
   

      let course = await Course.findOne({teacherId: _id})
      if(!course)
         throw new Error('Course not found')

      course = await Course.findOneAndUpdate({teacherId:_id}, req.body, {new:true})


      res.status(200).json({
         course,
         message: 'Course updated successfully'
      })
      
   } catch (error) {
      // console.log(error)
      res.status(500).json({
         messagge: error.message
         
      })
   }
}




const DeleteCourse = async (req, res)=>{

   try {

      const _id = req.user._id
      if(!_id)
         return res.status(404).json({
            message: 'user not found'
         })

      const course = await Course.findOne({teacherId: _id})
      if(!course)
         return res.status(400).json({
            message: 'Course not found'
         })

      await Course.findOneAndDelete({teacherId: _id})

      return res.status(200).json({
         message: 'course deleted successfully'
      })
      
   } catch (error) {

      res.status(500).json({
         message: error.message
      })
      
   }
}



const getCourses = async (req, res)=>{

   try {
      
      const _id = req.user._id
      if(!_id)
         return res.status(404).json({
            message: 'unauthorized access'
         })

      const courses = await Course.find({teacherId: _id})
      // const courses = await Course.find({teacherId: _id}).populate('lessons')
      if(!courses)
         return res.status(400).json({
            message: 'courses not found'
         })


      res.status(200).json({
         courses,
      })


   } catch (error) {
      res.status(500).json({
         message: error.message
      })
   }
}








module.exports = {CreateCourse, UpdateCourse, DeleteCourse, getCourses}