const { body } = require("express-validator");

exports.signupValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters long")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, and a number.",
    ),
  body("confirmPassword"),
  // Custom validation to check if confirmPassword matches password
];

exports.loginValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),

  // Custom validation to check if confirmPassword matches password
];
