const jwt = require("jsonwebtoken");
const User = require("../models/authModel");
const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.redirect("/login");
    }else{
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.userId = decoded.id;
            next();
        }  
        catch (err) {
            res.redirect("/login");
        }
    }
}
const checkUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        next();
    }else{
        try {
            jwt.verify(token, process.env.SECRET,(err,decoded)=>{
                if(err){
                    res.locals.user = null;
                    next();
                }else{
                const userId = decoded.id;
                User.findById(userId).then((user)=>{
                    res.locals.user = user;
                    next();
                });
            }
            })
            
        }
        catch (err) {
            console.log(err);
            res.redirect("/login");
        }
    }
}
module.exports = {
    checkAuth,
    checkUser
}