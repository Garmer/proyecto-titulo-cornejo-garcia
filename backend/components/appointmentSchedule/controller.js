const AppointmentSchedule = require('./model')
const psychologistController = require("../psychologist/controller")
const moment = require("moment")

const validateCreateAppointmentScheduleFields = async () => {
  const { startDate, endDate, psychologistId } = body

  if (!startDate || !endDate || !psychologistId){
    return null
  }

  let psychologistFound = null 
  try {
    psychologistFound = await psychologistController.getPsychologistById(psychologistId)
  } catch (error) {
    console.log(error)
    return null
  }

  if (psychologistFound){
    return {
      startDate,
      endDate,
      psychologistId
    }
  }
  else{
    return null
  }

}

const createAppointmentSchedule = async (appointmentSchedule) => {

}
const getAvailableDate = async(date) => {

}

const getPsychologistAppointmentsSchedule = async (psychologistId) => {
  return await AppointmentSchedule.findAll({
    where: {
      psychologistId: psychologistId
    }
  })
}

const getAppointmentsScheduleById = async (id) => {
  return await AppointmentSchedule.findByPk(id)
}

const validateUpdateScheduleFields = (body, params) => {
  const { schedulesToDelete, schedulesToSave } = body
  const { id } = params

  if(!id || !schedulesToDelete || !schedulesToSave){
    return null
  }

  if(!Array.isArray(schedulesToDelete) || !Array.isArray(schedulesToSave)){
    return null
  }

  return {
    psychologistId: id,
    schedulesToDelete,
    schedulesToSave
  }
}

const deletePsychologistSchedule = async (scheduleId) => {
  return await AppointmentSchedule.destroy({
    where: {
      id: scheduleId
    }
  })
}

const deletePsychologistSchedules = async (schedulesToDelete) => {
  if(schedulesToDelete){
    for(let schedule of schedulesToDelete){
      await deletePsychologistSchedule(schedule.id)
    }
  }
}

const createPsychologistSchedules = async(schedules) => {
  return await AppointmentSchedule.bulkCreate(schedules)
}

const formatSchedule = (schedule) => {
  let scheduleFormatted = {}
  
  let startDate = schedule.date + " " + schedule.startTime
  let endDate = schedule.date + " " + schedule.endTime

  scheduleFormatted.startDate = startDate
  scheduleFormatted.endDate = endDate

  console.log(scheduleFormatted)
  return scheduleFormatted
}

const addPsychologistSchedules = async (schedulesToSave, psychologistId) => {
  let formattedSchedules = []
  if(schedulesToSave){
    for(let schedule of schedulesToSave){
      let scheduleFormatted = formatSchedule(schedule)
      scheduleFormatted.psychologistId = psychologistId
      formattedSchedules.push(scheduleFormatted)
    }

    return await createPsychologistSchedules(formattedSchedules)
    
  }
}

const updateIsReserved = async (id, isReserved) => {
  let appointmentScheduleFound = null
  try {
    appointmentScheduleFound = await getAppointmentsScheduleById(id)
  } catch (error) {
    console.log(error)
  }

  if (!appointmentScheduleFound){
    return null
  }

  appointmentScheduleFound.isReserved = isReserved

  return appointmentScheduleFound.save()
}

module.exports = {
  createAppointmentSchedule,
  validateCreateAppointmentScheduleFields,
  getAvailableDate,
  getPsychologistAppointmentsSchedule,
  validateUpdateScheduleFields,
  deletePsychologistSchedules,
  addPsychologistSchedules,
  getAppointmentsScheduleById,
  updateIsReserved
}