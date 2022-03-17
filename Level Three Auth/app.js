require('dotenv').config()
const express = require("express")
const router = require('./controllers/loginController');
const app = express();
app.use("/",router);
app.set('view engine','ejs');
app.listen(5000, () => {
    console.log('Listening on port ' + 5000);
});