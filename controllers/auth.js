
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
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = createToken(user._id);
    // res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", "token" :  token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    res.json({ message: "Logged Out" });
    res.redirect("http://localhost:3000/login");
  } catch (error) {
    res.json(error);
  }
};

module.exports = { Register, Login, Logout };
