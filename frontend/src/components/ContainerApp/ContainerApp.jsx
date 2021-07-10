import React, { Fragment } from "react"

import Navbar from "../Navbar"
import ContainerFluid from "../ContainerFluid"

const ContainerApp = props => {

  return (
    <>
      <Navbar />
      <ContainerFluid {...props}>{props.children}</ContainerFluid>      
    </>
  )
}

export default ContainerApp
