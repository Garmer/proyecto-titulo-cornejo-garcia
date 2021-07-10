const express = require('express')
const response = require('../../network/response')

const router = express.Router()

router.get('/', async (req, res) => {
  return response.success(req, res, "api base endpoint", 200)
})
  
module.exports = router;