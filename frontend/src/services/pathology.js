import API from "../utils/api"

let api = new API()

export default {
  getPathology(body) {
    return new Promise((resolve, reject) => {
      api
        .get(`pathologies`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
