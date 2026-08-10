const { Router } = require("express");
const passport = require("passport");
const {
  signupValidation,
  loginValidation,
} = require("../validators/authValidator");
const ensureAuthenticated = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validation");
const router = Router();
const secretboardController = require("../controllers/secretboardControllers");
const {
  createPost,
  renderHomepage,
} = require("../controllers/secretboardControllers");

router.get("/", secretboardController.renderHomepage);
router.post("/posts", ensureAuthenticated, createPost);
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
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
);

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/test-auth", (req, res) => {
  console.log("REQ.USER:", req.user);
  console.log("AUTHENTICATED:", req.isAuthenticated());

  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
  });
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/login");
  });
});

router.post("/posts", ensureAuthenticated, createPost);

module.exports = router;
