const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
