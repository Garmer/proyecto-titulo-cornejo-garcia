import API from "../utils/api"

let api = new API()

export default {
  addAcademicHistory(body) {
    return new Promise((resolve, reject) => {
      api
        .post(`academic-history`, body)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
}
