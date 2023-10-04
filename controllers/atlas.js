const TrucksModel = require("../models/Trucks");

const Filter = async (req, res) => {
  try {
    const filter = {};

    if (req.query.minPrice) {
      filter.price = filter.price || {};
      filter.price.$gte = req.query.minPrice;
    }
    if (req.query.maxPrice) {
      filter.price = filter.price || {};
      filter.price.$lte = req.query.maxPrice;
    }
    if (req.query.company) {
      filter.company = req.query.company;
    }
    if (req.query.year) {
      filter.year = req.query.year;
    }
    if (req.query.Gross_vehicle_weight) {
      filter.Gross_vehicle_weight = req.query.Gross_vehicle_weight;
    }
    if (req.query.payload) {
      filter.payload = req.query.payload;
    }
    if (req.query.bodylength) {
      filter.bodylength = req.query.bodylength;
    }
    const products = await TrucksModel.find(filter);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { Filter };
