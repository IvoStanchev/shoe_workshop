const express = require("express");
const router = express.Router();
const multer = require("multer");
const Shoes = require("../models/Shoes");
const update = multer();
const methodOverride = require("method-override");
const verify = require("../components/verification");
const path = require("path");

//Middleware
router.use(express.static(path.join(__dirname, "../public")));
router.use(methodOverride("_method"));

//Edit the shoe
router.get("/:shoeId", update.none(), verify, async (req, res) => {
  //Fetch the username of the current user and the current shoe
  const username = req.cookies;
  const shoe = await Shoes.findById(req.params.shoeId).lean();

  //Render the edit page with the username and shoe
  res.render("shoes/edit", { username, shoe });
});

//Post the edited content to the Database
router.patch("/:shoeId", update.none(), verify, async (req, res) => {
  //Fetch the username.
  const username = req.cookies;

  //Adjust the price for the shoe since it comes with a dollar sign from the HTML document. Removing the dollar sign $.
  const price = req.body.price.slice(1, req.body.price.length);

  //Set the vars for the shoe
  const shoe = {
    name: req.body.name,
    price: price,
    image: req.body.image,
    description: req.body.description,
    brand: req.body.brand,
    creator: username.user,
  };

  //Try to edit or show error
  try {
    await Shoes.update({ _id: req.params.shoeId }, shoe);

    //Redirect to details page.
    res.redirect(`/details/${req.params.shoeId}`);
  } catch (err) {
    console.log(err), res.redirect(`/edit/${req.params.shoeId}`);
  }
});

module.exports = router;
