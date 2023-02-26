const Room = require("../models/Room");

exports.index = async function (req, res) {
  const user = req.user;
  const rooms = await Room.find({ userId: user.id }).lean();
  res.json(rooms);
};

exports.create_room_POST = async function (req, res) {
  const roomNumber = req.body.roomNumber;
  const baseRent = req.body.baseRent;
  const user = req.user;

  const room = new Room({
    roomNumber,
    baseRent,
    userId: user.id,
    balance: 0,
  });

  try {
    await room.save();
    res.json({ error: null });
  } catch (e) {
    res.json({ error: e.msg });
  }
};
