const express = require('express')
const authRouter = express.Router()
const {Register, Login, Logout, DeleteUser} = require('../Controllers/AuthController')


authRouter.post('/register', Register)
authRouter.post('/login', Login)
authRouter.post('/logout', Logout)
authRouter.post('/delete', DeleteUser)






module.exports = authRouter