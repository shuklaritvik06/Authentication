if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const router = require("./controllers/authController");
const app = express();
app.set("view engine", "ejs");
app.use("/",router)

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});