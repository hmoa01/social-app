const { Router } = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = new Router();

//GET
router.get(
  "/:commentId",
  require("../controllers/commentController/singleComment")
);

//ADD
router.post(
  "/add/:postId",
  verifyToken,
  require("../controllers/commentController/addComment")
);

module.exports = router;
