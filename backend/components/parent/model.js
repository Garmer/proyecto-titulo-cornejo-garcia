const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize

const User = require('../user/model')

const Parent = sequelize.define('parent', {
  rut: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
})


Parent.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

User.hasOne(Parent, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})


Parent.sync({ alter:true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Parent;