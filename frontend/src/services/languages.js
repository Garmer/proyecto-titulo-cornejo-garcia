import API from "../utils/api"

let api = new API()

export default {
  getLanguages(body) {
    return new Promise((resolve, reject) => {
      api
        .get(`languages`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
