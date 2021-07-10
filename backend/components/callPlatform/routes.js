const express = require('express')
const response = require('../../network/response')
const callPlatformController = require("./controller")

const router = express.Router()

router.get('/call-platforms', async (req, res) => {
  let callPlatforms = []
  
  try {
    callPlatforms = await callPlatformController.listAll()
  } catch (error) {
    console.log(error)
  }
 
  return response.success(req, res, { callPlatforms }, 200)
})

module.exports = router;