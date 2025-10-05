const express = require('express')
const authRouter = express.Router()
const {Register, Login, Logout, DeleteUser} = require('../Controllers/AuthController')
const authenticateUser = require('../Middlewares/authenticateUser')


authRouter.post('/register', Register)
authRouter.post('/login', Login)
authRouter.get('/logout', authenticateUser,Logout)
authRouter.delete('/delete', authenticateUser,DeleteUser)






module.exports = authRouter