const express = require("express");
const router = express.Router();
const User = require("../models/Users")


router.get('/login', function(req, res){
  res.render("login")
})
router.get('/about',function(req,res){
  res.render('about')
})

router.post('/auth', function(req, res){
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }).then(function(user){
    if (user){
      req.session.userId =user._id
      res.redirect("/")
    }else{
      let error = "print message"
      res.render("login",{
        error: error
      })
    }
  })
})
router.post('/logout',function(req, res){
  req.session.destroy(function(){
    res.redirect('/login')
  })
})

module.exports = router;
