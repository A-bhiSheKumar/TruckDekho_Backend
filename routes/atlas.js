const express = require("express");
const router = express.Router();
const { Filter } = require("../controllers/atlas");

router.get("/products", Filter);

module.exports = router;