const express = require('express')
const response = require('../../network/response')
const parentController = require("./controller")
const authUtils = require("../../utils/auth")
const childController = require("../child/controller")

const router = express.Router()

router.get('/:id', authUtils.authenticate, async (req, res) => {
  let parentFound
  try {
    parentFound = await parentController.getParentById(req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!parentFound) return response.error(req, res, 404)

  let parentData = parentFound.dataValues
  
  delete parentData.createdAt
  delete parentData.updatedAt
  delete parentData.userId
  
  return response.success(req, res, { parent: parentData}, 200)
})

router.get('/:id/appointments',authUtils.authenticate, async (req, res) => {
  let appointments =[]
  try {
    appointments = await  parentController.getAppointments(req.params.id)
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, { appointments }, 200)

})

router.patch('/:id/phonenumber', authUtils.authenticate, async (req, res) => {
  let validateFields = null

  try {
    validateFields = parentController.validatePhoneNumberField(req.body, req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!validateFields) {
    return response.error(req, res, 400)
  }

  let parentFound = null
  try {
    parentFound = await  parentController.getParentById(validateFields.parentId)
  } catch (error) {
    console.log(error)
  }

  if(!parentFound){
    return response.error(req, res, 404)
  }

  try {
    parentFound.phoneNumber = validateFields.phoneNumber
    await parentFound.save()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  return response.success(req, res, null, 200)
  
})

router.put('/:id/child', authUtils.authenticate, async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = parentController.validateChildFields(req.body, req.params.id)
  } catch (error) {
    console.log(error)
  }

  if(!validatedFields){
    return response.error(req, res, 400)
  }

  let parentFound = null
  try {
    parentFound = await parentController.getParentById(validatedFields.parentId)
  } catch (error) {
    console.log(error)
  }

  if(!parentFound){
    return response.error(req, res, 404)
  }

  let childFound = null
  try {
    childFound = await childController.getChildByParentId(validatedFields.parentId)
  } catch (error) {
    console.log(error)
  }

  let childCreated = null
  if(!childFound){
    try {
      childCreated = await childController.add(validatedFields)
    } catch (error) {
      console.log(error)
      return response.error(req, res, 500)
    }
  }else{
    try {
      childFound.name = validatedFields.name
      childFound.lastName = validatedFields.lastName
      childFound.dateOfBirth = validatedFields.dateOfBirth
      await childFound.save()
    } catch (error) {
      console.log(error)
      return response.error(req, res, 500)
    }
  }

  return response.success(req, res, null, 200)

})

module.exports = router;