import React from 'react'
import { Tabs } from 'antd'

const RightContainer = ({children}) => {

  return (
    <>
      <Tabs>
        {children}
      </Tabs>
    </>
  )
}

export default RightContainer