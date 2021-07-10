const { Op } = require("sequelize")
const Psychologist = require("../psychologist/model")
const User = require("../user/model")
const WorkModel = require("../workModel/model")
const Pathology = require("../pathology/model")
const AcademicHistory = require("../academicHistory/model")
const WorkHistory = require("../workHistory/model")
const PsychologistPathology = require("../psychologistPathology/model")
const PsychologistLanguage = require("../psychologistLanguage/model") 
const Gender = require('../gender/model')
const Language = require('../language/model')
const Appointment = require('../appointment/model')
const AppointmentSchedule = require('../appointmentSchedule/model')
const CallPlatform = require('../callPlatform/model')
const Parent = require('../parent/model')
const Child = require('../child/model')
const AppointmentReview = require('../appointmentReview/model')

const createPsychologist = async (user, psychologistData) => {
  psychologistData.userId = user.id
  psychologistData.isVerified = false
  return await Psychologist.create(psychologistData)
}

const validateRegisterFields = (body) => {
  const { rut, gender } = body
  if (!rut || !gender){
    return null
  }
  else{
    return {
      rut,
      genderId: gender
    }
  }
}

const validateLanguagesFields = (body) => {
  const { languages } = body

  if(!languages || !Array.isArray(languages)){
    return null
  }

  return {
    languages
  }
}

const getPsychologistById = async (id) => {
  return await Psychologist.findOne({
    where: {id: id},
    include: [
      {
        model: User,
        attributes:['id', 'name', 'lastName', 'isMailVerified', 'mail']
      },
      {
        model: WorkModel,
        attributes:['id', 'name', 'description']
      },
      {
        model: Pathology,
        attributes:['id', 'name', 'description'],
        through: {
          attributes: []
        }
      },
      {
        model: Gender,
        attributes:['id', 'name']
      },
      {
        model: Language,
        attributes:['id', 'name'],
        through: {
          attributes: []
        }
      }, 
      {
        model: AcademicHistory
      },
      {
        model: WorkHistory
      }
      
  ]
  })
}

const formatParams = (params) => {
  let formattedParams = {}
  let paramsKeys = Object.keys(params)

  for (paramKey of paramsKeys){
    if(paramKey != "name"){
      if(params[paramKey] != "" && params[paramKey].includes(",")){
        formattedParams[paramKey] = params[paramKey].split(',').map(item => parseInt(item))
      }
      else{
        if(params[paramKey] != ""){
          formattedParams[paramKey] = [parseInt(params[paramKey])]
        }
      }
      
    }
    else{
      formattedParams[paramKey] = params[paramKey]
    }
  }

  return formattedParams
}

const searchPsychologists = async (params) => {
  let formattedParams = formatParams(params)
  let queryObject = {
    include: [
      {
        model: User,
        attributes:['id', 'name', 'lastName'],
        where: formattedParams.name ? {name: { [Op.iLike]: '%' + formattedParams.name +'%' }} : null
      },
      {
        model: WorkModel,
        attributes:['id', 'name', 'description'],
        where: formattedParams.workModels ? { id: formattedParams.workModels} : null
      },
      {
        model: Pathology,
        attributes:['id', 'name', 'description'],
        through: {
          attributes: []
        },
        where: formattedParams.pathologies ? { id: formattedParams.pathologies} : null
      },
      {
        model: Gender,
        attributes:['id', 'name'],
        where: formattedParams.genders ? { id: formattedParams.genders } : null
      },
      {
        model: Language,
        attributes:['id', 'name'],
        through: {
          attributes: []
        },
        where: formattedParams.languages ? { id: formattedParams.languages} : null
      }
    ]
  }
  
  console.log("params", formattedParams)

  return await Psychologist.findAll({
    ...queryObject
  })
}

const listAll = async () => {
  return await Psychologist.findAll({
    where : {
      isVerified: true
    },
    include: [
      {
        model: User,
        attributes:['id', 'name', 'lastName']
      },
      {
        model: WorkModel,
        attributes:['id', 'name', 'description']
      },
      {
        model: Pathology,
        attributes:['id', 'name', 'description'],
        through: {
          attributes: []
        }
      }
    ]
  })
}

