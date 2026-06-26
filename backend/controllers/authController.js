const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters"
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(201).json({
      token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// Login
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// Get Current User
const getMe = async (req, res) => {
  try {

    const user = await User.findById(
      req.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = {
  register,
  login,
  getMe
};