const express = require('express')
const response = require('../../network/response')
const authUtils = require("../../utils/auth")
const pathologiesController = require("./controller")

const router = express.Router()

router.get('/pathologies', async (req, res) => {
  let pathologies = []
  try {
    pathologies = await pathologiesController.listUsers()
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, { pathologies }, 200)
  
})

module.exports = router;