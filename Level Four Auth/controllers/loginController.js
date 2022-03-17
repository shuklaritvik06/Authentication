const express = require('express');
const model = require('../models/userModel');
const bcrypt = require('bcrypt');
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
        const compareValue = bcrypt.compare(req.fields.pass, result.password).then((result)=>result);
           if (compareValue){
                res.render("metaverse");
           }
    });
});
router.get("/register", (req, res) => {
    res.render('register');
});
router.post("/register", async (req, res) => {
    const pass = bcrypt.hash(req.fields.pass, 10, (err, hash)=>hash);
    const user = new model({
        username: req.fields.user,
        email: req.fields.mail,
        password: pass
    })
    user.save().then(()=>res.render("metaverse"));
})
module.exports = router;
