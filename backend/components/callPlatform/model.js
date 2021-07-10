const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const CallPlatform = sequelize.define('callPlatform', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlLogo: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true
})

CallPlatform.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = CallPlatform;