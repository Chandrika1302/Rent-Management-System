const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  previousBalance: { type: Number },
  transfer: { type: Number },
  presentBalance: { type: Number },
  remarks: { type: String },
  date: { type: Date },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
