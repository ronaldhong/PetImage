const express = require("express");
const router = express.Router();
const Message = require("../models/Message")

router.get('/upload', function(req,res){
  res.render('upload')
})
router.get('/post/edit/:id', function(req,res){
  // console.log(req.params.id);
  console.log(req.user.username);
  Message.find({_id: req.params.id})
  .then(function(messages){
    let message= messages[0]
    // console.log(messages[0]._id);
    res.render('edit',{
      messages: message,
      user:req.user
    })
  })
})
router.post('/edit/:id',function(req,res){
  Message.findOne({_id: req.params.id})
  .then(function(message){
    message.title = req.body.title;
    message.contact = req.body.contact;
    message.body=req.body.body;
    message.lat= req.body.lat;
    message.long=req.body.long;
    message.save()
    .then(function(message){
      res.redirect('/mypost')
    })
    .catch(function(validationError){
      res.redirect('/mypost', {
        validationError: validationError
      })
    })
  })
  // res.redirect('/mypost')
})

router.post('/post/delete/:id',function(req,res){
  Message.remove({_id:req.params.id},function(err, e){
    if (err){
      res.json(err)
    }else{
      res.redirect('/mypost')
    }
  })
})
module.exports = router;
