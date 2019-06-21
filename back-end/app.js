require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require('path');
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

app.use(express.static(path.join(__dirname, '../front-end', 'build')));

app.get("*/", function(req, res) {
  res.sendFile(path.join(__dirname, '../front-end', 'build', 'index.html'));
})


app.post("/login-confirm", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, saltRounds, function(err, hash) {

    const newUser = new User(
      {
        username: username,
        password: hash
      }
    );

    // check if username is taken
    User.findOne({ username: username }, function(err, foundUser) {
      if(err) {
        console.log(err);
      } else if(!foundUser){
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
      // if (err) {
      //   console.log(err);
      // } else if (foundUser) { // taken --> enter new username
      //   res.send("Username already taken")
      // } else { // not taken --> save username
      //   newUser.save(function(err) {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log("Success, check the database");
      //     }
      //   });
      // }
    });
  });
});

// bcrypt.hash("wrong", saltRounds, function(err, hash) {
//   const newUser = new User({
//     username: "testing2",
//     password: hash
//   });
//
//   // newUser.save(function(err) {
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     console.log("Success, check the database");
//   //   }
//   // });
// });

// testing purposes
// User.findOne({ username: "testing2" }, function(err, foundUser) {
//   if (err) {
//     console.log(err);
//   } else if (!foundUser) {
//     console.log("can't find anyone");
//   } else {
//     bcrypt.compare("wrong", foundUser.password, function(err, result) {
//       if (err) {
//         console.log(err);
//       } else if (result == true) {
//         console.log(foundUser.password);
//       } else {
//         console.log("Nah");
//       }
//     });
//   }
// });

// testing purposes
// User.findOne({username: "testing"}, function(err, foundUser) {
//   if(err) {
//     console.log(err);
//   } else if(!foundUser){
//     console.log("can't find anyone");
//   } else if(foundUser){
//     bcrypt.compare()
//   }
// })

// newUser.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Success, check the database");
//   }
// });

app.listen(4000, function() {
  console.log("Server is running on port 4000");
});
