const express = require('express')
const authRouter = express.Router()
const {Register, Login, Logout, DeleteUser, fetchUser, updateUser, validUser} = require('../Controllers/AuthController')
const authenticateUser = require('../Middlewares/authenticateUser')


authRouter.post('/register', Register)
authRouter.post('/login', Login)
authRouter.get('/logout', authenticateUser, Logout)
authRouter.delete('/delete', authenticateUser, DeleteUser)
authRouter.get('/:id', authenticateUser, fetchUser)
authRouter.patch('/:id', authenticateUser, updateUser)
authRouter.get('/check', validUser)






module.exports = authRouter