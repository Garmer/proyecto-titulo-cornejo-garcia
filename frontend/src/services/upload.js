import API from "../utils/api"

let api = new API()

export default {
  uploadSingleFile(file) {
    return new Promise((resolve, reject) => {
      api
        .upload("upload/single", file)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.error(error)
          reject(error.response.data)
        })
    })
  }

}
