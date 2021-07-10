const Parent = require("../parent/model")
const User = require("../user/model")
const Appointment = require("../appointment/model")
const AppointmentSchedule = require("../appointmentSchedule/model")
const Psychologist = require("../psychologist/model")
const CallPlatform = require("../callPlatform/model")
const Child = require("../child/model")
const AppointmentReview = require("../appointmentReview/model")

const createParent = async (user, parentData) => {
  parentData.userId = user.id
  parentData.dateOfBirth = new Date(parentData.dateOfBirth)
  return await Parent.create(parentData)
}

const validateRegisterFields = (body) => {
  const { rut, dateOfBirth, phoneNumber } = body
  if (!rut || !dateOfBirth || !phoneNumber){
    return null
  }
  else{
    return {
      rut,
      dateOfBirth,
      phoneNumber,
    }
  }
}

const getParentById = async (id) => {
  return await Parent.findOne({
    where: {id: id},
    include: [
      {
        model: User,
        attributes:['id', 'name', 'lastName', 'isMailVerified', 'mail']
      },
      {
        model: Child
      }
    ]
  })
}

const getAppointments = async (id) => {
  return await Appointment.findAll({
    where:{
      parentId: id
    },
    attributes:['id', 'statusAppointment', 'createdAt', 'updatedAt', 'urlCall'],
    include: [
      {
        model: AppointmentSchedule,
        attributes:['id', 'createdAt', 'updatedAt', 'startDate', 'endDate', 'isReserved'],
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
        attributes:['id', 'name', 'urlLogo', ]
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
const validatePhoneNumberField = (body, parentId) => {
  const { phoneNumber } = body
  if (!phoneNumber || !parentId){
    return null
  }
  else{
    return {
      phoneNumber,
      parentId,
    }
  }
} 

const validateChildFields = (body, parentId) => {
  const { name, lastName, dateOfBirth } = body

  if(!name || !lastName || !dateOfBirth || !parentId){
    return null
  }

  return {
    name,
    lastName,
    dateOfBirth,
    parentId
  }
}

module.exports = {
  createParent,
  validateRegisterFields,
  getParentById,
  getAppointments,
  validatePhoneNumberField,
  validateChildFields
}