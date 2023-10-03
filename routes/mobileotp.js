
const express = require("express");
const router = express.Router();
const { SendMobileOTP, VerifyMobileOTP } = require("../controllers/mobileotp");

router.post("/sendOTP", SendMobileOTP);
router.post("/verifyOTP", VerifyMobileOTP);

module.exports = router;

