const router = require("express").Router();
const AuthController = require("../controllers/authController");
const { signupValidation, loginValidation } = require("../validation.js");
const checkAuth = require("../middleware/check-auth");

router.post("/register", signupValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);

module.exports = router;