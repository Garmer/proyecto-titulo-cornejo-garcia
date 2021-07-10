const express = require('express')
const bcrypt = require('bcrypt')
const response = require('../../network/response')
const permissionController = require("../permission/controller")
const userController = require('./controller')
const parentController = require("../parent/controller")
const psychologistController = require("../psychologist/controller")
const authUtils = require("../../utils/auth")
const mailUtils = require("../../utils/mail")

const Permission = require('../permission/model')

const router = express.Router()

router.get('/', async (req, res) => {
    // controller.listUsers()
    //     .then(users => {
  try {
      const allUsers = await controller.listUsers() 
      response.success(req, res, { 'users': allUsers }, 200)
  } catch (error) {
      console.log(error)
      response.error(req, res, null, 400)
  }
    // })
    // .catch(err => {
    //     response.error(req, res, 'Internal error', 500, err);
    // });

        
})

router.post('/register', async (req, res) => {

  //validate user basic fields
  let validatedUserFields = null
  try {
    validatedUserFields = await userController.validateRegisterFields(req.body)
  } catch (error) {
    console.log(error)
  }

  if (!validatedUserFields){
    return response.error(req, res, 400)
  }

  //validate parent specific fields
  let parentValidatedFields = null
  if (req.body.role && req.body.role.toLowerCase() === "parent"){
    try {
      parentValidatedFields = parentController.validateRegisterFields(req.body)
    } catch (error) {
      console.log(error)
    }

    if (!parentValidatedFields){
      return response.error(req, res, 400)
    }
  }

  //validate psychologist especific fields
  let psychologistValidatedFields = null
  let languagesValidatedFields = null
  if (req.body.role && req.body.role.toLowerCase() === "psychologist"){
    try {
      psychologistValidatedFields = psychologistController.validateRegisterFields(req.body)
      languagesValidatedFields = psychologistController.validateLanguagesFields(req.body)
    } catch (error) {
      console.log(error)
    }

    if(!psychologistValidatedFields || !languagesValidatedFields){
      return response.error(req, res, 400)
    }
    
  }

  //search for user with the same email
  let userFound = null
  try {
    userFound = await userController.getUserByMail(validatedUserFields.mail)
  } catch (error) {
    console.log(log)
  }
  if( userFound ) return response.error(req, res, 409)

  //generate hasPassword and radom verification code
  validatedUserFields.password = authUtils.hashPassword(validatedUserFields.password)
  validatedUserFields.verificationCode = Math.floor(100000 + Math.random() * 900000)
  validatedUserFields.isMailVerified = false

  //create new user
  let newUser = null
  try {
    newUser = await userController.createUser(validatedUserFields)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }
 
  if (!newUser) return response.error(req, res,500)

  let newParent = null
  let newPsychologist = null
  if (req.body.role && req.body.role.toLowerCase() === "psychologist"){
    try {
      newPsychologist = await psychologistController.createPsychologist(newUser.dataValues, psychologistValidatedFields)
      let newPsychologistLanguages = await psychologistController.createPsychologistLanguages(newPsychologist.dataValues.id, languagesValidatedFields.languages)
    } catch (error) {
      console.log(error)
    }

    if (!newPsychologist) return response.error(req, res, 500)
  }
  else if (req.body.role && req.body.role.toLowerCase() === "parent"){
    try {
      newParent = await parentController.createParent(newUser.dataValues, parentValidatedFields)
    } catch (error) {
      console.log(error)
    }

    if (!newParent) return response.error(req, res, 500)
  }

  const mailSent = mailUtils.sendConfirmRegisterMail(validatedUserFields.mail, validatedUserFields.name, validatedUserFields.verificationCode)

  if (mailSent){
    console.log("add atttribute ta user table to know if mail is sent")
  }

  let newUserData = newUser.dataValues
  delete newUserData.password

  response.success(req, res, newUser, 201)
})

