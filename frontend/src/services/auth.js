import API from "../utils/api"

let api = new API()

export default {
  login(user) {
    return new Promise((resolve, reject) => {
      api
        .post("user/login", user)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  register(user) {
    return new Promise((resolve, reject) => {
      api
        .post("user/register", user)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.error(error)
          reject(error.response.data)
        })
    })
  },

  isLoggedIn() {
    if (localStorage.getItem("user")) {
      return true
    } else {
      return false
    }
  },

  getPermissionFromLocalStorage() {
    let userLocalStorage = JSON.parse(localStorage.getItem("user"))

    if (userLocalStorage){
      let user = userLocalStorage.user
      
      if (user){
        return user.permission
      }
    }
    else{
      return null
    }
  },

  getLogedInUser() {
    let userLocalStorage = JSON.parse(localStorage.getItem("user"))

    if (userLocalStorage){
      
      let user = userLocalStorage.user
      
      if (user){
        return user
      }
    }

    return null
  }
}
