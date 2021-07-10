import React from "react"
import { Select } from "antd"

const Option = Select.Option

const CustomSelect = React.forwardRef((props, ref) => {
  const { data, ...rest } = props
  return (
    <>
      <Select 
        {...rest} ref={ref} 
      >
        {data
          ? data.map((item, index) => (
              <Option key={index} value={item.id || item.value} name={item.name || item.label} disabled={item.disabled ? true : false}>
                {item.name}
              </Option>
            ))
          : null}
      </Select>
    </>
  )
})

export default CustomSelect