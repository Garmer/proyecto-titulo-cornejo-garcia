const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Psychologist = require("../psychologist/model")

const WorkHistory = sequelize.define('workHistory', {
  position: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  company: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descriptionOfActivity: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  freezeTableName: true
})

WorkHistory.belongsTo(Psychologist, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Psychologist.hasMany(WorkHistory, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

WorkHistory.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = WorkHistory;