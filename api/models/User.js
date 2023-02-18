const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, maxLength: 20 },
  password: { type: String, maxLength: 25 },
  email: { type: String, maxLength: 50 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
