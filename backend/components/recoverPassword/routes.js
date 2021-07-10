const express = require('express')
const bcrypt = require('bcrypt')
const authUtils = require("../../utils/auth")
const response = require('../../network/response')
const userController = require('../user/controller')
const mailUtils = require("../../utils/mail")
const recoverPasswordController = require("./controller")

const router = express.Router()

router.post('/recover-password', async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = recoverPasswordController.validateRecoverPasswordFields(req.body)
  } catch (error) {
    console.log(error)
  }

  if(!validatedFields){
    return response.error(req, res, 400)
  }

  let userFound = null
  try {
    userFound = await userController.getUserByMail(validatedFields.mail)
  } catch (error) {
    console.log(error)
  }

  if(!userFound){
    return response.error(req, res, 400)
  }

  if(!userFound.isMailVerified){
    return response.error(req, res, 403)
  }

  let recoverPasswordUpdated = null
  try {
    recoverPasswordUpdated = await recoverPasswordController.invalidateOldCodes(userFound.id)
  } catch (error) {
    console.log(error)
  }

  let recoverPasswordCreated = null
  let code = Math.floor(100000 + Math.random() * 900000)
  try {
    var date = new Date(); 
    var utcDateAnHourFromNow =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1, date.getUTCMinutes(), date.getUTCSeconds())

    recoverPasswordCreated = await recoverPasswordController.add({
      code,
      userId: userFound.id,
      expirationDate: utcDateAnHourFromNow
    })
  } catch (error) {
    console.log(error)
  }

  if(!recoverPasswordCreated){
    return response.error(req, res, 500)
  }

  mailUtils.sendRecoverPasswordMail(userFound.mail, userFound.name, code)

  return response.success(req, res, null, 200) 
})


router.post('/recover-password/code', async (req, res) => {
  let validatedFields = null
  try{
    validatedFields = recoverPasswordController.validateCodeFields(req.body)
  }catch (err){
    console.log(error)
  }
  
  if(!validatedFields){
    return response.error(req, res, 400)
  }

  let userFound = null
  try {
    userFound = await userController.getUserByMail(validatedFields.mail)
  } catch (error) {
    console.log(error)
  }

  if(!userFound){
    return response.error(req, res, 403)
  }

  let recoverPasswordCode = null
  try {
    recoverPasswordCode = await recoverPasswordController.getActivePasswordRecoverByUserId(userFound.id)
  } catch (error) {
    console.log(error)
  }

  if(!recoverPasswordCode){
    return response.error(req, res, 403)
  }

  let isCodeValid = false
  if(recoverPasswordCode.code == validatedFields.code){
    isCodeValid = true
  }

  if(!isCodeValid){
    return response.error(req, res, 403)
  }
  
  try {
    userFound.password = authUtils.hashPassword(validatedFields.newPassword)
    await userFound.save()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }

  try {
    recoverPasswordUpdated = await recoverPasswordController.invalidateOldCodes(userFound.id)
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, null, 200)

})

module.exports = router;