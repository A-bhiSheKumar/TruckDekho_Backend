const express = require("express");
const router = express.Router();
const { CompareProducts } = require("../controllers/compare");

router.post("/:userId/:truckId", CompareProducts);

module.exports = router;
