const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize

const Permission = sequelize.define('permission', {
  permission: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true
})

Permission.sync({alter:true})
.then(() => null)
.catch(error => console.log(error))

module.exports = Permission;