const router = require("express").Router(); // Creating router
const PostsController = require("../controllers/postController"); //Importing controller
const { postsValidation } = require("../validation.js"); //Importing validation
const checkAuth = require("../middleware/check-auth"); // Importing check auth file

// Calling controller

router.post("/", postsValidation, checkAuth, PostsController.create);
router.put("/:id", checkAuth, PostsController.update);
router.delete("/:id", checkAuth, PostsController.destroy);
router.get("/get/:id", PostsController.findOne);
router.get("/get", PostsController.findAll);

module.exports = router;
