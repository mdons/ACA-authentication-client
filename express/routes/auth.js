const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const AuthController = require("../controllers/auth");

router.post("/signup", (req, res) => {
  AuthController.SignUp(req.body)
    .then(() => res.send("User created successfully"))
    .catch(err => res.send(err.message));
});

router.post("/login", (req, res) => {
  // contents of login route
  AuthController.Login(req.body)
    .then(user => {
      if (user) {
        const token = jwt.sign({ ...user }, "secret");
        res.send(token);
      } else {
        res.status(404).send("user could not be found");
      }
    })
    .catch(err => res.send(err.message));
});

module.exports = router;
