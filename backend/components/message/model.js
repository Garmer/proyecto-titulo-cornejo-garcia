const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Message = sequelize.define('message', {
  subject: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  appointmentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
})

Message.sync()

module.exports = Message;