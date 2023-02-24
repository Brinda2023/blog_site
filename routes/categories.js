const router = require("express").Router(); //Creating router
const CategoriesController = require("../controllers/catController"); //Importing controller
const { categoriesValidation } = require("../validation.js"); //Importing validation
const checkAuth = require("../middleware/check-auth"); // Importing check auth file

// Calling Controller

router.post("/", checkAuth, categoriesValidation, CategoriesController.create);
router.get("/get", CategoriesController.findAll);
router.put("/:id", checkAuth, CategoriesController.update);
router.delete("/:id", checkAuth, CategoriesController.destroy);

module.exports = router;
