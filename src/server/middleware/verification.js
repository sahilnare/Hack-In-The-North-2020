
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {

    const jwtToken = req.header("token");

    // const jwtTokenCookie = req.cookies.eBuzzToken;

    if(!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
    next();

  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
}
