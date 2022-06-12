const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

function init(passport){
    function authUser(username, password, done){
        User.findOne({username: username}).then((user)=>{
            if(user===null){
                return done(null, false, {message: 'Incorrect username'});
            }
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err){
                    return done(err);
                }
                if(!isMatch){
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            });
            passport.serializeUser((user, done)=>{
                done(null, user.id);
            });
            passport.deserializeUser((id, done)=>{
                User.findById(id, (err, user)=>{
                    done(err, user);
                });
            });
        })
    }
    passport.use(new LocalStrategy(authUser));
}
module.exports = init;