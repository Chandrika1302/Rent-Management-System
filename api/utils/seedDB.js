require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("../models/User.js");

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection error:"));

async function main() {
  await User.collection.drop();
  const user = new User({
    username: "abc",
    password: "123",
  });

  await user.save();
  await mongoose.connection.close();
}

main();
