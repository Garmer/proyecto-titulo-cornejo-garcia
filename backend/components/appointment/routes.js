const response = require('../../network/response')
const express = require('express')
const appointmentController = require("./controller")
const appointmentScheduleController = require("../appointmentSchedule/controller")

const router = express.Router()

router.post("/appointments", async (req, res) => {
  let validatedFields = null
  try{
    validatedFields = await appointmentController.validateAddAppointmentFields(req.body)
  }
  catch(error){
    console.log(error)
  }

  if(!validatedFields){
    return response.error(req, res, 400)
  }

  appointmentCreated = null
  try {
    appointmentCreated = await appointmentController.addAppointment(validatedFields)
  } catch (error) {
    console.log(error)
  }

  if(!appointmentCreated){
    return response.error(req, res, 400)
  }

  let appointmentScheduleUpdated = null
  try {
    appointmentScheduleUpdated = await appointmentScheduleController.updateIsReserved(validatedFields.appointmentScheduleId, true)
  } catch (error) {
    console.log(error)
  }

  if (!appointmentScheduleUpdated){
    return response.error(req, res, 409)
  }

  return response.success(req, res, {appointmentCreated}, 200)
})

router.patch("/appointment/:id/url-call", async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = appointmentController.validateUrlCallFields(req.body, req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!validatedFields){
    return response.error(req, res, 400)
  }

  let appointmentFound = null
  try {
    appointmentFound = await appointmentController.getAppointmentById(validatedFields.appointmentId)
  } catch (error) {
    console.log(error)
  }
  
  if(!appointmentFound){
    return response.error(req, res, 404)
  }

  try {
    appointmentFound.urlCall = validatedFields.urlCall
    await appointmentFound.save()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }

  return response.success(req, res, { appointment: appointmentFound }, 200)

})

router.patch("/appointment/:id/status", async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = appointmentController.validateUpdateAppointmentStatusFields(req.body, req.params.id)
  } catch (error) {
    console.log(error)
  }

  console.log(validatedFields)

  if(!validatedFields){
    return response.error(req, res, 400)
  }

  let appointmentFound = null
  try {
    appointmentFound = await appointmentController.getAppointmentById(validatedFields.appointmentId)
    appointmentFound.statusAppointment = validatedFields.appointmentStatus
    await appointmentFound.save()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  if(!appointmentFound){
    return response.error(req, res, 404)
  }

  let appointmentScheduleModified = null
  try {
    appointmentScheduleModified = await appointmentScheduleController.updateIsReserved(appointmentFound.appointmentScheduleId, validatedFields.isAppointmentScheduleReserved)
  } catch (error) {
    console.log(error)
  }

  if(!appointmentScheduleModified){
    return response.error(req, res, 500)
  }

  return response.success(req, res, null, 200)
})

module.exports = router