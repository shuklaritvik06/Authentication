const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

const MAX_AGE = 1 * 60 * 60;

let error = {};

function findByEmail(email) {
  return User.findOne({ username: email });
}
function createToken(id) {
  return jwt.sign(
    {
      id,
    },
    process.env.SECRET,
    { expiresIn: MAX_AGE }
  );
}
module.exports.get_Start = (req, res) => {
  res.render("index");
};
module.exports.set_Register = (req, res) => {
  res.render("register", { error });
};

module.exports.set_Login = (req, res) => {
  res.render("login", { error });
};

module.exports.set_Dashboard = (req, res) => {
    res.render("dashboard");
}

module.exports.post_Register = (req, res) => {
  error = {};
  findByEmail(req.body.username).then((user) => {
    if (user) {
      error["username"] = "Email already exists";
      res.redirect("/register");
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      newUser
        .save()
        .then(() => {
          const token = createToken(newUser._id);
          res.cookie("token", token, {
            maxAge: MAX_AGE * 1000,
            httpOnly: true,
          });
          res.redirect("/dashboard");
        })
        .catch((err) => {
          Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
          });
          res.redirect("/register");
        });
    }
  });
};

module.exports.get_Logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports.post_Login = (req, res) => {
  error = {};
  User.login(req.body.username, req.body.password).then((user) => {
    if (user) {
      const token = createToken(user._id);
      res.cookie("token", token, { maxAge: MAX_AGE * 1000, httpOnly: true });
      res.redirect("/dashboard");
    } else {
      error["username"] = "Invalid username";
      res.redirect("/login");
    }
  }).catch((err) => {  
        if(err.message === "Invalid username"){
            error["username"] = "Invalid username";
            res.redirect("/login");
        }else{
            error["password"] = "Invalid password";
            res.redirect("/login");
        }
    });
};
