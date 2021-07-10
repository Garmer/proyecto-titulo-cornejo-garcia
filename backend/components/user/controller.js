const User = require("./model");
const Parent = require("../parent/model")
const Psychologist = require("../psychologist/model")
const permissionController = require("../permission/controller");
const { response } = require("express");

async function listUsers() {
  const users = await User.findAll()
  console.log(users)
  return users
}

const createUser = async (user) => {
  return await User.create(user)
}

const validateRegisterFields = async (body) => {
  const { name, lastName, mail, password, confirmedPassword, role } = body
  if (!role || !name || !password || !confirmedPassword || !mail || !lastName){
    return null
  }
  else{
    const roleFound = await permissionController.findPermissionByName(role)

    if (!roleFound){
      return null
    }

    return {
      name,
      lastName,
      mail,
      password,
      permissionId: roleFound.id
    }
  }
}

const validateLoginFields = async (body) => {
  const { mail, password, role } = body

  if (!mail || !password || !role){
    return null
  }

  try {
    if(password.length < 8){
      return null
    }
  } catch (error) {
    return null
  }

  let roleFound = null
  try{
    roleFound = await permissionController.findPermissionByName(role)
  }catch(error){
    console.log(error)
  }

  if(!roleFound) return null
 
  return {
    mail,
    password,
    permission: roleFound.dataValues
  }
}

const getUserByMail = async (mail) => {
  if (!mail) return null

  const user = await User.findOne({
    where: {
      mail: mail
    }
  })

  return user
}

const getUserProfile = async (userId) => {
  console.log(userId)
  const psychologist = await Psychologist.findOne({
    where: {
      userId: userId 
    }
  })

  const parent = await Parent.findOne({
    where: {
      userId: userId 
    }
  })

  return {
    psychologist: psychologist ? psychologist.dataValues : null,
    parent: parent ? parent.dataValues : null
  }
}

const validatedChangePasswordFields = (body) => {
  const { newPassword, oldPassword, confirmedNewPassword, mail } = body
  console.log(body)
  if (!newPassword || !oldPassword || !confirmedNewPassword || !mail || newPassword !== confirmedNewPassword){
    return false
  }

  return {
    newPassword,
    oldPassword,
    confirmedNewPassword,
    mail,
    newPassword,
    confirmedNewPassword
  }
}

const validateVerifyMailFields = (body) => {
  const { userId, mailVerificationCode } = body
  
  if (!userId || !mailVerificationCode){
    return null
  }

  return {
    userId,
    mailVerificationCode
  }
}

const getUserById = async (userId) => {
  if (!userId) return null
  
  return await User.findByPk(userId)
}

const validateModifyDataFields = (body, userId) => {
  const { name, lastName, mail } = body

  if (!userId || !name || !lastName || !mail) {
    return null
  }

  return {
    userId,
    name,
    lastName,
    mail,
  }
}

module.exports = {
  listUsers,
  createUser,
  validateRegisterFields,
  getUserByMail,
  validateLoginFields,
  validatedChangePasswordFields,
  validateVerifyMailFields,
  getUserById,
  getUserProfile,
  validateModifyDataFields,
}