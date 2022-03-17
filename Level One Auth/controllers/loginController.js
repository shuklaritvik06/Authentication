const express = require('express');
const model = require('../models/userModel');
const router = express.Router();
const formidable = require('express-formidable');
router.use(formidable());
router.get("/",(req,res)=>{
    res.render("home");
})
router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login",  (req, res) => {
    model.findOne().or([{ username: req.fields.loginName},{email: req.fields.loginName}]).then((result)=>{
           if (result.password===req.fields.pass){
                res.render("metaverse");
           }
    });
});
router.get("/register", (req, res) => {
    res.render('register');
});
router.post("/register", async (req, res) => {
    const user = new model({
        username: req.fields.user,
        email: req.fields.mail,
        password: req.fields.pass
    })
    user.save().then(()=>res.render("metaverse"));
})
module.exports = router;
