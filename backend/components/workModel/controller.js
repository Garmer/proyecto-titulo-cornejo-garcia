const WorkModel = require("../workModel/model")

const listWorkModels = async (id) => {
  return await WorkModel.findAll()
}

module.exports = {
  listWorkModels
}