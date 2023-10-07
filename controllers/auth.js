const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const Register = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
    const token = createToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

const Login = async (req, res, next) => {
  try {
    const { mobile, email, password } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({
        message: "Either email or mobile number is required for login",
      });
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(401).json({ message: `Invalid ${mobile} or password` });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: `Invalid ${mobile} or password` });
    }

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    res.json({ message: "Logged Out" });
  } catch (error) {
    res.json(error);
  }
};

const UpdatePassword = async (req, res) => {
  const userId = req.params.userID;
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      res.status(404).json({ error: error.message });
    }
    const salt = await bcrypt.genSalt(10);
    const newhashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(userId, { password: newhashedPassword });
    req.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { Register, Login, Logout, UpdatePassword };
