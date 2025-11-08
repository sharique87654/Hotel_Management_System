const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(411).json({
      message: "Token missing or invalid format",
    });
  }

  const token = authHeader.split(" ")[1];

  //(" Received Token:", token);
  //(" Secret Key from .env:", process.env.JwtCode);

  try {
    //("hi from middleware");
    const decoded = jwt.verify(token, process.env.JwtCode);
    //(" Decoded Payload:", decoded);
    req.dataId = decoded.userId;
    next();
  } catch (error) {
    console.error(" JWT verification failed:", error.message);
    return res.status(403).json({
      msg: "Invalid Signature",
    });
  }
};

module.exports = authMiddleware;
