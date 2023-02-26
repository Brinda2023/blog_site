const router = require("express").Router(); // Creating router
const UsersController = require("../controllers/userController"); // Importing controller
const checkAuth = require("../middleware/check-auth"); // Importing check auth file
const { loginValidation } = require("../validation.js"); //Importing validations

// Calling controller

router.put("/:id", loginValidation, checkAuth, UsersController.update);
router.delete("/:id", checkAuth, UsersController.destroy);
router.get("/get/:id", checkAuth, UsersController.findOne);
router.get("/get",checkAuth, UsersController.findAll);

module.exports = router;
