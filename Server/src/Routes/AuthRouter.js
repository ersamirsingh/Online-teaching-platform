const express = require('express')
const authRouter = express.Router()
const {CreateUser} = require('../Controllers/AuthContoller')


authRouter.post('/register', CreateUser)
// authRouter.post('/login', LoginUser)
// authRouter.post('/logout', LogoutUser)
// authRouter.post('/delete', DeleteUser)





module.exports = authRouter