router.post('/login', async (req, res) => {
  let validatedLoginFields = null
  try {
    validatedLoginFields = await userController.validateLoginFields(req.body)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  if (!validatedLoginFields) return response.error(req, res, 401)

  let userFound = null
  try {
    userFound = await userController.getUserByMail(validatedLoginFields.mail)
  } catch (error) {
    console.log(error)
  }

  console.log(userFound)

  if (!userFound) return response.error(req, res, 409)
  
  if(userFound.permissionId != validatedLoginFields.permission.id){
    return response.error(req, res, 401)
  }

  let isPasswordcorrect = false 
  try {
    const result = await bcrypt.compare(validatedLoginFields.password, userFound.password)
    if (result) isPasswordcorrect = true
  } catch (error) {
    console.log(error)
    response.error(req, res, 401)
  }

  let profileUser = null
  try {
    profileUser = await userController.getUserProfile(userFound.id)
  } catch (error) {
    console.log(error)
  }

  let userFoundData = userFound.dataValues
  delete userFoundData.password
  delete userFoundData.createdAt
  delete userFoundData.verificationCode
  delete userFoundData.updatedAt
  userFoundData.permission = validatedLoginFields.permission.permission

  if (profileUser && profileUser.parent){
    userFoundData.parent = profileUser.parent
  }
  
  if (profileUser && profileUser.psychologist){
    userFoundData.psychologist = profileUser.psychologist
  }

  if (isPasswordcorrect){
    try {
      let token = authUtils.issueJWT(userFoundData)

      return response.success(req, res, { token, user: userFoundData }, 200)
    } catch (error) {
      console.log(error)
      return response.error(req, res, 401)
    }
  }
  else{
    return response.error(req, res, 401)
  }
  
})

router.post('/change-password', authUtils.authenticate, async (req, res) => {
  let validatedChangePasswordFields = userController.validatedChangePasswordFields(req.body)

  if (!validatedChangePasswordFields){
    return response.error(req, res, 400)
  }

  let userFound = null 
  try {
    userFound = await userController.getUserByMail(validatedChangePasswordFields.mail)
  } catch (error) {
    console.log(error)
  }

  if (!userFound) return response.error(req, res, 403)

  try {
    const result = await bcrypt.compare(validatedChangePasswordFields.oldPassword, userFound.password)
    if (result) isPasswordcorrect = true
  } catch (error) {
    console.log(error)
    return response.error(req, res, 401)
  }
  
  userFound.password = authUtils.hashPassword(validatedChangePasswordFields.newPassword)

  try {
    await userFound.save()
    console.log(userFound)
    return response.success(req, res, null, 200)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }
 
})

router.post('/verify-mail', authUtils.authenticate, async (req, res) => {

  let validatedFields = userController.validateVerifyMailFields(req.body)
  
  if (!validatedFields){
    return response.error(req, res, 400)
  }

  let userFound = null
  try {
    userFound = await userController.getUserById(validatedFields.userId)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  if (!userFound) return response.error(req, res, 404)

  if (userFound.verificationCode == validatedFields.mailVerificationCode){
    userFound.isMailVerified = true
    try {
      await userFound.save()
      return response.success(req, res, null, 200)
    } catch (error) {
      console.log(error)
      return response.error(req, res, 500)
    }
  }
  else{
    return response.error(req, res, 403)
  }
})

router.patch('/:id/personal-data', authUtils.authenticate, async (req, res) => {

  let validateFields = userController.validateModifyDataFields(req.body, req.params.id)

  if (!validateFields) return response.error(req, res, 400)

  let userFound = null

  try {
    userFound = await userController.getUserById(validateFields.userId)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  if (!userFound) return response.error(req, res, 404)

  try {
    userFound.name = validateFields.name
    userFound.lastName = validateFields.lastName
    if (validateFields.mail != userFound.mail) {
      userFound.isMailVerified = false
    }
    await userFound.save()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }
  

  return response.success(req, res, null, 200)

})

module.exports = router;