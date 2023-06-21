const express = require("express");
const router = new express.Router();

router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/tags", require("./tags"));
router.use("/likes", require("./likes"));
router.use("/messages", require("./messages"));

module.exports = router;
