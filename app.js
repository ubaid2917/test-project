const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT ||3000;
const bodyParser = require("body-parser");

const staticPath = path.join(__dirname, "public");
const viewPath = path.join(__dirname, "views");

app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


// database connection 
const mongoUrl = process.env.MONOGO_URL; 
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("successfully connected with database");
}).catch((error)=>{
    console.log("connection failed with database");
})


//user route
const userRoute = require("./routes/userRoute");
app.use('/', userRoute);

app.listen(port, function (req, res) {
  console.log("Server is listening on port:", port);
});
