const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { registerValidation } = require("../components/validation");
const upload = multer();

router.get("/", (req, res) => {
  res.render("user/register");
});

router.post("/", upload.none(), async (req, res) => {
  //Validate the data using Joi
  const { error } = registerValidation(req.body);
  if (error) {
    return console.log(error.details[0].message), res.redirect("/register");
  }

  //Check if the email already exists in the database.
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return console.log("Email already exists"), res.redirect("/register");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a user
  const user = new User({
    email: req.body.email,
    full_name: req.body.full_name,
    password: hashedPassword,
  });

  //POST the user to the database:
  try {
    const newUser = await user.save();
    console.log(`The user ${req.body.email} has been created successfully`);
    res.redirect("/login");
  } catch (err) {
    console.log(`Something went wrong`);
    console.log(err);
    res.redirect("/register");
  }
});

module.exports = router;
