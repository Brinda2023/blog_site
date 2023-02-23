const router = require("express").Router();
const PostsController = require("../controllers/postController");
const { postsValidation } = require("../validation.js");
const checkAuth = require("../middleware/check-auth");

router.post("/", postsValidation, checkAuth, PostsController.create);
router.put("/:id", checkAuth, PostsController.update);
router.delete("/:id", checkAuth, PostsController.destroy);
router.get("/get/:id", PostsController.findOne);
router.get("/get", PostsController.findAll);

module.exports = router;
