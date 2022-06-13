const express = require("express");
const bodyParser = require("body-parser");
const model = require("../models/authModel");
const auth = require("firebase/auth");

const {
  getFirestore,
  collection,
  getDocs,
  addDoc
} = require("firebase/firestore/lite");

const db = getFirestore(model);
let user_Data;
const data = async function getDocuments(db) {
  const hotelCollection = collection(db, "hotelCollection");
  return await getDocs(hotelCollection);
};

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  if(user_Data===null){
    res.redirect("/login");
  }
  else{
    res.redirect("/dashboard");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/dashboard", (req, res) => {
  let user_Docs = [];
  if (user_Data !== null) {
    data(db)
      .then((doc) => {
        doc.forEach((doc) => {
          if(doc.data().id === user_Data.uid){
            user_Docs.push(doc.data());
          }
        });
        res.render("dashboard", { data: user_Docs });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/login");
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  auth
    .signInWithEmailAndPassword(auth.getAuth(model), email, password)
    .then(() => {
      res.redirect("/dashboard");
    });
});

router.post("/register", (req, res) => {
  const { email, password, password_confirmation } = req.body;
  if (password !== password_confirmation) {
    res.redirect("/register");
  } else {
    auth
      .createUserWithEmailAndPassword(auth.getAuth(model), email, password)
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

router.get("/logout", (req, res) => {
  auth
    .getAuth(model)
    .signOut()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/create", (req, res) => {
  if (user_Data !== null) {
    res.render("create");
  } else {
    res.redirect("/login");
  }
});

router.post("/create", (req, res) => {
  addDoc(collection(db,"hotelCollection"),{
    id: user_Data.uid,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
  }).then(() => res.redirect("/dashboard"));
});

auth.onAuthStateChanged(auth.getAuth(model), (user) => {
  user_Data = user;
});

module.exports = router;
