const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Appointment = require("../appointment/model")

const AppointmentReview = sequelize.define('appointmentReview', {
  score: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
})

AppointmentReview.belongsTo(Appointment, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Appointment.hasOne(AppointmentReview, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

AppointmentReview.sync({ alter:true })
.then(() => null)
.catch(error => console.log(error))

module.exports = AppointmentReview;