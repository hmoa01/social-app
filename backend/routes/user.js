const { Router } = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = new Router();

//GET
router.get("/", require("../controllers/userController/getAllUsers"));
router.get("/:uid", require("../controllers/userController/singleUser"))

//PUT
router.put(
  "/edit/:userId",
  verifyToken,
  require("../controllers/userController/editUser")
);

module.exports = router;
