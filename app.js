const express = require("express");
const app = express();
const mustache = require("mustache-express")
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const message =require("./models/Message")
var socket = require('socket.io')
var http = require('http')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'));
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://0.0.0.0:27017/petImage")

var sess = {
  secret: 'ASKDFJAISDFYAKNFQ#$%(@*#@23$)',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {},
  resave: true,
  saveUninitialized: true
}
app.use(session(sess))

const loginRoute= require('./Router/login')
const registerRoute= require('./Router/register')
const homeRoute= require('./Router/home')
const authentication = require("./middleware/authentication")
const uploadRoute= require('./router/message')
const shareRoute=require('./router/share')

app.use(loginRoute)
app.use(registerRoute)
app.use(authentication)
app.use(homeRoute)
app.use(uploadRoute)
app.use(shareRoute)
var server = app.listen(5000, function(){
  console.log("We are listening")
})

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
//socket setup
// let io = socket(server)
// io.on('connection', function(socket){
//   console.log("socket is connected.", socket.id);
// })
