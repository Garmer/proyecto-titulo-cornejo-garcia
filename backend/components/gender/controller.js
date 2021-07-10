const Gender = require("../gender/model")

const listAll = async () => {
 
  return await Gender.findAll()
}

module.exports = {
  listAll
}