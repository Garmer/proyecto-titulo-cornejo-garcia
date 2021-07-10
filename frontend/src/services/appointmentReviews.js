import API from "../utils/api"

let api = new API()

export default {
  addAppointmentReview(body) {
    return new Promise((resolve, reject) => {
      api
        .post(`appointmentReviews`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
