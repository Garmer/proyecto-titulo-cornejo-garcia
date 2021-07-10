import API from "../utils/api"

let api = new API()

export default {
  addAppointment(body) {
    return new Promise((resolve, reject) => {
      api
        .post(`appointments`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  deleteAppointment(body) {
    return new Promise((resolve, reject) => {
      api
        .delete(``, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  updateUrlCall(id, body) {
    return new Promise((resolve, reject) => {
      api
        .patch(`appointment/${id}/url-call`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  cancelAppointment(id, body) {
    return new Promise((resolve, reject) => {
      api
        .patch(`appointment/${id}/status`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

}
