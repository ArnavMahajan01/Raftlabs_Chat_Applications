const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  } else {
    try {
      const payload = await jwt.verify(token, process.env.VERIFY_AUTH_TOKEN);
      req.user = await User.findOne({ email: payload.data.email });
      next();
    } catch (err) {
      console.log(err.message);
      if (err.name === "TokenExpiredError") {
        return res.status(400).send({ msg: "Session timed out" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(400).send({ msg: "Invalid token" });
      } else {
        return res.status(400).send({ msg: "Unknown error" });
      }
    }
  }
};

module.exports = { auth };
