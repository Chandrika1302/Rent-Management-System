const Tenant = require("../models/Tenant");
const Room = require("../models/Room");

exports.index = async function (req, res) {
  const user = req.user;
  const tenants = await Tenant.find({ userId: user.id }).lean();
  res.json(tenants);
};
exports.getTenant = async function (req, res) {
  //const user = req.user;
  const tenantId = req.params.id;
  try {
    const tenant = await Tenant.findById(tenantId).populate("room").lean();
    res.json(tenant);
  } catch (e) {
    res.json({ error: e.msg });
  }
};
exports.create_tenant_POST = async function (req, res) {
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
    userId: user.id,
  });

  try {
    await tenant.save();
    res.json({ error: null });
  } catch (e) {
    res.json({ error: e.msg });
  }
};
