const express = require('express')
const userRouter = express.Router()
const authenticateUser = require('../Middlewares/authenticateUser')
const authenticateAdmin = require('../Middlewares/authenticateAdmin')
const {GetInfo, UpdateInfo} = require('../Controllers/UserController')



userRouter.get('/info', authenticateUser, GetInfo)
userRouter.patch('/update', authenticateUser, UpdateInfo)



module.exports = userRouter