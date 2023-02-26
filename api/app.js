require("dotenv").config();
const path = require("path");

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authenticate = require("./middleware/authenticate");
const indexRouter = require("./routes/index");
const roomsRouter = require("./routes/rooms");
const tenantsRouter = require("./routes/tenants");

const app = express();

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//serve react dist
app.use(express.static(path.join(__dirname, "../client/dist/")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(authenticate);
app.use("/api", indexRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/tenants", tenantsRouter);

module.exports = app;
