const express = require("express");
const router = express.Router();
const message = require("../models/Message")



router.get('/share', function(req,res){
  message.find().sort({"createAt": "desc"})
  .then(function(messages){
    for (var i = 0; i < messages.length; i++) {
      console.log(messages[i].lat);
    }
    res.render("share",{
      messages: messages,
      user: req.user
    })
  })
})



module.exports = router;
