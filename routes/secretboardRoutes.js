const { Router } = require("express");
const router = Router();
const secretboardController = require("../controllers/secretboardControllers");

router.get("/", secretboardController.renderHomepage);
router.get("/signup", secretboardController.renderSignup);
router.post("/signup", secretboardController.createSignup);
router.get("/login", secretboardController.renderLogin);

module.exports = router;
