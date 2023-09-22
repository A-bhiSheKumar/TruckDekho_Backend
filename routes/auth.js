
const express = require("express");
const router = express.Router();
const {Register, Login, Logout} = require("../controllers/auth.js");


router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);


module.exports = router;