const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  phoneNumber: { type: Number },
  name: { type: String },
});

const Tenant = mongoose.model("Room", tenantSchema);
module.exports = Tenant;
