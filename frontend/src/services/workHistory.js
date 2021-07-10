import API from "../utils/api"

let api = new API()

export default {
  addWorkHistory(body) {
    return new Promise((resolve, reject) => {
      api
        .post(`work-history`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
