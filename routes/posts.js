const router = require("express").Router();
const PostsController = require("../controllers/posts_controllers");
const { postsValidation } = require('../validation.js');

router.post("/",postsValidation, PostsController.create);
router.put("/:id", PostsController.update);
router.delete("/:id", PostsController.destroy);
router.get("/get/:id", PostsController.findOne);
router.get("/get", PostsController.findAll);

module.exports = router;
