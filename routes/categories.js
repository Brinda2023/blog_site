const router = require("express").Router();
const CategoriesController = require("../controllers/catController");
const { categoriesValidation } = require('../validation.js');
const checkAuth = require("../middleware/check-auth");

router.post("/",categoriesValidation, checkAuth, CategoriesController.create);
router.get("/get", CategoriesController.findAll);
router.put("/:id", checkAuth, CategoriesController.update);
router.delete("/:id", checkAuth, CategoriesController.destroy);

module.exports = router;