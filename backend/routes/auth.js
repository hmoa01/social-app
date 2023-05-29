const { Router } = require("express");
const router = new Router();

router.post("/signup", require("../controllers/authController/signup"));
router.post("/login", require("../controllers/authController/login"));

module.exports = router;
