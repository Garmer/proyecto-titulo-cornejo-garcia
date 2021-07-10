const express = require('express')
const academicHistoryController = require("./controller")
const response = require('../../network/response')
const authUtils = require("../../utils/auth")

const router = express.Router()

router.post('/academic-history', authUtils.authenticate, async (req, res) => {
  let validatedFields = null
  try{
    validatedFields = academicHistoryController.validateAcademicHistoryFields(req.body)
  }catch (error) {
    console.log(error)
  }

  if (!validatedFields) return response.error(req, res, 400)

  let newAcademicHistory = null
  try {
    newAcademicHistory = await academicHistoryController.createAcademicHistory(validatedFields)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }

  if(!newAcademicHistory) return response.error(req, res, 500)


  return response.success(req, res, { academicHistory: newAcademicHistory.dataValues }, 201)

})

module.exports = router;