const express = require("express");
const router = express.Router();

const tenantsController = require("../controllers/tenantsController");

router.get("/", tenantsController.index);

router.post("/create", tenantsController.create_post);

router.get("/:id", tenantsController.detail);

module.exports = router;
