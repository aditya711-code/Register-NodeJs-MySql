const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  // res.send("<h1>Home Page</h1>");
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});
module.exports = router;
