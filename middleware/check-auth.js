// Importing JWT

const jwt = require("jsonwebtoken");

// Decoded userdata into JWT token
// JWT token will be generated when user login

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    console.log(process.env.JWT_KEY);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded);
    req.userData = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
