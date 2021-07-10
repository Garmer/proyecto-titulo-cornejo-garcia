const Permission = require('../permission/model')

const findPermissionByName = async (name) => {
  const permission = await Permission.findOne({ where: { permission: name } })

  return permission
}

module.exports = {
  findPermissionByName
}

