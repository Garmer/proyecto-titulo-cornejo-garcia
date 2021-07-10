const Child = require('../child/model')

const getChildByParentId = async (parentId) => {
  return await Child.findOne({
    where: {
      parentId: parentId
    }
  })
}

const add = async (child) => {
  return await Child.create(child)
}

module.exports = {
  getChildByParentId,
  add
}