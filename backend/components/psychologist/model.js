const { sequelize, Sequelize } = require("../../db")
const { DataTypes } = Sequelize

const User = require('../user/model')
const WorkModel = require('../workModel/model')
const Pathology = require('../pathology/model') 
const PsychologistPathology = require('../psychologistPathology/model')
const Gender = require('../gender/model')
const CallPlatform = require('../callPlatform/model')
const PsychologistCallPlatform = require('../psychologistCallPlatform/model')
const PsychologistLanguage = require('../psychologistLanguage/model')
const Language = require('../language/model')

const Psychologist = sequelize.define('psychologist', {
  urlProfilePicture: {
    type: DataTypes.TEXT,
    defaultValue: "https://proyecto-files.s3-sa-east-1.amazonaws.com/blank-profile-picture-973460_960_720.webp"
  },
  description: {
    type: DataTypes.TEXT,
  },
  locationId: {
    type: DataTypes.INTEGER,
  },
  rut: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  verificationInProcess: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true
})

User.hasOne(Psychologist, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Psychologist.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Psychologist.belongsTo(WorkModel, {
  onDelete: 'RESTRICT'
})

WorkModel.hasMany(Psychologist, {
  onDelete: 'RESTRICT'
})

Psychologist.belongsToMany(Pathology, {
  through: PsychologistPathology,
  foreignKey: "psychologistId"
});

Pathology.belongsToMany(Psychologist, {
  through: PsychologistPathology,
  foreignKey: "pathologyId"
});

Psychologist.belongsTo(Gender, {
  onDelete: 'RESTRICT'
})

Gender.hasMany(Psychologist, {
  onDelete: 'RESTRICT'
})

Psychologist.belongsToMany(CallPlatform, {
  through: PsychologistCallPlatform,
  foreignKey: "psychologistId"
});

CallPlatform.belongsToMany(Psychologist, {
  through:  PsychologistCallPlatform,
  foreignKey: "callPlatformId"
});

Psychologist.belongsToMany(Language, {
  through: PsychologistLanguage,
  foreignKey: "psychologistId"
});

Language.belongsToMany(Psychologist, {
  through: PsychologistLanguage,
  foreignKey: "languageId"
});

Psychologist.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

PsychologistPathology.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

PsychologistCallPlatform.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

PsychologistLanguage.sync({ alter: true })
.then(() => null)
.catch(error => console.log(error))

module.exports = Psychologist;