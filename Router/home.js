const express = require("express");
const router = express.Router();
const message =require("../models/Message")


// storeCoord()
router.get('/', function(req, res){
  console.log(req.user.username);
  res.render("home",{
    user: req.user
  })
})


module.exports = router;
