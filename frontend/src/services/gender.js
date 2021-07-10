import API from "../utils/api"

let api = new API()

export default {
  getGenders(body) {
    return new Promise((resolve, reject) => {
      api
        .get(`genders`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
