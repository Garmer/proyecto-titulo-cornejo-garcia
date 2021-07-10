const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Region = sequelize.define('region', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  number: {
    type: DataTypes.TEXT,
  }
}, {
})

Region.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Region;