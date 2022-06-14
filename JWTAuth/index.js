if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./routes/authRouter");
const app = express();

app.use(cors());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/", route);

app.listen(5000, () => console.log("Server started on port 5000"));
