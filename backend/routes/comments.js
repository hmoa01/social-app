const { Router } = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = new Router();

//GET

router.get(
  "/post/:postId",
  require("../controllers/commentController/postComments.js")
);
//ADD
router.post(
    "/add/:postId",
    verifyToken,
    require("../controllers/commentController/addComment")
);

router.get(
  "/:commentId",
  require("../controllers/commentController/singleComment")
);

//DELETE
router.delete(
    "/:id",
    verifyToken,
    require("../controllers/commentController/deleteComment")
);

module.exports = router;
