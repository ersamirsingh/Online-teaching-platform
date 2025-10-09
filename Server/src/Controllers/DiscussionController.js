const Course = require('../Models/Course')
const Discussion = require('../Models/Discussion')




const createDiscussion = async (req, res)=>{

   try {

      const {userId, courseId, message} = req.body
      if(!userId || !courseId || !message)
         return res.status(400).json({
            message: 'all fields required'
         })

      const course = await Course.findById(courseId)
      if(!course)
         return res.status(404).json({
            message: 'course not found'
         })

      const discussion = await Discussion.create({userId, courseId, message});
      if(!discussion)
         return res.status(404).json({
            message: 'Discussion not Created'
         })

      res.status(201).json({
         success: true,
         discussion
      })
      
   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         error: error.message
      })
   }
}




const addReply = async (req, res)=>{

   try {

      const {id} = req.params
      const {userId, message} = req.body
      if(!userId || !message)
         return res.status(400).json({
            message: 'All fields are required',
         })

      const discussion = await Discussion.findById(id)
      if(!discussion)
         return res.status(404).json({
            message: 'Discussion not found'
         })

      discussion.replies.push({userId, message})
      await discussion.save()

      res.status(201).json({
         message: 'Reply added',
         discussion
      })
      
      
   } catch (error) {
      
   }
}




const getDiscussionsByCourse = async (req, res) => {

   try {

      const courseId  = req.params.id;
      console.log(req.params)
      if(!courseId)
         return res.status(400).json({
            message: 'Course id not found'
         })

      const discussions = await Discussion.find({ courseId })
         .populate('userId', 'firstName lastName role')
         .populate('replies.userId', 'firstName lastName role');

      if (!discussions.length)
         return res.status(404).json({ 
            message: 'No discussions found for this course' 
         });

      res.status(200).json({ discussions });

   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }
};




const deleteDiscussion = async (req, res) => {

   try {
      const { id } = req.params;

      const deleted = await Discussion.findByIdAndDelete(id);
      if (!deleted)
         return res.status(404).json({ message: 'Discussion not found' });

      res.status(200).json({ message: 'Discussion deleted successfully' });
   } catch (error) {
      res.status(500).json({
         message: 'Internal server error',
         error: error.message,
      });
   }

};





module.exports = {createDiscussion, addReply, getDiscussionsByCourse, deleteDiscussion}