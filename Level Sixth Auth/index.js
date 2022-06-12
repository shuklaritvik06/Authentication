if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const initPassportMethods = require("./config/passport-config");

initPassportMethods.initGooglePassport();
initPassportMethods.initFacebookPassport();
initPassportMethods.initGitHubPassport();
initPassportMethods.initLinkedInPassport();
initPassportMethods.initTwitterPassport();

const app = express();

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

app.use(passport.initialize());
app.use(passport.session());

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}

app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("home");
});

app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("dashboard", {
    name: req.user.username,
    photo: req.user.photoUrl,
  });
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/github", passport.authenticate("github"));
app.get("/auth/linkedin", passport.authenticate("linkedin"));
app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

app.get(
  "/auth/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

app.get(
  "/auth/github/redirect",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
app.get(
  "/auth/linkedin/redirect",
  passport.authenticate("linkedin", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

app.get(
  "/auth/twitter/redirect",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

app.delete("/auth/logout", checkAuthenticated, (req, res) => {
  req.logOut(function destroySession() {
    res.redirect("/");
  });
});

app.listen(5000, () => {
  console.log("Server is running");
});
