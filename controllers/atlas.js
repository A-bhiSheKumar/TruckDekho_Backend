
const TrucksModel = require("../models/Trucks");

const Filter = async (req, res) => {
    try {
      const products = await TrucksModel.find({
        price: {
          $regex: /^([3-5](\.\d{1,2})?) Lakh$/,
        },
      });
  
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = Filter;