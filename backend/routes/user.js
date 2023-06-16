const { Router } = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = new Router();

router.get("/", require("../controllers/userController/getAllUsers"));
router.get("/:uid", require("../controllers/userController/singleUser"))
router.put(
  "/edit/:uid",
  verifyToken,
  require("../controllers/userController/editUser")
);

module.exports = router;
