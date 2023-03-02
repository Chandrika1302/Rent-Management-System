const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  number: { type: Number, max: 1000 },
  baseRent: { type: Number },
  balance: { type: Number },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
