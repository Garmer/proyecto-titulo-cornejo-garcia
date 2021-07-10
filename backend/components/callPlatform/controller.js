const  CallPlatform = require("./model")

const listAll = async () => {
  return await CallPlatform.findAll()
}

module.exports = {
  listAll
}