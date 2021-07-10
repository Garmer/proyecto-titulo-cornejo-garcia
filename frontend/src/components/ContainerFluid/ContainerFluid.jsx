import React from "react"

const ContainerFluid = props => {
  return (
    <div className="container" {...props}>
      {props.children}
    </div>
  )
}

export default ContainerFluid
