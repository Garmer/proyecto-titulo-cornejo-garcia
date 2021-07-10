const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize
const Psychologyst = require("../psychologist/model")

const AcademicHistory = sequelize.define('academicHistory', {
  degree: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  specialty: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  college: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  psychologistId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  urlDegreeCertificate: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
})

AcademicHistory.belongsTo(Psychologyst, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Psychologyst.hasMany(AcademicHistory, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

AcademicHistory.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = AcademicHistory;