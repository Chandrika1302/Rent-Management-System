const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  roomNumber: { type: Number, max: 1000 },
  baseRent: { type: Number },
  balance: { type: Number },
  tenants: [{ type: Schema.Types.ObjectId, ref: "Tenant" }],
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
