const Language = require("../language/model")

const listAll = async () => {
 
  return await Language.findAll()
}

module.exports = {
  listAll
}