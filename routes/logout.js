const router = require("express").Router();

//Logout by clearing the cookies.
router.get("/", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
