
const express = require("express");
const router = express.Router();
const {Register, Login, Logout, UpdatePassword} = require("../controllers/auth.js");


router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/updatepassword/:userId", UpdatePassword);

module.exports = router;

