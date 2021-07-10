import { TypesAuth as types } from "../types/"

const reducer = (state, action) => {
  switch (action.type) {
    case types.LOGIN:
      return action.payload
    case types.LOGOUT:
      window.location.href = "/"
      return action.payload
    case types.REGISTER:
      return action.payload
    default:
      throw new Error("Unexpected action")
  }
}

export default reducer
