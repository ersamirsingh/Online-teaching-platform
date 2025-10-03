const validate = require("../Utils/Validate")
const User = require('../Models/User')



const GetInfo = async (req, res)=>{

   try {

      const {firstName, lastName, emailId, contact, role} = req.user
      res.status(200).json({
         firstName, lastName, emailId, contact,role
      })
      
   } catch (error) {

      res.status(500).json({
         message: error.message
      })
      
   }
}


const UpdateInfo = async (req, res)=>{

   try {

      // console.log(req.body)

      const {emailId, contact} = req.body
      if(emailId) 
         throw new Error('Email is immutable')

      if(contact) 
         throw new Error('Contact is immutable')


      const user = await User.findByIdAndUpdate(req.user?._id, req.body, {runValidators:true, new:true})
      res.status(200).json({
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role
      })

   } catch (error) {

      res.status(400).json({
         message: error.message
      })
      
   }
}











module.exports = {GetInfo, UpdateInfo}