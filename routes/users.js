const router = require("express").Router();
const UsersController = require("../controllers/userController");
const checkAuth = require("../middleware/check-auth");

router.put("/:id", checkAuth, UsersController.update);
router.delete("/:id", checkAuth, UsersController.destroy);
router.get("/get/:id", checkAuth, UsersController.findOne);

module.exports = router;