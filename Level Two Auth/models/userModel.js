const mongoose= require('mongoose');
const  encrypt = require('mongoose-encryption');
mongoose.connect(`mongodb+srv://ritvik:${process.env.PASSWORD}@cluster0.vmpmx.mongodb.net/loginApp?retryWrites=true&w=majority`).then(()=>console.log("Success!"));
const Schema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});
const secret = "BohotLambaStringHaiYe!";
Schema.plugin(encrypt, { secret: secret , encryptedFields: ['password'], decryptPostSave: false });
const model = mongoose.model("user",Schema);
module.exports = model;
