const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, "arish", (err, decode) => {
    if (err) {
      return res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }
    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      return res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }
  });
}

module.exports = {
  authenticator,
};
