const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.auth;
  if (!token) return res.redirect("/login"), console.log("Invalid Token");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("Verified");
    req.user = verified;
    next();
  } catch (error) {
    console.log("Invalid Token");
    res.redirect("/login");
  }
};
