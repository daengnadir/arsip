const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require("body-parser")
const routers = require("./routers");
const path = require('path');
const session = require("express-session");
// const secretKey = process.env.ACCESS_TOKEN_SECRET || "This is a secret key"



dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false
}));
app.use(routers)
const public = path.resolve(__dirname,'public');
const controllers = path.resolve(__dirname,'controllers');
app.use(express.static(public))
app.use(express.static(controllers))
app.set("view engine", "ejs")
app.set("views", __dirname + "/views");


app.listen(process.env.PORT || 8000, () => {
  console.log("servers is running in port " + process.env.PORT || 8000)
})