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

async function main() {
  await User.collection.drop().catch(); //what could possibly go wrong? nothing right? right?
  await Room.collection.drop().catch();
  await Tenant.collection.drop().catch();

  const user = new User({
    username: "abc",
    password: "123",
  });
  await user.save();

  for (let i = 0; i < 5; i++) {
    const room = new Room({
      userId: user.id,
      roomNumber: i,
      baseRent: 2000,
      balance: 0,
    });
    for (let j = 0; j < 5; j++) {
      const tenant = new Tenant({
        userId: user.id,
        name: `name${i}-${j}`,
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
