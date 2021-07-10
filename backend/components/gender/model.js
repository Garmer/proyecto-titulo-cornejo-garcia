const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize

const Gender = sequelize.define('gender', {
  name: {
    type: DataTypes.TEXT
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
})

Gender.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Gender