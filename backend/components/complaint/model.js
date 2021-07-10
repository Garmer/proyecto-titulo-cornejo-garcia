const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Complaint = sequelize.define('complaint', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  psychologistId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
})

Complaint.sync()

module.exports = Complaint;