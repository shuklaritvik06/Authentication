const express = require("express");
const firebaseApp = require("../models/authModel");
const auth = require("firebase/auth");


const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/google",(req,res)=>{

});

router.get("/dashboard",(req,res)=>{

});

router.get("/facebook",(req,res)=>{
    
});
router.get("/github",(req,res)=>{

});

module.exports = router;