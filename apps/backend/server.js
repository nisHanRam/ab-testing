// Imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const db = require("./models");
const userRoutes = require("./routes/user.routes");

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 8080; // Set the port from environment variables or default to 8080

const app = express(); // Create an Express application

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
db.sequelize
  .sync({ force: false }) // This will create the tables if they do not exist
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes setup
app.use("/api/users", userRoutes);

// Listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

