const { Router } = require("express");

const router = new Router();

//GET
router.get(
  "/:commentId",
  require("../controllers/commentController/singleComment")
);

module.exports = router;
