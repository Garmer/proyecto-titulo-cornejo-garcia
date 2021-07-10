import API from "../utils/api"

let api = new API()

export default {
  getWorkModels(body) {
    return new Promise((resolve, reject) => {
      api
        .get(`work-models`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
