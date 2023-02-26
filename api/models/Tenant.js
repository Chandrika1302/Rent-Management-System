const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  phoneNumber: { type: Number },
  name: { type: String },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
});

const Tenant = mongoose.model("Tenant", tenantSchema);
module.exports = Tenant;
