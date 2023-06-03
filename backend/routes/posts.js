const { Router } = require("express");

const router = new Router();

router.get("/", require("../controllers/postController/allPosts.js"));

module.exports = router;
