const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const credentials = require("../config/keys");
mongoose
  .connect(
    `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.aeiaykn.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const Schema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    lowercase: true,
    validate: [
      (val) => {
        let pattern =
          /.*[@](\bgmail|\bhotmail|\boutlook|\brediffmail)[.](\bcom)/g;
        return pattern.test(val);
      },
      "Invalid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [32, "Password must be at most 32 characters"],
  },
});
Schema.post("save", (doc, next) => {
  console.log(`${doc.username} saved`);
  next();
});
Schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
Schema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Invalid username");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error("Invalid password");
  }
  return user;
}
const User = mongoose.model("User", Schema);
module.exports = User;
