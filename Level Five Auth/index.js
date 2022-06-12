if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ************ IMPORT ************

const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const initPassport = require("./config/passport-config");

//  Initialize Passport

initPassport(passport);

const app = express();

// Middlewares

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

// Routes

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("index");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.get("/", checkAuthenticated, (req, res) => {
  res.render("dashboard");
});

app.post("/login",checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/register", checkNotAuthenticated, (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const user = new User({
        username: req.body.username,
        password: hash,
      });
      user.save().then(() => {
        console.log("User saved");
        res.redirect("/login");
      });
    });
  });
});

app.delete("/logout", (req, res) => {
  req.logOut(
    req.session.destroy(() => {
      res.redirect("/login");
    })
  );
});

app.listen(5000, () => {
  console.log("Server is running on port 3000");
});
