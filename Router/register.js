const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const error_message="";

router.get('/signup', function(req,res){
  res.render('register')
})

router.post('/register', function(req, res){
  //check valdation
  req.check('username', "Username is empty").isLength({min:1});
  req.check('username', "Username length must be greater than 6").isLength({min:7})
  req.check('email',"Invlalid email address").isEmail();
  req.check('password',"Password length must be greater than 8").isLength({min:8})
  req.check('password',"Password does not match with the confirm password").equals(req.body.confirm);
  var errors = req.validationErrors();
  if (errors) {
      // Render validation error messages
      var error = errors;
      res.render('register',{
        error,
        user: req.body.username,
        email: req.body.email
      })
    }
  else {
    User.findOne({email: req.body.email}, function(err, doc){
      if (doc != null){
        let email = req.body.email
        let error_message = "There is already an account with this email address.";
        res.render('register',{
          error_message,
          user: req.body.username,
          email: req.body.email

        })
      }else{
        User.findOne({username: req.body.username}, function(err,doc){
          if (doc != null){
            let error_message="This username is already taken!"
            res.render('register',{
              error_message,
              user: req.body.username,
              email: req.body.email
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
