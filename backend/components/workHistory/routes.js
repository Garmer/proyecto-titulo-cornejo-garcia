const express = require('express')
const response = require('../../network/response')
const authUtils = require("../../utils/auth")
const workHistoryController = require("./controller")

const router = express.Router()

router.post('/work-history', authUtils.authenticate, async (req, res) => {
  let validatedFields = null
  try{
    validatedFields = workHistoryController.validateWorkHistoryFields(req.body)
  }catch (error) {
    console.log(error)
  }

  if (!validatedFields) return response.error(req, res, 400)

  let newWorkHistory = null
  try {
    newWorkHistory = await workHistoryController.createWorkHistory(validatedFields)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }

  if(!newWorkHistory) return response.error(req, res, 500)


  return response.success(req, res, { workHistory: newWorkHistory.dataValues }, 201)
})

module.exports = router;