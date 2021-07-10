const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize

const Permission = require('../permission/model')

const User = sequelize.define('user', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mail: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isMailVerified: {
    type: DataTypes.BOOLEAN
  },
  verificationCode: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
})

User.belongsTo(Permission, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT' 
})

Permission.hasMany(User,{
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT' 
})

User.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = User;