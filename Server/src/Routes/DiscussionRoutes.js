const express = require('express')
const {createDiscussion, addReply, getDiscussionsByCourse, deleteDiscussion} = require('../Controllers/DiscussionController')
const authenticateUser = require('../Middlewares/authenticateUser')
const discussionRouter = express.Router()



discussionRouter.post('/', authenticateUser, createDiscussion)
discussionRouter.post('/create', authenticateUser, addReply)
discussionRouter.get('/:id', authenticateUser, getDiscussionsByCourse)   //id -> courseId
discussionRouter.delete('/:id', authenticateUser, deleteDiscussion)   //id -> discussionId





module.exports = discussionRouter