const express = require("express");
const router = express.Router();
const {
  AddCompareProducts,
  GetCompareProducts,
} = require("../controllers/compare");

router.post("/:userId/:truckId", AddCompareProducts);
router.get("/:userId", GetCompareProducts);

module.exports = router;
