const express = require("express");
const router = express.Router();

const tenantsController = require("../controllers/tenantsController");

router.post("/", tenantsController.index);

router.post("/create", tenantsController.create_tenant_POST);

router.post("/:id", tenantsController.getTenant);

module.exports = router;
