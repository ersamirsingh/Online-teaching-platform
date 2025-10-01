const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const main = require('./Config/MongoDB')
const redisClient = require('./Config/RedisDB')
// const userRouter = require('./Routes/UserRouter')
const authRouter = require('./Routes/AuthRouter')


app.use(express.json())
app.use(cookieParser())



app.use('/auth', authRouter)
// app.use('/user', userRouter)



const InitializeConnection = async ()=>{

   try {

      await Promise.all([main(), redisClient.connect()])
      console.log('DB connected successfully.')

      app.listen(process.env.PORT, ()=>{
         console.log('Listening at PORT', process.env.PORT)
      })
      
   } catch (error) {

      console.log(error.message)
   }
}


InitializeConnection()



