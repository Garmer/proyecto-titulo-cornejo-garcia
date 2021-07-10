const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Location = sequelize.define('location', {
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  regionId: {
    type: DataTypes.INTEGER,
  },
  communeId: {
    type: DataTypes.INTEGER,
  }
}, {
})

Location.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Location;