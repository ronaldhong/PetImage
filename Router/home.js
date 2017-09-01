const express = require("express");
const router = express.Router();
const message =require("../models/Message")
const http = require('http'),
  httpProxy = require('http-proxy');
let coord=[]

  message.find()
  .then(function(message){
    for (var i = 0; i <  message.length; i++) {
      if (message[i].lat) {
          var location ={title: `${message[i].title}`, time: `${message[i].createAt}`,lat:parseFloat(`${message[i].lat}`), lng:parseFloat(`${message[i].long}`), body: `${message[i].body}`}
          coord.push(location)
        }
      }
      let coord_json =JSON.stringify(coord)
      var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin' : '*' });
        res.write(coord_json); //write a response to the client
        res.end(); //end the response
      }).listen(8080); //the server object listens on port 8080
  })

// storeCoord()
router.get('/', function(req, res){
  res.render("home",{
    user: req.user
  })
})


module.exports = router;
