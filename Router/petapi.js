const express = require("express");
const router = express.Router();
const Message =require("../models/Message")

router.get('/api/pet', function(req, res){
  Message.find()
  .then(function(pet){
    console.log(pet);
    res.json( {pet:pet} )
  })
})
router.post("/api/pet", function(req,res){
  console.log("title",req.body.title);
  const message= new Message()
  message.title = req.body.title
  message.body = req.body.body
  message.username = req.user.username
  message.lat = req.body.lat
  message.long=req.body.long
  message.contact= req.body.contact
  message.createAt=Date.now()
  message.save()
  .then( function(message){
    // res.status(201).json(message)
    res.redirect("/")
  })
  .catch( function(validationError){
    let error;
    res.status(422).json(validationError)
    res.render('upload',{
      error: error
    })
  })
})
module.exports = router;
