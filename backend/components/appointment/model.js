const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const CallPlatform = require("../callPlatform/model")
const Parent = require("../parent/model")
const AppointmentSchedule = require("../appointmentSchedule/model")

const Appointment = sequelize.define('appointment', {
  urlCall: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  callPlatformId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  appointmentScheduleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  statusAppointment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true
})

CallPlatform.hasMany(Appointment, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Appointment.belongsTo(CallPlatform, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Parent.hasMany(Appointment, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Appointment.belongsTo(Parent, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})


AppointmentSchedule.hasMany(Appointment, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Appointment.belongsTo(AppointmentSchedule, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Appointment.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Appointment;