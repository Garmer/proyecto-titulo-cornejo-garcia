const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Commune = sequelize.define('commune', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  regionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
})

Commune.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Commune;