const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://USERNAME:PASSWORD@cluster0.aeiaykn.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });
const userSchema = mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", userSchema);
module.exports = User;
