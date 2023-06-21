const { Router } = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = new Router();

//GET USER MESSAGES
router.get("/sentMessages", verifyToken ,require("../controllers/messageController/sentMessages"));
router.get("/receivedMessages", verifyToken ,require("../controllers/messageController/receivedMessages"))
//POST MESSAGES
router.post("/addMessage/:userId", verifyToken ,require("../controllers/messageController/addMessage"))

module.exports = router;