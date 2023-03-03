const Room = require("../models/Room");
const Tenant = require("../models/Tenant");

exports.index = async function (req, res) {
  const user = req.user;
  const rooms = await Room.find({ user: user.id }).lean();
  for (const room of rooms) {
    room.tenants = await Tenant.find({ room: room._id }).lean();
  }
  res.json({ data: { rooms } });
};

exports.detail = async function (req, res) {
  //const user = req.user;
  const roomId = req.params.id;
  try {
    const room = await Room.findById(roomId).lean();
    room.tenants = await Tenant.find({ room: room?._id }).lean();
    res.json({ data: { room } });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};

exports.create_post = async function (req, res) {
  const number = req.body.number;
  const baseRent = req.body.baseRent;
  const user = req.user;

  const room = new Room({
    number,
    baseRent,
    user: user.id,
    balance: 0,
  });

  try {
    await room.save();
    res.json({ data: { room } });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};
