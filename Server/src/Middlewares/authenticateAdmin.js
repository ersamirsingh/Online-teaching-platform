const jwt = require('jsonwebtoken')
const User = require('../Model/User')
const redisClient = require('../Config/RedisDB')


const authenticateAdmin = async (req, res, next)=>{


   try {
    
      const {Token} = req.cookies

      if(!Token)
         throw new Error('Token not found')

      const payload = jwt.verify(Token, process.env.SECRET_KEY)

      if(payload?.role != 'admin')
         return res.status(401).json({message: "you're not admin"})

      const isBlocked = await redisClient.exists(`Token ${Token}`)
      if(isBlocked)
         throw new Error('Invalid Token')

      const user = await User.findById(payload._id)
      req.user = user
        
      next()

   } catch (error) {
      return res.status(500).json({message: error.message})
   }
}

module.exports = authenticateAdmin