const { check } = require("express-validator");

exports.signupValidation = [
  check("username", "Name is requied").not().isEmpty(),
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];

exports.loginValidation = [
  check("username", "Name is requied").not().isEmpty(),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];

exports.categoriesValidation = [
  check("name", "Name is requied").not().isEmpty(),
];

exports.postsValidation = [
  check("title", "Title is requied").not().isEmpty(),
  check("desc", "Desc is requied").not().isEmpty(),
  check("username", "Username is requied").not().isEmpty(),
  check("categories", "Categories are requied").not().isEmpty(),
];