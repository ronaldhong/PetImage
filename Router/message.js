const express = require("express");
const router = express.Router();
const Message = require("../models/Message")

router.get('/upload', function(req,res){
  res.render('upload')
})
router.post('/message/new' ,function(req,res){
  const message = new Message()
  message.title = req.body.title
  message.body = req.body.body
  message.username = req.user.username
  message.lat = req.body.lat
  message.long=req.body.long
  message.contact= req.body.contact
  message.createAt=Date.now()
  message.save()
  .then(function(){
    res.redirect("/")
  })
  .catch(function(error){
    console.log("MESSAGE ERROR");
    res.render("message", {
      error: error
    })
  })
})
module.exports = router;
