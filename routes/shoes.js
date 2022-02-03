const router = require("express").Router();
const verify = require("../components/verification");
const Shoes = require("../models/Shoes");

router.get("/", verify, async (req, res) => {
  let username = req.cookies;
  try {
    const shoes = await Shoes.find().lean();

    shoes.sort((a, b) => {
      return b.buyers.length - a.buyers.length;
    });

    console.log(shoes);
    res.render("home/shoes", { username, shoes });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
