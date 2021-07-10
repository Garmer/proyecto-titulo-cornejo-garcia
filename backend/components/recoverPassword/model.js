const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const User = require("../user/model")

const RecoverPassword = sequelize.define('recoverPassword', {
  expirationDate: {
    type: DataTypes.DATE
  },  
  code: {
    type: DataTypes.TEXT
  },  
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  freezeTableName: true
})

User.hasMany(RecoverPassword, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT' 
})

RecoverPassword.belongsTo(User,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT' 
})

RecoverPassword.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = RecoverPassword;