const express = require("express");
const router = express.Router();
const message = require("../models/Message")



router.get('/share', function(req,res){
  message.find().sort({"createAt": "desc"})
  .then(function(messages){
    let list = messages
    res.render("share",{
      messages: messages,
      comments: list,
      user: req.user
    })
  })
})

router.get('/mypost', function(req,res){
  message.find({username: req.user.username})
  .then(function(messages){
    let list=messages
    let edit="print edit";
    res.render("share",{
      messages:messages,
      user:req.user,
      comments: list,
      edit: edit
    })
  })
})

router.post('/comment/post/:id', function(req,res){
  // console.log(req.params.id);
  message.findOne({_id: req.params.id})
  .then(function(message){
    body = req.body.name;
    user = req.user.username
    createAt = Date()
    console.log(createAt);
    message.comments.push({body: body, user:user, createAt:createAt})
    message.save()
    .then(function(){
      res.redirect('/share')
    })
    .catch(function(error){
      res.redirect('/share')
    })
  })
})



module.exports = router;
