import API from "../utils/api"

let api = new API()

export default {

  //<---------- MÉTODOS GET ---------->

  getPsychologistById(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`psychologist/${id}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getPsychologistPathologies(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`psychologist/${id}/pathologies`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getPublicPsychologist(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`psychologist/${id}/public`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getPsychologistAppointments (id) {
    return new Promise((resolve, reject) => {
      api
        .get(`psychologist/${id}/appointments`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  

  //<------------------------------>

  //<---------- MÉTODOS PUT ---------->

  sendPathologies(id, body) {
    return new Promise((resolve, reject) => {
      api
        .put(`psychologist/${id}/pathologies`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  //<------------------------------>

  //<---------- MÉTODOS PATCH ---------->

  sendWorkModel(id, body) {
    return new Promise((resolve, reject) => {
      api
        .patch(`psychologist/${id}/work-model`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  updateVerificationInProcess(id, body) {
    return new Promise((resolve, reject) => {
      api
        .patch(`psychologist/${id}/verification-in-process`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  verifyPsychologist(id, body){
    return new Promise((resolve, reject) => {
      api
        .patch(`psychologist/${id}/verify`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  modifyPsychologistPersonalData(id, body) {
    return new Promise((resolve, reject) => {
      api
        .patch(`psychologist/${id}/personal-data`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  //<------------------------------>


  findPsychologists(query) {
    return new Promise((resolve, reject) => {
      api
        .get(`psychologists/search?${query}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getAllVerifiedPsychologists() {
    return new Promise((resolve, reject) => {
      api
        .get("psychologists")
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getAllUnverifiedPsychologists() {
    return new Promise((resolve, reject) => {
      api
        .get("not-verified-psychologists")
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }

}
