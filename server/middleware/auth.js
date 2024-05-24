const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  // Get token from header
  // const token = req.header('x-auth-token');

  console.log("req dump",req.cookies);
  const token = req.cookies.jwtoken;

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, authorization denied" }] });
  }

  // Verify token
  try {
    // const decoded = jwt.verify(token, config.get("jwtSecret"));
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
