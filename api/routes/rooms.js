const express = require("express");
const router = express.Router();

const roomsController = require("../controllers/roomsController");

/* GET home page. */
// router.get("/", indexController.index);

router.post("/create", roomsController.create_room_POST);

module.exports = router;
