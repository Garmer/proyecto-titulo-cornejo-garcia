import axios from "axios"
import dotenv from "dotenv"

// /* Config Vars */
dotenv.config()

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"))
}

const generateHeaders = () => {
  const user = getToken()
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user && user.token ? user.token.token : null}`
    }
  }
}

const generateHeadersUpload = () => {
  const user = getToken()
  return {
    headers: {
      Authorization: `Bearer ${user ? user.token : null}`
    }
  }
}

export default class API {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL
  }

  get(endPoint) {
    return axios.get(`${this.baseUrl}/${endPoint}`, generateHeaders())
  }

  post(endPoint, body) {
    return axios.post(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  put(endPoint, body) {
    return axios.put(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  patch(endPoint, body) {
    return axios.patch(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  delete(endPoint) {
    return axios.delete(`${this.baseUrl}/${endPoint}`, generateHeaders())
  }

  deleteWithBody(endPoint, body) {
    return axios.delete(`${this.baseUrl}/${endPoint}`, {data: body, headers: generateHeaders().headers})
  }

  upload(endPoint, body) {
    return axios.post(`${this.baseUrl}/${endPoint}`, body, generateHeadersUpload())
  }
}
