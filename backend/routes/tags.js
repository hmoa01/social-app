const { Router } = require("express");
const router = new Router();

//GET
router.get("/", require("../controllers/tagController/allTags"));

module.exports = router;
