const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const UserModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((User) => {
      res.json(User);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if(user){
        if (user.password === password) {
          res.json("Logged in successfully!!");
        }
        else{
          res.json("Password incorrect!!");
        }
      }else{
        res.json("User not found!!");
      }
    })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
