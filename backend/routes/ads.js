const {Router} = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = new Router()

//GET
router.get("/", require("../controllers/adsController/allAds"));

//POST
router.post("/add",verifyToken, require("../controllers/adsController/addAds.js"))
router.post("/paymentInit", verifyToken, require("../controllers/adsController/paymentInit"))


module.exports = router;