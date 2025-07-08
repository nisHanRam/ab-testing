const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.User;

const signup = async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user logic (e.g., hashing password, saving to database)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      gender
    });

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        maxAge: 3600000, // 1 hour
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      });

      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);

      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } else {
      return res.status(400).json({ message: "User creation failed" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if gender is missing
    const needsGender = !user.gender;

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
    });

    console.log("user", JSON.stringify(user, null, 2));
    console.log(token);

    return res
      .status(200)
      .json({ message: "Login successful", user, token, needsGender });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const setGender = async (req, res) => {
  try {
    const { id } = req.params;
    const { gender } = req.body;

    if (!["male", "female"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.gender = gender;
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Gender updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in setGender controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  setGender,
};
