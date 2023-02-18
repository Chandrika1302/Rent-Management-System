const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function authenticate(req, res, next) {
  const token = req.headers.authorization.split(" ")?.[1];
  const url = req.url;
  const uncheckedRoutes = ["/api/login", "/api/logout", "/"];

  if (!token) {
    if (uncheckedRoutes.includes(url)) {
      return next();
    }
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    if (err) {
      next(err);
    } else {
      const tokenUser = data.username;
      User.findOne({ username: tokenUser }, (err, dbUser) => {
        if (err) next(err);
        if (dbUser) {
          res.locals.username = dbUser.username;
          res.locals.email = dbUser.email;
          next();
        } else {
          res.sendStatus(403);
        }
      });
    }
  });
};
