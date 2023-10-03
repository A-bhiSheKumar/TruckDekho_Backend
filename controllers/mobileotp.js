
const axios = require("axios");
const speakeasy = require("speakeasy");
const User = require("../models/Users");

const apiUrl = "https://apitxt.com/api/sendOTP/";
const authkey = "SEdFVFgraDhkRWM2RzhxbGhPMGIvQT09";
var otp = "";
var otpSecret = "";

const generateOTP = () => {
  return speakeasy.totp({
    secret: otpSecret,
    encoding: "base32",
  });
};

const SendMobileOTP = async (req, res) => {
  const {mobile} = req.body;
  const existingUserByMobile = await User.findOne({ mobile });
  if (existingUserByMobile) {
    return res.status(400).json({ message: "Mobile number already registered" });
  }
  try {
    const mobile = req.body.mobile;
    const customMessage = "Team Sidhant";
    const sender = "OTPAPI";

    otp = generateOTP();

    const response = await axios.get(apiUrl, {
      params: {
        authkey,
        mobile,
        message: `${customMessage} ${otp}`,
        sender,
        otp,
      },
    });
    console.log(otp);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json(error);
  }
};

const VerifyMobileOTP = async (req, res) => {
  const { inputotp } = req.body;
  try {
    if (inputotp === otp) {
      console.log("Otp Verified successfully");
      otp = generateOTP();
      console.log(otp);
      res.status(200).json({ message: "Otp Verified successfully" });
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
};

module.exports = { SendMobileOTP, VerifyMobileOTP };
