const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const main = require('./Config/MongoDB')
const redisClient = require('./Config/RedisDB')
const authRouter = require('./Routes/AuthRoutes')
const couresRouter = require('./Routes/CourseRoutes')
const lessonRouter = require('./Routes/LessonRoutes')
const enrollmentRouter = require('./Routes/EnrollmentRoutes')
const quizRouter = require('./Routes/QuizRoutes')
const discussionRouter = require('./Routes/DiscussionRoutes')


app.use(express.json())
app.use(cookieParser())




app.use('/auth', authRouter)
app.use('/course', couresRouter)
app.use('/lesson', lessonRouter)
app.use('/enrollment', enrollmentRouter)
// app.use('/quiz', quizRouter)
app.use('/discussion', discussionRouter)




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



