const router = require("express").Router();
const CategoriesController = require("../controllers/categories_controllers");
const { categoriesValidation } = require('../validation.js');

router.post("/",categoriesValidation, CategoriesController.create);
router.get("/get", CategoriesController.findAll);
router.put("/:id", CategoriesController.update);
router.delete("/:id", CategoriesController.destroy);

module.exports = router;
