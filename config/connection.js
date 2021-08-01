// =============================================
//  Connection
// ---------------------------------------------
// Handles the MySQL database connection and
// associated configuration
// =============================================
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

// Checks for a JAWSDB url, for deployment to Heroku
// This overrides all other connection variables
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {});
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.HOST_URL,
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
