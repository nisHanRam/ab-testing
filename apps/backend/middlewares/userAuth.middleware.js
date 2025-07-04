const db = require("../models");
const { Op } = require("sequelize");

const User = db.User;

const saveUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    next();
  } catch (error) {
    console.error("Error in saveUser middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { saveUser };

