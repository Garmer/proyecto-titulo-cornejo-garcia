const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Country = sequelize.define('country', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ituCode: {
    type: DataTypes.TEXT,
  }
}, {
})

Country.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Country;