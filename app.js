//Require express and set the app.
const express = require("express");
const app = express();

//Require Mongoose for MnogoDB
const mongoose = require("mongoose");

//Handle global variables
require("dotenv/config");

//Aditional dependencies
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

//View engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Load the static content
app.use("/public", express.static("public/images"));
app.use("/styles", express.static("public/styles"));

//Route values
const home = require("./routes/home");
const registerPage = require("./routes/register");
const loginPage = require("./routes/login");
const shoes = require("./routes/shoes");
const logout = require("./routes/logout");
const create = require("./routes/create");
const details = require("./routes/details");
const edit = require("./routes/edit");
const profile = require("./routes/profile");

//Routes
app.use("/", home);
app.use("/register", registerPage);
app.use("/login", loginPage);
app.use("/shoes", shoes);
app.use("/logout", logout);
app.use("/create", create);
app.use("/details", details);
app.use("/edit", edit);
app.use("/profile", profile);

//Establish connection to the database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log(`Database connection was successfull.`);
  }
);

//Define port and start express
const port = process.env.PORT || 3000;
app.listen(
  port,
  console.log(
    `The server started on port ${port}. Access via http://localhost:3000/.`
  )
);
