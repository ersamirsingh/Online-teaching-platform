const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const main = require('./Config/MongoDB')
const redisClient = require('./Config/RedisDB')


require('dotenv').config()



app.use(express.json())
app.use(cookieParser())



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