const getNotVerifiedPsychologists = async() => {
  return await Psychologist.findAll({
    where : {
      isVerified: false
    },
    include: [
      {
        model: User,
        attributes:['id', 'name', 'lastName', 'createdAt']
      },
      {
        model: WorkModel,
        attributes:['id', 'name', 'description']
      },
      {
        model: Pathology,
        attributes:['id', 'name', 'description'],
        through: {
          attributes: []
        }
      },
      {
        model: AcademicHistory
      },
      {
        model: WorkHistory
      }
    ]
  })
}


const validatePathologiesFields = (body, psychologistId) => {
  const { pathologiesIds } = body

  if(!psychologistId || !pathologiesIds || pathologiesIds.length == 0){
    return null
  }

  let psychologistPathologies = pathologiesIds.map( (pathologyId) => {
    return { psychologistId, pathologyId }
  })

  return {
    psychologistId,
    psychologistPathologies
  }
}

const validateWorkModelFields = (body, psychologistId) => {
  const { workModelId } = body

  if(!workModelId || !psychologistId){
    return null
  }

  return {
    workModelId,
    psychologistId
  }
}

const deletePsychologistPathologies = async (psychologistId) => {
   let pathologies = await PsychologistPathology.findAll({
    where: {
      psychologistId
    }
  })

  await deleteSelectedPsychologistPathologies(pathologies)
}

const deleteSelectedPsychologistPathologies = async (pathologies) => {
  if(pathologies && pathologies.length > 0){
    for(let i = 0; i < pathologies.length ; i++){
      await pathologies[i].destroy()
    }
  }
}

const addPsychologistPathologies = async (psychologistPathologies) => {
  return await PsychologistPathology.bulkCreate(psychologistPathologies)
}

const createPsychologistLanguages = async (psychologistId, languages) => {
  let psychologistLanguages = []
 
  if (languages){
    for(let language of languages){
      psychologistLanguages.push({
        psychologistId,
        languageId: language
      })
    }

    return PsychologistLanguage.bulkCreate(psychologistLanguages)
  }
  else{
    return null
  }
}

const getAppointments = async (id) => {
  return await Appointment.findAll({
    attributes:['id', 'statusAppointment', 'createdAt', 'updatedAt', 'urlCall'],
    include: [
      {
        model: AppointmentSchedule,
        attributes:['id', 'createdAt', 'updatedAt', 'startDate', 'endDate', 'isReserved'],
        where: {
          psychologistId: id
        },
        include:[
          {
            model: Psychologist,
            attributes:['id', 'rut', 'urlProfilePicture', 'isVerified'],
            include:[
              {
                model: User,
                attributes:['id', 'name', 'lastName', 'isMailVerified', 'mail']
              }
            ]
          }
        ]
      },
      {
        model: CallPlatform,
        attributes:['id', 'name', 'urlLogo']
      },
      {
        model: Parent,
        attributes:['id', 'rut', 'phoneNumber', 'dateOfBirth'],
        include: [
          {
          model: User,
          attributes:['id', 'name', 'lastName', 'isMailVerified', 'mail']
          },
          {
            model: Child
          }
        ]
      },
      {
        model: AppointmentReview,
        attributes:['id', 'score', 'comment', 'createdAt', 'updatedAt']
      }
    ]
  })
}

const validatePsychologistFields = (body, psychologistId) => {
  const { urlProfilePicture, description } = body

  if (!urlProfilePicture || !description || !psychologistId) {
    return null
  }

  return {
    urlProfilePicture,
    description,
    psychologistId
  }
}

module.exports = {
  createPsychologist,
  validateRegisterFields,
  getPsychologistById,
  validateWorkModelFields,
  validatePathologiesFields,
  deletePsychologistPathologies,
  addPsychologistPathologies,
  validateLanguagesFields,
  createPsychologistLanguages,
  searchPsychologists,
  listAll,
  getAppointments,
  validatePsychologistFields,
  getNotVerifiedPsychologists
}