const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

const messageSchema = new mongoose.Schema(
  {
    title: {type:String, required: true},
    body: {type:String, required: true},
    contact: {type:String},
    username:{type:String, required: true},
    createAt: {type: Date, required: true},
    lat: {type:Number},
    long:{type:Number}
    // img:{data:Buffer, }
  }
)
messageSchema.plugin(timestamps);

const Message= mongoose.model('Message', messageSchema);
module.exports = Message;
