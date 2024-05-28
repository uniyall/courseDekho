const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    if (decoded?.username) {
      req.username = decoded.username;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      mssg: "Not authenticated",
    });
  }
};

module.exports = userAuth;
