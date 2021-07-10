const express = require('express')
const mailUtils = require("../../utils/mail")
const response = require('../../network/response')

const router = express.Router()

router.post('/contact', async (req, res) => {
  try {
    if(!req.body.mail || !req.body.message || !req.body.name){
      return response.error(req, res, 400)
    }
    mailUtils.sendContactMail(req.body.mail, req.body.message, req.body.name)
    return response.success(req, res, "success", 200)
  } catch (error) {
    console.log(error)
  }
})
  
module.exports = router;