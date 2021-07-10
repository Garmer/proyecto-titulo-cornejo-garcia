const express = require('express')
const response = require('../../network/response')

const languageController = require('./controller')

const router = express.Router()

router.get('/languages', async (req, res) => {
  let languages = []
  try {
    languages = await languageController.listAll()
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, { languages }, 200)
})

module.exports = router;