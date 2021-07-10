
module.exports = {
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  dbUserName: process.env.DB_USER_NAME,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  pool: {
    max: 5,
    min: 0
  }
}