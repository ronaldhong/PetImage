const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

const commentSchema = new mongoose.Schema(
  {
    body: {type:String, required: true},
    user: {type:String, required:true},
    createAt:{type:Date, required:true}
  }

)
const messageSchema = new mongoose.Schema(
  {
    title: {type:String, required: true},
    body: {type:String, required: true},
    contact: {type:String},
    username:{type:String, required: true},
    createAt: {type: Date, required: true},
    comments: [commentSchema],
    lat: {type:Number},
    long:{type:Number}
    // img:{data:Buffer, }
  }
)
messageSchema.plugin(timestamps);
commentSchema.plugin(timestamps);

const Comment= mongoose.model('Comment', commentSchema);
const Message= mongoose.model('Message', messageSchema);
module.exports = Message;
