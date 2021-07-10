const express = require('express')
const response = require('../../network/response')
const appointmenScheduleController = require("../appointmentSchedule/controller")
const authUtils = require("../../utils/auth")


const router = express.Router()

router.post('/appointmentSchedule', authUtils.authenticate, async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = await appointmenScheduleController.validateCreateAppointmentScheduleFields(req.body)
  } catch (error) {
    console.log(error)
  }

  if (!validatedFields) return response.error(req, res, 400)

  
})

router.get('/psychologist/:id/appointmentSchedules', authUtils.authenticate, async (req, res) => {
  if (!req.params || !req.params.id){
    return response.error(req, res, 400)
  }

  let appointments = []
  try {
    appointments = await appointmenScheduleController.getPsychologistAppointmentsSchedule(req.params.id)
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, { appointments: appointments}, 200)

})

router.get('/psychologist/:id/appointmentSchedules/public', async (req, res) => {
  if (!req.params || !req.params.id){
    return response.error(req, res, 400)
  }

  let appointments = []
  try {
    appointments = await appointmenScheduleController.getPsychologistAppointmentsSchedule(req.params.id)
  } catch (error) {
    console.log(error)
  }

  return response.success(req, res, { appointments: appointments}, 200)

})

router.put('/psychologist/:id/appointmentSchedules', authUtils.authenticate, async (req, res) => {
  let validatedFields = appointmenScheduleController.validateUpdateScheduleFields(req.body, req.params)

  if(!validatedFields){
    return response.error(req, res, 400)
  }
  
  try {
    await appointmenScheduleController.deletePsychologistSchedules(validatedFields.schedulesToDelete)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  try {
    await appointmenScheduleController.addPsychologistSchedules(validatedFields.schedulesToSave, validatedFields.psychologistId)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  return response.success(req, res, null, 200)

})

module.exports = router;