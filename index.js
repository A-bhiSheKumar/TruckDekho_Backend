const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);

const env = require("dotenv");
env.config();
const port = process.env.PORT || 4000;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the database.");
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
};
connectToDatabase();

const options = {
  method: "GET",
  url: "https://cars-data3.p.rapidapi.com/cars-data",
  params: {
    limit: "100",
    skip: "0",
  },
  headers: {
    "X-RapidAPI-Key": "6aaba333a5mshad82e54b81901e1p175197jsna0859336270b",
    "X-RapidAPI-Host": "cars-data3.p.rapidapi.com",
  },
};

app.get("/", async (req, res) => {
  try {
    // const response = await axios.request(options);
    // console.log(response.data);
    // res.json(response.data);
    res.json({
      message: "Hello World",
    });
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
