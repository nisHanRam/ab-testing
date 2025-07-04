require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { dialect: "postgres" }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Database connection established successfully with ${process.env.DB_NAME}`
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = { Sequelize, sequelize };

db.User = require("./user.model")(sequelize, Sequelize);

module.exports = db;
