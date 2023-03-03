const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactionsController");

router.get("/", transactionsController.index);

router.post("/create", transactionsController.create_post);

router.get("/:id", transactionsController.detail);

module.exports = router;
