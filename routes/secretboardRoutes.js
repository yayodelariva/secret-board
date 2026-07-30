const { Router } = require("express");
const router = Router();
const secretboardController = require("../controllers/secretboardControllers");

router.get("/", secretboardController.renderHomepage);

module.exports = router;
