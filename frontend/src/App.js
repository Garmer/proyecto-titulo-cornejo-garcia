import React from 'react'
import { StoreProvider } from "./context/StoreContext"
import { createBrowserHistory } from "history"
import CustomRouter from "./router/Router"
import './App.css'

const history = createBrowserHistory();

const App = () => {

  return (
    <StoreProvider>
      <CustomRouter history={history}/>
    </StoreProvider> 
  )
}

export default App
