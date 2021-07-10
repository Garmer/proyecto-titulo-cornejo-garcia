const Appointment = require("./model")


const addAppointment = async (appointment) => {
  return Appointment.create(appointment)
}

const validateAddAppointmentFields = async (body) => {
  const { appointmentScheduleId, callPlatformId, parentId } = body

  if(!appointmentScheduleId || !callPlatformId || !parentId){
    return null
  }

  return {
    appointmentScheduleId,
    callPlatformId,
    parentId,
    statusAppointment: "reserved"
  }
}

const validateUrlCallFields = (body, appointmentId) => {
  const { urlCall } = body

  if(!urlCall || !appointmentId){
    return null
  }

  return {
    urlCall,
    appointmentId
  }

}

const getAppointmentById = async (id) => {
  return Appointment.findByPk(id)
}

const validateUpdateAppointmentStatusFields = (body, appointmentId) => {
  const { appointmentStatus, isAppointmentScheduleReserved } = body

  if(!appointmentId || !appointmentStatus || isAppointmentScheduleReserved == null){
    return null
  }

  return {
    appointmentId,
    appointmentStatus,
    isAppointmentScheduleReserved
  }
}

module.exports = {
  addAppointment,
  validateAddAppointmentFields,
  validateUrlCallFields,
  getAppointmentById,
  validateUpdateAppointmentStatusFields
}