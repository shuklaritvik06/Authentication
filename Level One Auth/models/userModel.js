const mongoose= require('mongoose');
mongoose.connect(`mongodb+srv://ritvik:${process.env.PASSWORD}@cluster0.vmpmx.mongodb.net/loginApp?retryWrites=true&w=majority`).then(()=>console.log("Success!"));
const Schema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});
const model = mongoose.model("user",Schema);
module.exports = model;
