const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Pathology = sequelize.define('pathology', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true
})

Pathology.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Pathology;