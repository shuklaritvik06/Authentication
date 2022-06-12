const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://ritviks06:${process.env.PASSWORD}@cluster0.aeiaykn.mongodb.net/?retryWrites=true&w=majority`).then(()=>console.log("connected to database")).catch(err=>console.log(err));
const Schema = mongoose.Schema({
    userId: String,
    username: String,
    photoUrl: String
});
const User = mongoose.model('ourcustomer', Schema);
module.exports = User;