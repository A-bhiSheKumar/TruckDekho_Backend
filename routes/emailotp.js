
const express = require("express");
const router = express.Router();
const { SendEmailOTP, VerifyEmailOTP } = require("../controllers/emailotp");

router.post("/sendOTP", SendEmailOTP);
router.post("/verifyOTP", VerifyEmailOTP);

module.exports = router;

