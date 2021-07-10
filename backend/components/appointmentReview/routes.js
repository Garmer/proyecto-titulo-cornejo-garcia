const response = require('../../network/response')
const express = require('express')
const appointmentReviewController = require("./controller")

const router = express.Router()

router.post("/appointmentReviews", async (req, res) => {
  let validatedFields = null
  try{
    validatedFields = appointmentReviewController.validateAddAppointmenReviewFields(req.body)
  }
  catch(error){
    console.log(error)
  }

  if(!validatedFields){
    return response.error(req, res, 400)
  }

  appointmentReviewCreated = null
  try {
    appointmentReviewCreated = await appointmentReviewController.addAppointmentReview(validatedFields)
  } catch (error) {
    console.log(error)
  }

  if(!appointmentReviewCreated){
    return response.error(req, res, 500)
  }

  return response.success(req, res, { appointmentReview: appointmentReviewCreated }, 201)
})

module.exports = router