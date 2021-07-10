const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize

const PsychologistPathology = sequelize.define('psychologistPathology', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  freezeTableName: true
})

module.exports = PsychologistPathology;