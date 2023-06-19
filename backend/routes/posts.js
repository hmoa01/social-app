const { Router } = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = new Router();

// GET
router.get("/all", require("../controllers/postController/allPosts"));
router.get(
  "/singlePost/:postId",
  require("../controllers/postController/singlePost")
);
router.get("/:userId", require("../controllers/postController/userPosts"));

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

//DELETE POST
router.delete(
  "/:postId",
  verifyToken,
  require("../controllers/postController/deletePost")
);

module.exports = router;
