const { Router } = require("express");
const passport = require("passport");
const {
  signupValidation,
  loginValidation,
} = require("../validators/authValidator");
const validationMiddleware = require("../middleware/validation");
const router = Router();
const secretboardController = require("../controllers/secretboardControllers");

router.get("/", secretboardController.renderHomepage);
router.get("/signup", secretboardController.renderSignup);
router.post(
  "/signup",
  signupValidation,
  validationMiddleware("signup"),
  secretboardController.createSignup,
);
router.get("/login", secretboardController.renderLogin);
router.post(
  "/login",
  loginValidation,
  validationMiddleware("login"),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

module.exports = router;
