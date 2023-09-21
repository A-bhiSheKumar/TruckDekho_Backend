const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

app.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secureHash = await bcrypt.hash(req.body.password, salt);
  UserModel.create({
    username: req.body.username,
    password: secureHash,
    email: req.body.email,
  })
    .then((User) => {
      const token = createToken(User._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ userId: User._id });
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  await UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      const passwordCompare = bcrypt.compare(user.password, password);
      if (passwordCompare) {
        const data = {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        };
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({user: user._id});
      } else {
        res.json("Password incorrect!!");
      }
    } else {
      res.json("User not found!!");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
