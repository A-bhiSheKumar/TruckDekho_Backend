const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const atlasRoute = require("./routes/atlas");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/atlas", atlasRoute);

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

const Truck = require("./models/Trucks");
const User = require("./models/Users");

app.post("/add-to-compare/:userId/:truckId", async (req, res) => {
  const userId = req.params.userId;
  const truckId = req.params.truckId;
  try {
    const truck = await Truck.findById(truckId);
    if (!truck) {
      return res.status(404).json({ error: "Truck not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const isAlreadyInComparison = user.comparisonList.includes(truckId);
    if (isAlreadyInComparison) {
      user.comparisonList.pull(truckId);
      await user.save();
      return res.status(200).json({
        message: "Truck removed from comparison",
        comparisonList: user.comparisonList,
      });
    } else {
      user.comparisonList.push(truckId);
      await user.save();
      return res.status(200).json({
        message: "Truck added to comparison",
        comparisonList: user.comparisonList,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
