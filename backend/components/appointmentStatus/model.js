const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const AppoinmentStatus = sequelize.define('appointmentStatus', {
  status: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  statusCode: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
})

AppoinmentStatus.sync()

module.exports = AppoinmentStatus;