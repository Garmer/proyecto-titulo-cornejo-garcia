const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const PsychologistCallPlatform = sequelize.define('psychologistCallPlatform', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  freezeTableName: true
})

module.exports = PsychologistCallPlatform;