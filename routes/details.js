const express = require("express");
const router = express.Router();
const Shoes = require("../models/Shoes");
const verify = require("../components/verification");
const path = require("path");

//Middleware
router.use(express.static(path.join(__dirname, "../public")));

//Load the Details page
router.get("/:shoeId", verify, async (req, res) => {
  //Fetch the username of the current user and the current shoe
  const username = req.cookies;
  const shoe = await Shoes.findById(req.params.shoeId).lean();

  //Check if the current user has already bought the shoe
  let bought = false;
  for (const key of shoe.buyers) {
    if (key === username.user) {
      bought = true;
    }
  }

  //Check if the user is the creator of the shoe
  let canEdit = false;
  if (shoe.creator === username.user) {
    canEdit = true;
  }

  //Render the details page with all data
  res.render("shoes/details", { username, shoe, canEdit, bought });
});

//Delete the shoe
router.get("/delete/:shoeId", verify, async (req, res) => {
  //Query the database to delete the shoe
  const shoe = await Shoes.deleteOne({ _id: req.params.shoeId });

  //Redirect to shoes
  res.redirect("/shoes");
});

//Buy the shoe
router.get("/buy/:shoeId", verify, async (req, res) => {
  //Fetch the username
  const username = req.cookies;

  //Add the current user to the list of buyers
  const buyersList = await Shoes.update(
    { _id: req.params.shoeId },
    {
      $push: {
        buyers: username.user,
      },
    }
  );

  //Redirect to details page
  res.redirect(`/details/${req.params.shoeId}`);
});

module.exports = router;
