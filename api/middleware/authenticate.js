const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function authenticate(req, res, next) {
  const token = req.headers.authorization.split(" ")?.[1];
  const url = req.url;
  const uncheckedRoutes = [
    "/api/login",
    "/api/logout",
    "/",
    "/about",
    "/api/signup",
    "/api/signout",
  ];

  if (!token) {
    if (uncheckedRoutes.includes(url)) {
      return next();
    }
    return res.json({
      error: {
        code: 403,
        message: "Token Missing from request",
      },
    });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    if (err) {
      next(err);
    } else {
      const tokenUser = data.username;
      User.findOne({ username: tokenUser }, (err, dbUser) => {
        if (err) next(err);
        if (dbUser) {
          req.user = dbUser;
          next();
        } else {
          res.json({
            error: {
              code: 403,
              message: "AUTH error, User does not exist in database",
            },
          });
        }
      });
    }
  });
};
