const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Parent = require("../parent/model")

const Child = sequelize.define('child', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  freezeTableName: true
})

Child.belongsTo(Parent, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Parent.hasOne(Child, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Child.sync({ alter:true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Child;