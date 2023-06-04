const { Router } = require("express");

const router = new Router();

router.get("/all", require("../controllers/postController/allPosts"));

module.exports = router;
