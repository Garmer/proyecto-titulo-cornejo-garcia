import API from "../utils/api"

let api = new API()

export default {

  //Métodos asociados al padre

  getParentById(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`parent/${id}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  modifyPhoneNumber(id, body) {
    return new Promise((resolve, reject) => {
      api
        .patch(`parent/${id}/phonenumber`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  //Métodos asociados al hijo

  modifyChildData(id, body) {
    return new Promise((resolve, reject) => {
      api
        .put(`parent/${id}/child`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getParentAppointments (id) {
    return new Promise((resolve, reject) => {
      api
        .get(`parent/${id}/appointments`)

        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

}
