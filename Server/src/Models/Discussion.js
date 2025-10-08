const mongoose = require('mongoose')
const {Schema} = mongoose 


const replySchema = new Schema({

   userId:{
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },

   message: {
      type: String,
      required: true,
      trim: true
   },

   createdAt:{
      type: DataTransfer,
      default: Date.now(),
   }
}, {_id: false})


const discussionSchema = new Schema({

   userId:{
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },

   message: {
      type: String,
      required: true,
      trim: true
   },

   createdAt:{
      type: DataTransfer,
      default: Date.now(),
   },

   replies: {replySchema}
}, {timestamps: true})



const Discussion = mongoose.model('discussion', discussionSchema)
module.exports = Discussion