const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const Shoe = require("../models/Shoes");
const verify = require("../components/verification");

//Render creation page
router.get("/", verify, (req, res) => {
  const username = req.cookies;
  res.render("shoes/create", { username });
});

//Create a new offer.
router.post("/", upload.none(), verify, async (req, res) => {
  //Fetch the username of the current user
  const username = req.cookies;

  //Create a new shoe
  const shoe = new Shoe({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    brand: req.body.brand,
    creator: username.user,
  });

  //Save the new shoe or display an error
  try {
    const savedShoe = await shoe.save();
    res.redirect("/shoes");
  } catch (err) {
    console.log({ message: err });
    res.redirect("/shoes");
  }
});

//Export the router
module.exports = router;
