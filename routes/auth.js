const router = require("express").Router(); //Creating router
const AuthController = require("../controllers/authController"); //Importing controller
const { signupValidation, loginValidation } = require("../validation.js"); //Importing validations

// Calling controller

router.post("/register", signupValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);

module.exports = router;
