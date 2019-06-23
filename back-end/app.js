require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true }
);

const loginSchema = {
  username: String,
  password: String
};

const User = new mongoose.model("login", loginSchema);

app.use(express.static(path.join(__dirname, "../front-end", "build")));

app.get("*/", function(req, res) {
  res.sendFile(path.join(__dirname, "../front-end", "build", "index.html"));
});

app.post("/register-confirm", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    // implemting bcrypt
    // converts password to bcrypt
    const newUser = new User({
      username: username,
      password: hash // bcrypt becomes password
    });

    // check if username is taken
    User.findOne({ username: username }, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else if (!foundUser) {
        newUser.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            res.send("Success, check the database");
          }
        });
      } else {
        res.send("Username is already taken");
      }
    });
  });
});

app.post("/login-confirm", function(req, res) {
  let userLoginName = req.body.username;
  let loginPassword = req.body.password;

  User.findOne({username: userLoginName}, function(err, foundUser) {
    if(err) {
      console.log(err);
    } else if(!foundUser) {
      res.send("Incorrect username and / or password");
    } else {
      bcrypt.compare(loginPassword, foundUser.password, function(err, result) {
        if(result == true) {
          res.send("Login successful");
        } else {
          res.send("Incorrect username and / or password");
        }
      })
    }
  })
})


app.listen(4000, function() {
  console.log("Server is running on port 4000");
});
