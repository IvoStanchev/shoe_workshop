const router = require("express").Router();

//Render the home unregistered page
router.get("/", (req, res) => {
  res.render("home/home");
});

module.exports = router;
