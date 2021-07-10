import { TypesAuth as types } from "../types"
import { authServices } from "../../services/"

const useActionsAuth = (state, dispatch) => {
  const login = async user => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await authServices.login(user)
        if (response.success) {
          localStorage.setItem("user", JSON.stringify(response.data))
          dispatch({ type: types.LOGIN, payload: response.data })
          resolve(response.data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  const logout = async () => {
    localStorage.clear()
    dispatch({ type: types.LOGOUT, payload: null })
  }

  const register = async user => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await authServices.register(user)
        if (response.success) {
          dispatch({ type: types.REGISTER, payload: response.user })
          resolve(response)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    login,
    logout,
    register
  }
}

export default useActionsAuth
