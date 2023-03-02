require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/User.js");
const Room = require("../models/Room.js");
const Tenant = require("../models/Tenant.js");

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection error:"));

const shouldClear = process.argv[2] === "clear";

async function main() {
  if (shouldClear) {
    await User.collection.drop().catch();
    await Room.collection.drop().catch();
    await Tenant.collection.drop().catch();
  }

  const user = new User({
    username: "abc",
    password: "123",
  });
  await user.save();

  for (let i = 0; i < 5; i++) {
    const room = new Room({
      user: user.id,
      number: i,
      baseRent: 2000,
      balance: 0,
    });
    for (let j = 0; j < 5; j++) {
      const tenant = new Tenant({
        user: user.id,
        name: `name${i}-${j}`,
        phoneNumber: i + j,
        aadharCard: j,
        email: `email${i}.${j}@gmail.com`,
        room: room.id,
      });
      await tenant.save();
    }
    await room.save();
  }
  await mongoose.connection.close();
}

main();
