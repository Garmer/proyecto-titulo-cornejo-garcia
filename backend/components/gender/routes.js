const express = require('express')
const response = require('../../network/response')

const genderController = require('./controller')

const router = express.Router()

router.get('/genders', async (req, res) => {
  let genders = []
  try {
    genders = await genderController.listAll()
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, { genders }, 200)
})

module.exports = router;