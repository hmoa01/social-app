const { Router } = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = new Router();

// GET
router.get("/all", require("../controllers/postController/allPosts"));
router.get("/:postId", require("../controllers/postController/singlePost"));

//POST
router.post(
  "/add",
  verifyToken,
  require("../controllers/postController/addPost")
);

//PUT
router.put(
  "/:postId",
  verifyToken,
  require("../controllers/postController/editPost")
);

module.exports = router;
