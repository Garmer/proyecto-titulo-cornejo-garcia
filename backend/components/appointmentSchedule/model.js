const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize

const Psychologist = require("../psychologist/model")

const AppointmentSchedule = sequelize.define('appointmentSchedule', {
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  isReserved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  freezeTableName: true
})

AppointmentSchedule.belongsTo(Psychologist, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Psychologist.hasMany(AppointmentSchedule, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

AppointmentSchedule.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = AppointmentSchedule;