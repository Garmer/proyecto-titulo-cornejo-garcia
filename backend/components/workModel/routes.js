const express = require('express')
const response = require('../../network/response')
const authUtils = require("../../utils/auth")
const workModelController = require("./controller")

const router = express.Router()

router.get('/work-models', async (req, res) => {
  let workModels = []
  try {
    workModels = await workModelController.listWorkModels()
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, { workModels }, 200)
  
})

module.exports = router;