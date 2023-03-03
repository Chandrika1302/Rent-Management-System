const Tenant = require("../models/Tenant");
const Room = require("../models/Room");

exports.index = async function (req, res) {
  const user = req.user;
  const tenants = await Tenant.find({ user: user.id }).lean();
  res.json({ data: { tenants } });
};
exports.detail = async function (req, res) {
  //const user = req.user;
  const tenantId = req.params.id;
  try {
    const tenant = await Tenant.findById(tenantId).populate("room").lean();
    res.json({ data: { tenant } });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};
exports.create_post = async function (req, res) {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const aadharCard = req.body.aadharCard;
  const roomNumber = req.body.room;
  const user = req.user;

  const room = await Room.findOne({ roomNumber });
  const tenant = new Tenant({
    name,
    phoneNumber,
    aadharCard,
    room: room.id,
    user: user.id,
  });

  try {
    await tenant.save();
    res.json({ data: { tenant } });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};
