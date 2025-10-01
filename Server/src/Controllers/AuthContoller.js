const validate = require('../Utils/Validate')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const bcrypt = require('bcrypt')




const CreateUser = async (req, res)=>{

   try {

      const {emailId, password, contact} = req.body
      if(!emailId || !password || !contact)
         throw new Error('Missing fields')

      const existingUser = await User.findOne({emailId})
      if(existingUser)
         return res.status(400).json({
            message : 'user already exist with this emailId'
         })


      const result = validate(req.body)
      if(!result.success)
         throw new Error('Invalid format ' + result.message)

      
      req.body.password = await bcrypt.hash(password, 10)

      const user = await User.create(req.body);

      const Token = await jwt.sign({_id: user._id, role: user.role, emailId: user.emailId}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
      res.cookie('Token', Token, {maxAge: parseInt(process.env.JWT_MAX_AGE)})

      res.status(200).json({
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role
      })
      
   } catch (error) {
      
      return res.status(400).json({
         message: error.message,
      })
   }
}


module.exports = {CreateUser}