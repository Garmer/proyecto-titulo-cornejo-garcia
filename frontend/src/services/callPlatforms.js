import API from "../utils/api"

let api = new API()

export default {
  getCallPlatforms() {
    return new Promise((resolve, reject) => {
      api
        .get(`call-platforms`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }
}
