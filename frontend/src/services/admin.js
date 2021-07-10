import API from "../utils/api"

let api = new API()

export default {
  getParents(body) {
    return new Promise((resolve, reject) => {
      api
        .get(`/`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getPsychologists(body) {
    return new Promise((resolve, reject) => {
      api
        .get(`/`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
