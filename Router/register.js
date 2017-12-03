const express = require("express");
const router = express.Router();
const User = require("../models/Users")
router.get('/signup', function(req,res){
  res.render('register')
})

router.post('/register', function(req, res){
  let error_message=""
  if ((req.body.password !== req.body.confirm)||(req.body.password=="")||(req.body.password.length<9)){
    if (req.body.password !== req.body.confirm){
      error_message="Password and the confirmation do not match!"
      res.render('register',{
        error_message
      })
    };
    if (req.body.password==""){
      error_message="Please enter a password."
      res.render('register',{
        error_message
      })
    }
    if (req.body.password.length<9){
      error_message="Password length needs to be higher than 8."
      res.render('register',{
        error_message
      })
    }
  }
  else{
    User.findOne({email: req.body.email}, function(err, doc){
      if (err){
        error_message="Oppps! Something went wrong, please try again!"
        res.render('register',{
          error_message
        })
      }
      if (doc != null){
        error_message = "There is already an account with this email address.";
        res.render('register',{
          error_message
        })
      }else{
        User.findOne({username: req.body.username}, function(err,doc){
          if (err){
            error_message="Oppps! Something went wrong, please try again!"
            res.render('register',{
              error_message
            })
          }
          if (doc != null){
            error_message="This username is already taken!"
            res.render('register',{
              error_message
            })
          }else{
            const user = new User();
            user.username = req.body.username
            user.password = req.body.password
            user.email=req.body.email
            user.save()
            .then(function(user){
              req.session.userId = user._id
              res.redirect("/")
            })
          }
        })
      }
    })
  }

})
module.exports = router;
