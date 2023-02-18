const Room = require("../models/Room");

exports.index = function (req, res) {
  res.sendStatus(403);
};

exports.create_room_POST = async function (req, res) {
  const roomNumber = req.body.roomNumber;
  const baseRent = req.body.baseRent;

  const room = new Room({
    roomNumber,
    baseRent,
  });

  try {
    await room.save();
    res.json({ error: null });
  } catch (e) {
    res.json({ error: e.msg });
  }
};
