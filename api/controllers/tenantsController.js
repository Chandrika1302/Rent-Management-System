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
  const address = req.body.address;
  const user = req.user;

  const roomAlreadyPresent = await Room.findOne({ number: roomNumber });
  if (!roomAlreadyPresent) {
    return res.json({ error: { code: 403, message: "Room Not Found" } });
  }

  if (phoneNumber.length != 10) {
    return res.json({
      error: { code: 403, message: "Phone Number must be 10 digits long" },
    });
  }
  if (aadharCard.length != 12) {
    return res.json({
      error: { code: 403, message: "Aadhar Number must be 12 digits long" },
    });
  }

  const room = await Room.findOne({ number: roomNumber });
  const tenant = new Tenant({
    name,
    phoneNumber,
    aadharCard,
    room: room.id,
    user: user.id,
    address,
  });

  try {
    await tenant.save();
    res.json({ data: { tenant } });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};

exports.delete = async function (req, res) {
  // const user = req.user;
  const tenantId = req.params.id;
  try {
    await Tenant.findByIdAndDelete(tenantId);
    return res.json({
      data: {
        message: "success",
      },
    });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};
