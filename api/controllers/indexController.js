const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Tenant = require("../models/Tenant");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");

exports.index = function (req, res) {
  res.json({
    data: { message: "/api accessible" },
  });
};

exports.login_post = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const dbUser = await User.findOne({ username, password });
  if (!dbUser) {
    res.json({
      error: {
        code: 404,
        message: "Username or Password Incorrect",
      },
    });
  } else {
    const token = jwt.sign({ username }, process.env.TOKEN_KEY);
    res.json({ data: { token } });
  }
};

exports.signup_post = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const dbUser = await User.findOne({ username });

  if (dbUser) {
    return res.json({
      error: {
        code: 404,
        message: "Username Already Taken",
      },
    });
  }

  const token = jwt.sign({ username }, process.env.TOKEN_KEY);
  const newUser = new User({
    username,
    password,
    email,
  });
  await newUser.save();
  res.json({ data: { token } });
};

exports.signout_post = async function (req, res) {
  const user = req.user;

  await User.findOneAndDelete({ username: user.username });
  await Transaction.deleteMany({ username: user.username });
  await Room.deleteMany({ username: user.username });
  await Tenant.deleteMany({ username: user.username });

  res.json({ data: { message: "success" } });
};
