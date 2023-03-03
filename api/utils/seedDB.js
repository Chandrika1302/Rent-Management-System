require("dotenv").config();
const mongoose = require("mongoose");
const { randNumber, randUser, randLine } = require("@ngneat/falso");

const User = require("../models/User.js");
const Room = require("../models/Room.js");
const Tenant = require("../models/Tenant.js");
const Transaction = require("../models/Transaction.js");

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
      baseRent: randNumber({ max: 3000, min: 1500, precision: 100 }),
      balance: 0,
    });
    for (let j = 0; j < 5; j++) {
      const fakeUser = randUser();
      let fakeAddress = "";
      for (const prop in fakeUser.address) {
        fakeAddress += fakeUser.address[prop] + ", ";
      }
      fakeAddress = fakeAddress.slice(0, -2);
      const tenant = new Tenant({
        user: user.id,
        name: fakeUser.firstName + " " + fakeUser.lastName,
        phoneNumber: randNumber({ max: 9999999999, min: 1000000000 }),
        aadharCard: randNumber({ max: 999999999999, min: 100000000000 }),
        email: fakeUser.email,
        room: room.id,
        address: fakeAddress,
      });
      await tenant.save();
    }
    for (let j = 0; j < 5; j++) {
      const transfer = randNumber({ max: 2000, min: -2000, precision: 100 });
      const previousBalance = room.balance;
      const presentBalance = previousBalance + transfer;
      room.balance = presentBalance;
      const remarks = randLine();

      const transaction = new Transaction({
        transfer,
        presentBalance,
        previousBalance,
        user,
        remarks,
        room: room.id,
        date: new Date(),
      });
      await transaction.save();
    }
    await room.save();
  }
  await mongoose.connection.close();
}

main();
