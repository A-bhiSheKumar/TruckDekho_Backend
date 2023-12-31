
const Truck = require("../models/Trucks");
const User = require("../models/Users");

const AddCompareProducts = async (req, res) => {
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
};

const GetCompareProducts = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const comparisonList = user.comparisonList;
    const truckInfoArray = [];
    for (const truckId of comparisonList) {
      const truck = await Truck.findById(truckId);
      if (truck) {
        truckInfoArray.push(truck);
      }
    }
    res.status(200).json(truckInfoArray);
  } catch (error) {
    console.error("Error retrieving comparison list:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { AddCompareProducts, GetCompareProducts };

