const express = require("express");
const app = express();
const mustache = require("mustache-express")
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const message =require("./models/Message")

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'));
app.use(morgan('tiny'))
app.use(bodyParser.json());
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
const apiRoute= require('./router/petapi')

app.use(loginRoute)
app.use(registerRoute)
app.use(authentication)
app.use(homeRoute)
app.use(uploadRoute)
app.use(shareRoute)
app.use(apiRoute)
app.listen(3000, function(){
  console.log("We are listening")
})
