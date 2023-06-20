const { Router } = require("express");
const addLike = require('../controllers/likeController/addLike')
const verifyToken = require("../middleware/verifyToken");
const removeLike = require("../controllers/likeController/removeLike");
const router = new Router()

router.post("/addRemove/:postId", verifyToken, addLike, removeLike)

module.exports = router;