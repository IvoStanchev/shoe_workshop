const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../components/validation");
const multer = require("multer");
const upload = multer();

//Render login page
router.get("/", (req, res) => {
  res.render("user/login");
});

//Post a login request
router.post("/", upload.none(), async (req, res) => {
  //Validate the data using Joi
  const { error } = loginValidation(req.body);
  if (error) {
    return console.log(error.details[0].message), res.redirect("/login");
  }
  //Check if the email already exists in the database.
  const user = await User.findOne({ email: req.body.email });
  if (!user) return console.log("Email is not found!"), res.redirect("/login");

  //Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return console.log(`Invalid Password`), res.redirect("/login");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token);

  //Set cookies
  res.cookie("auth", token);
  res.cookie("user", req.body.email);

  //Redirect to shoes
  res.redirect("/shoes");
});

module.exports = router;
