const AppointmentReview = require("../appointmentReview/model")

const addAppointmentReview = async (appointmentReview) => {
  return AppointmentReview.create(appointmentReview)
}

const getAppointmentReviewById = async (id) => {
  return AppointmentReview.findByPk(id)
}

const validateAddAppointmenReviewFields = (body) => {
  const { comment, score, appointmentId } = body

  if(!comment || !score, !appointmentId){
    return null
  }

  return {
    comment,
    score,
    appointmentId
  }
}

module.exports = {
  addAppointmentReview,
  getAppointmentReviewById,
  validateAddAppointmenReviewFields
}