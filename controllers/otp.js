
const axios = require("axios");

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

const SendOTP =  async (req, res) => {
  try {
    const mobile = req.body.mobilenumber;
    const customMessage = encodeURIComponent("Team Sidhant");
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

module.exports = {SendOTP};

