const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const PsychologistLanguage = sequelize.define('psychologistLanguage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  freezeTableName: true
})


module.exports = PsychologistLanguage;