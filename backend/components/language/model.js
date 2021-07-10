const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Language = sequelize.define('language', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  code: {
    type: DataTypes.TEXT,
  }
}, {
})

Language.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Language;