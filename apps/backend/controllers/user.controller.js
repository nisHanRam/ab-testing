const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.User;

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
