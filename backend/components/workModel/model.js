const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Psychologyst = require("../psychologist/model")

const WorkModel = sequelize.define('workModel', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
})

WorkModel.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = WorkModel;