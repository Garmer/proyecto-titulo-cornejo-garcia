import API from "../utils/api"

let api = new API()

export default {
  getPsychologistAppointmentsSchedule(psychologistId) {
    return new Promise((resolve, reject) => {
      api
        .get(`psychologist/${psychologistId}/appointmentSchedules`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  updatePsychologistAppointmentsSchedule(psychologistId, body) {
    return new Promise((resolve, reject) => {
      api
        .put(`psychologist/${psychologistId}/appointmentSchedules`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getPsychologistAppointmentsSchedulePublic(psychologistId) {
    return new Promise((resolve, reject) => {
      api
        .get(`psychologist/${psychologistId}/appointmentSchedules/public`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }
}
