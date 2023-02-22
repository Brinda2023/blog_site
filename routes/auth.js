const router = require("express").Router();
const AuthController = require("../controllers/auth_controllers");
const { signupValidation, loginValidation } = require('../validation.js');

router.post("/register", signupValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);

module.exports = router;