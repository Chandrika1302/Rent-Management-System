const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.index = function (req, res) {
  res.sendStatus(403);
};

exports.login_POST = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const dbUser = await User.findOne({ username, password });
  if (!dbUser) {
    res.sendStatus(404);
  } else {
    const token = jwt.sign({ username }, process.env.TOKEN_KEY);
    res.json({ token });
  }
};

exports.logout = function (req, res) {
  //   res.clearCookie("token");
  //   res.redirect("/");
  //implement refresh tokens here
  res.send("#TODO");
};
