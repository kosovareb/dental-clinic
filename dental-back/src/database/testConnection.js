const sequelize = require('./db-connection');

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('HOORAY !! Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = testDatabaseConnection;
