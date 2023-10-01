const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const atlasRoute = require("./routes/atlas");
const compareRoute = require("./routes/compare");
const speakeasy = require("speakeasy");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/atlas", atlasRoute);
app.use("/api/compare", compareRoute);
app.use("/api/otp", otpRoute);

const env = require("dotenv");
env.config();
const port = process.env.PORT || 4000;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the database.");
  } catch (error) {
    console.error(`Error connecting to  the database: ${error}`);
  }
};
connectToDatabase();

app.get("/", async (req, res) => {
  try {
    res.json({
      message: "Hello World",
    });
  } catch (error) {
    console.error(error);
  }
});

// const axios = require("axios");

// const apiUrl = "https://apitxt.com/api/sendOTP/";
// const authkey = "SEdFVFgraDhkRWM2RzhxbGhPMGIvQT09";
// var otp = "";
// var otpSecret = "";

// const generateOTP = () => {
//   return speakeasy.totp({
//     secret: otpSecret,
//     encoding: "base32",
//   });
// };

// app.post("/send-otp", async (req, res) => {
//   try {
//     const mobile = req.body.mobilenumber;
//     const customMessage = encodeURIComponent("Team Sidhant");
//     const sender = "OTPAPI";

//     otp = generateOTP();

//     const response = await axios.get(apiUrl, {
//       params: {
//         authkey,
//         mobile,
//         message: `${customMessage} ${otp}`,
//         sender,
//         otp,
//       },
//     });
//     console.log(otp);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json(error);
//   }
// });

app.post("/verifyotp", async (req, res) => {
  const { inputotp } = req.body;
  try {
    if (inputotp === otp) {
      otp = generateOTP();
      res.json({ message: "Otp Verified successfully" });
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// {
//   "mobilenumber": "918923741802"
// }

// {
//   "inputotp": ""
// }

