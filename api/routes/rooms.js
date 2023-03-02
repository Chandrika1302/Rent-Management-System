const express = require("express");
const router = express.Router();

const roomsController = require("../controllers/roomsController");

router.post("/", roomsController.index);

router.post("/create", roomsController.create_room_POST);

router.post("/:id", roomsController.getRoom);

module.exports = router;
