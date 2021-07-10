const Pathology = require("./model")

async function listUsers() {
  return await Pathology.findAll()
}

module.exports = {
  listUsers
}