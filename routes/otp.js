
const express = require("express");
const router = express.Router();
const { SendOTP, VerifyOTP } = require("../controllers/");

router.post("/send-otp", SendOTP);
router.post("/verify-otp", VerifyOTP);

module.exports = router;

