const { Op } = require("sequelize")
const RecoverPassword = require("./model")

const validateRecoverPasswordFields = (body) => {
  const { mail } = body

  if(!mail){
    return null
  }

  return {
    mail
  }
}

const invalidateOldCodes = async (userId) => {
  return await RecoverPassword.update({ isActive: false }, {
    where: {
      userId
    }
  })
}

const add = async (data) => {
  return RecoverPassword.create(data)
}

const validateCodeFields = (body) => {
  const { newPassword, confirmedNewPassword, code, mail } = body

  if(!mail || !newPassword || !confirmedNewPassword, !code){
    return null
  }

  if(newPassword.length < 8){
    return null
  }

  if(newPassword != confirmedNewPassword){
    return null
  }

  return {
    newPassword,
    confirmedNewPassword,
    code,
    mail
  }
}

const getActivePasswordRecoverByUserId = async (userId) => {
  let date = new Date()
  let currentDateUTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
  return await RecoverPassword.findOne({
    where: {
      userId,
      isActive: true,
      expirationDate: {
        [Op.gt] : currentDateUTC
      }
    }
  })
}

module.exports = {
  validateRecoverPasswordFields,
  invalidateOldCodes,
  add,
  validateCodeFields,
  getActivePasswordRecoverByUserId
}