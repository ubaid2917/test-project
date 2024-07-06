const express = require('express')
const app = express()

const config = require("../config/config");
const session = require("express-session");
const multer = require('multer');
const path = require('path');

app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    },
});

  const upload = multer({ storage: storage });

const userController = require('../controller/user-controller');


app.get('/', userController.loadLogin);
app.post('/', userController.login); 


// 
app.get('/vehical-info', userController.loadVehicalInfo);
app.post('/vehical-info', upload.array('images', 10), userController.vehicalInfo); // 'images' should match the name attribute of your file input in the form

app.get('/showAllvehical', userController.showAllVehical);
module.exports = app;