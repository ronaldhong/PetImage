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
  req.check('username', "Username length must be greater than 6").isLength({min:6})
  req.check('email',"Invlalid email address").isEmail();
  req.check('password',"Password length must be greater than 8").isLength({min:8})
  req.check('password',"Password does not match with the confirm password").equals(req.body.confirm);

  var errors = req.validationErrors();
  if (errors) {
      // Render validation error messages
      var error = errors;
      res.render('register',{
        error
      })
    }
  else {
    User.findOne({email: req.body.email}, function(err, doc){
      if (doc != null){
        console.log("email already exist");
        let error_message = "There is already an account with this email address.";
        res.render('register',{
          error_message
        })
      }else{
        console.log("something's wrong");
        User.findOne({username: req.body.username}, function(err,doc){
          if (doc != null){
            let error_message="This username is already taken!"
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




  // if ((req.body.password !== req.body.confirm)||(req.body.password=="")||(req.body.password.length<9)){
  //   if (req.body.password !== req.body.confirm){
  //     error_message="Password and the confirmation do not match!"
  //     res.render('register',{
  //       error_message
  //     })
  //   }
  //   else{
  //     if ((req.body.password =="")||(req.body.password.length<9)){
  //       error_message="Password length needs to be larger than 8."
  //       res.render('register',{
  //         error_message
  //       })
  //     }
  //   }
  // }
})
module.exports = router;
