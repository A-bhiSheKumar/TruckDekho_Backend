const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const User = require("../models/Users");

var emailotp = "";
var otpSecret = "";

const generateOTP = () => {
  return speakeasy.totp({
    secret: otpSecret,
    encoding: "base32",
  });
};

const SendEmailOTP = async (req, res) => {
  const { email } = req.body;
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    return res.status(400).json({ message: "Email already registered." });
  }
  try {
    emailotp = generateOTP();
    console.log(emailotp);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "siddhantydhyani99@gmail.com",
        pass: "oesl ollq nark wulq",
      },
    });
    const mailOptions = {
      from: "siddhantydhyani99@gmail.com",
      to: email,
      subject: "OTP verification",
      text: `Your OTP is: ${emailotp}`,
    };
    await transporter.sendMail(mailOptions);
    console.log(emailotp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message });
  }
};

const VerifyEmailOTP = async (req, res) => {
  const { inputotp } = req.body;
  console.log(emailotp);
  try {
    if (inputotp === emailotp) {
      console.log("Otp Verified successfully");
      emailotp = generateOTP();
      console.log(emailotp);
      res.status(200).json({ message: "Otp Verified successfully" });
    } else {
        console.log("emailotp:",emailotp);
        console.log("inputotp:",inputotp);
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
};

module.exports = { SendEmailOTP, VerifyEmailOTP };

// {
//     "email": "siddhantydhyani999@gmail.com"
//   }

// {
//     "inputotp": "9268"
//   }
