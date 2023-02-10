const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.index = function (req, res) {
  res.send("#TODO");
};

exports.login_POST = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const dbUser = await User.findOne({ username, password });
  if (!dbUser) {
    res.sendStatus(403);
  } else {
    const token = jwt.sign({ username }, process.env.TOKEN_KEY);
    res.json({ token });
  }
};

exports.logout = function (req, res) {
  //   res.clearCookie("token");
  //   res.redirect("/");
  res.send("#TODO");
};
