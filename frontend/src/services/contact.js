import API from "../utils/api"

let api = new API()

export default {
  sendMessage(body) {
    return new Promise((resolve, reject) => {
      api
        .post(`contact`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }
}
