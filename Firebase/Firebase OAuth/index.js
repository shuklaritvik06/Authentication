if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
app.set("view engine", "ejs");

const port = process.env.PORT || 5000;

const router = require("./controllers/authController.js");

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
