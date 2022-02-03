const router = require("express").Router();
const verify = require("../components/verification");
const Shoes = require("../models/Shoes");

router.get("/", verify, async (req, res) => {
  //Fetch current username
  const username = req.cookies;

  const allShoes = await Shoes.find().lean();
  const userShoes = [];
  let price = 0;

  for (const shoe of allShoes) {
    if (shoe.creator === username.user) {
      userShoes.push(shoe);
      price += shoe.price;
    }
  }

  //Render the page
  res.render("user/profile", { username, userShoes, price });
});

module.exports = router;
