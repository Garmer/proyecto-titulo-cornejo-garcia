const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUserName, dbConfig.dbPassword, {
  logging: false,
  host: dbConfig.dbHost,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.connect = async function() {
  try {
    await this.sequelize.authenticate();
    console.log('DB connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}
// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;