require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const indexController = require("../controllers/indexController");

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection error:"));

/* GET home page. */
router.get("/", indexController.index);

router.post("/login", indexController.login_POST);

router.get("/logout", indexController.logout);

module.exports = router;
