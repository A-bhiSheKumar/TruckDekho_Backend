
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const atlasRoute = require("./routes/atlas");
const compareRoute = require("./routes/compare");
const mobileRoute = require("./routes/mobileotp");
const emailRoute = require("./routes/emailotp");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/atlas", atlasRoute);
app.use("/api/compare", compareRoute);
app.use("/api/mobile", mobileRoute);
app.use("/api/email", emailRoute);

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


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// {
//   "mobilenumber": "918923741802"
// }

// {
//   "inputotp": ""
// }

