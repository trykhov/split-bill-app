
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const keys = require('./keys');
const md5 = require('md5');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});

const loginSchema = {
  username: String,
  password: String
};

const User = new mongoose.model('login', loginSchema);

const newUser = new User({
  username: "testing",
  password: md5("password-test")
});

// testing purposes
User.findOne({username: "testing", password: md5("hi")}, function(err, foundUser) {
  if(err) {
    console.log(err);
  } else if(!foundUser){
    console.log("can't find anyone");
  } else {
    console.log("Logged in!");
  }
})

// newUser.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Success, check the database");
//   }
// });



app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
