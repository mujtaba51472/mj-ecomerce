const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// generateToken
exports.generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
