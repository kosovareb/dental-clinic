// Load environment variables from .env file
require("dotenv").config();

const { Sequelize } = require("sequelize");

// Retrieve database configuration from environment variables
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// Create Sequelize instance with environment variable values
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  loging: false,
});

// Export the Sequelize instance
module.exports = sequelize;
