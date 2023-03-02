const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  phoneNumber: { type: Number },
  aadharCard: { type: Number },
  name: { type: String },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
  address: { type: String },
});

const Tenant = mongoose.model("Tenant", tenantSchema);
module.exports = Tenant;
