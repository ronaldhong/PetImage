const express = require("express");
const router = express.Router();
const message =require("../models/Message")
// const http = require('http')
      // const wss = new WebSocket.Server({ port: 8080 });
      // wss.on('connection', function connection(ws) {
      //   ws.on('message', function incoming(message) {
      //   });
      //
      //   ws.send(coord_json);
      // });


    //
    //   var server = ws.createServer(function (conn) {
    //     console.log("New connection")
    //     conn.on("text", function (str) {
    //       conn.sendText(coord_json)
    //     })
    //     conn.on("close", function (code, reason) {
    //       console.log("Connection closed")
    //     })
    //   }).listen(8080)
    // })

// storeCoord()
router.get('/', function(req, res){
  res.render("home",{
    user: req.user
  })
})


module.exports = router;
