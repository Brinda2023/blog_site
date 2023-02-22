const router = require("express").Router();
const UsersController = require("../controllers/users_controllers");

router.put("/:id", UsersController.update);
router.delete("/:id", UsersController.destroy);
router.get("/get/:id", UsersController.findOne);

module.exports = router;