import API from "../utils/api"

let api = new API()

export default {
  verifyCode(code) {
    return new Promise((resolve, reject) => {
      api
        .post(`user/verify-mail`, code)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  modifyData(id, body) {
    return new Promise((resolve, reject) => {
      api
        .patch(`user/${id}/personal-data`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  modifyPassword(body) {
    return new Promise((resolve, reject) => {
      api
        .post("user/change-password", body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  //PETICIONES RELACIONADAS A RECUPERAR CONTRASEÑA

  sendCode(body) {
    return new Promise((resolve, reject) => {
      api
        .post("recover-password", body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  recoverPassword(body) {
    return new Promise((resolve, reject) => {
      api
        .post("recover-password/code", body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

}
