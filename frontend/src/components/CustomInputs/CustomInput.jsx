import React from "react"
import { Input } from "antd"


const Search = Input.Search

const CustomInput = ({ label, search, handleSearch, ...rest }) => {
  return (
    <>
      {!search ? (
        <Input {...rest} />
      ) : (
        <Search {...rest} onSearch={value => handleSearch(value)} />
      )}
    </>
  )
}

export default CustomInput
