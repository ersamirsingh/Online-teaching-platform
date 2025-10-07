const validate = require('../Utils/Validate');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const redisClient = require('../Config/RedisDB');

const Register = async (req, res) => {

   try {
      const { emailId, password, contact } = req.body;
      if (!emailId || !password || !contact) throw new Error('Missing fields');

      const existingUser = await User.findOne({ emailId });
      if (existingUser)
         return res.status(400).json({
            message: 'user already exist with this emailId',
         });

      const result = validate(req.body);
      if (!result.success) throw new Error('Invalid format ' + result.message);

      req.body.password = await bcrypt.hash(password, 10);

      const user = await User.create(req.body);

      const Token = jwt.sign({ _id: user._id, role: user.role, emailId: user.emailId }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXP });
      res.cookie('Token', Token, { maxAge: parseInt(process.env.JWT_MAX_AGE) });

      res.status(200).json({
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role,
      });

   } catch (error) {
      return res.status(400).json({
         message: error.message,
      });
   }
};




const Login = async (req, res) => {


   try {
      const { emailId, password } = req.body;
      // console.log(password)
      if (!emailId || !password)
         return res.status(404).json({
            messages: 'Invalid credential',
         });

      const user = await User.findOne({ emailId });
      if (!user)
         return res.status(400).json({
            messages: 'user not found',
         });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
         return res.status(404).json({ message: 'Invalid credential' });

      const Token = jwt.sign(
         { _id: user._id, role: user.role, emailId: user.emailId },
         process.env.SECRET_KEY,
         { expiresIn: process.env.JWT_EXP }
      );
      res.cookie('Token', Token, { maxAge: parseInt(process.env.JWT_MAX_AGE) });

      res.status(201).json({
         firstName: user.firstName,
         lastName: user.lastName,
         emailId: user.emailId,
         contact: user.contact,
         role: user.role,
         message: 'user Logged in successully',
      });
   } catch (error) {
      res.status(500).send(error.message);
   }

};




const Logout = async (req, res) => {

   try {
      const { Token } = req.cookies;

      const payload = jwt.decode(Token);

      await redisClient.set(`Token: ${Token}`, 'Blocked');
      await redisClient.expireAt(`Token: ${Token}`, payload.exp);

      res.clearCookie('Token', null, { expiresIn: new Date(Date.now()) });
      res.status(400).json({ message: 'user logged out successfully' });

   } catch (error) {
      res.status(500).json({ message: 'Internal error', error: error.message });
   }
};




const DeleteUser = async (req, res) => {

   try {
      const { Token } = req.cookies;

      if (!Token) {
         return res.status(401).json({
            message: 'Authentication token missing',
         });
      }

      const user = await User.findById(req.user?._id);
      console.log(user)
      if (!user) {
         return res.status(404).json({
            message: 'User not found',
         });
      }

      await User.findByIdAndDelete(req.user._id);

      const payload = jwt.decode(Token);
      await redisClient.set(`Token: ${Token}`, 'Blocked');
      await redisClient.expireAt(`Token: ${Token}`, payload.exp);

      res.clearCookie('Token');
      return res.status(200).json({
         message: 'User deleted successfully',
      });

   } catch (error) {
      return res.status(500).json({
         message: 'Failed to delete user',
         error: error.message,
      });
   }
};




const fetchUser = async (req, res)=>{

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



const updateUser = async (req, res)=>{

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




module.exports = { Register, Login, Logout, DeleteUser, fetchUser, updateUser };
