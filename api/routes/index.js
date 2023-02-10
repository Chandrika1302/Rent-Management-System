const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
// router.get("/", indexController.index);

router.post("/login", indexController.login_POST);

router.get("/logout", indexController.logout);

module.exports = router;
