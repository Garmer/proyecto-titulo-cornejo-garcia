import React, { createContext, useState, useReducer, useEffect } from "react"

// Reducers
import { reducerAuth } from "./reducers/"

// Actions
import useActionsAuth from "./actions/auth"

const initialState = {
  user: null
}

const getLocalUser = () => JSON.parse(localStorage.getItem("user")) || null

const StoreContext = createContext(initialState)

const StoreProvider = ({ children }) => {
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  const [user, dispatchAuth] = useReducer(reducerAuth, getLocalUser())

  // Set up actions
  const authActions = useActionsAuth(user, dispatchAuth)

  const auxState = {
    ...initialState,
    user
  }

  const [state, setState] = useState(auxState)

  const actions = {
    authActions
  }

  useEffect(() => {
    if (state.user) {
      const auxState = {
        user
      }

      setState({ ...state, ...auxState })
    } else {
      setState({ ...state, user })
    }
  }, [user])

  return <StoreContext.Provider value={{ state, actions }}>{children}</StoreContext.Provider>
}

export { StoreContext, StoreProvider }
