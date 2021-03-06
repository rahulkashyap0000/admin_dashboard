const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// route:       GET api/users/test
// description: To test the route
// access:      Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// route:       GET api/users/register
// description: To register an admin
// access:      Public
const User = require("../../models/User");
router.post("/register", (req, res) => {
  errors = {};
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// route:       GET api/users/login
// description: To return json web token
// access:      Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Compare Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "Password Incorrect" });
      }
    });
  });
});

module.exports = router;
