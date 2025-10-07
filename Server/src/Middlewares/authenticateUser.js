const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const redisClient = require('../Config/RedisDB')


const authenticateUser = async (req, res, next)=>{


   try {
        
      const {Token} = req.cookies

      if(!Token)
         return res.status(400).json({
            message: 'Unauthorized access'
         })

      const payload = jwt.verify(Token, process.env.SECRET_KEY)

      const isBlocked = await redisClient.exists(`Token ${Token}`)
      if(isBlocked)
         return res.status(400).json({
            message:'Invalid Token'
         })

      const user = await User.findById(payload._id)
      req.user = user
        
      next()

   } catch (error) {
      res.status(500).json({message: error.message})
   }
}


module.exports = authenticateUser