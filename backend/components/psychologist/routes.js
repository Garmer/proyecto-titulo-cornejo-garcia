const express = require('express')
const response = require('../../network/response')
const psychologistController = require("../psychologist/controller")
const authUtils = require("../../utils/auth")

const Permission = require('../permission/model')
const WorkModel = require('../workModel/model') 

const router = express.Router()

router.get('/psychologist/:id', authUtils.authenticate, async (req, res) => {
  let psychologistFound
  try {
    psychologistFound = await psychologistController.getPsychologistById(req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!psychologistFound) return response.error(req, res, 404)

  let psychologistData = psychologistFound.dataValues
  
  delete psychologistData.createdAt
  delete psychologistData.updatedAt
  delete psychologistData.userId
  delete psychologistData.workModelId
  
  return response.success(req, res, { psychologist: psychologistData}, 200)
})

router.patch('/psychologist/:id/verification-in-process', authUtils.authenticate, async (req, res) => {
  const { verificationInProcess } = req.body

  if ( verificationInProcess == null ){
    return response.error(req, res, 400)
  }
  let psychologistFound = null
  try {
    psychologistFound = await psychologistController.getPsychologistById(req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!psychologistFound){
    return response.error(req, res, 404)
  }

  psychologistFound.verificationInProcess = verificationInProcess

  try {
    await psychologistFound.save()
    return response.success(req, res, null, 200)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }
})


router.patch('/psychologist/:id/verify', authUtils.authenticate, async (req, res) => {
  const { verificationInProcess, isVerified } = req.body

  if ( verificationInProcess == null || isVerified == null ){
    return response.error(req, res, 400)
  }
  let psychologistFound = null
  try {
    psychologistFound = await psychologistController.getPsychologistById(req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!psychologistFound){
    return response.error(req, res, 404)
  }

  psychologistFound.verificationInProcess = verificationInProcess
  psychologistFound.isVerified = isVerified
  try {
    await psychologistFound.save()
    return response.success(req, res, null, 200)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }
})
router.patch('/psychologist/:id/work-model',authUtils.authenticate, async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = psychologistController.validateWorkModelFields(req.body, req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!validatedFields){
    return response.error(req, res, 400)
  }

  let psychologistFound = null
  try {
    psychologistFound = await psychologistController.getPsychologistById(validatedFields.psychologistId)
  } catch (error) {
    console.log(error)
  }

  if (!psychologistFound){
    return response.error(req, res, 400)
  }

  psychologistFound.workModelId = validatedFields.workModelId

  try {
    await psychologistFound.save()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  }

  return response.success(req, res, null, 200)

})

router.put('/psychologist/:id/pathologies',authUtils.authenticate, async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = psychologistController.validatePathologiesFields(req.body, req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!validatedFields){
    return response.error(req, res, 400)
  }

  let psychologistFound = null
  try {
    psychologistFound = await psychologistController.getPsychologistById(validatedFields.psychologistId)
  } catch (error) {
    console.log(error)
  }

  if (!psychologistFound){
    return response.error(req, res, 400)
  }

  try {
    await psychologistController.deletePsychologistPathologies(validatedFields.psychologistId)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }

  try {
    await psychologistController.addPsychologistPathologies(validatedFields.psychologistPathologies)
  } catch (error) {
    console.log(error)
    return response.error(req, res, 500)
  }
  
  return response.success(req, res, null, 200) 
})

// router.put('/psychologist/:id/call-platforms',authUtils.authenticate, async (req, res) => {
//   let validatedFields = null
//   try {
//     validatedFields = psychologistController.validateCallPlatformsFields(req.body, req.params.id)
//   } catch (error) {
//     console.log(error)
//   }

//   if (!validatedFields){
//     return response.error(req, res, 400)
//   }

//   let psychologistFound = null
//   try {
//     psychologistFound = await psychologistController.getPsychologistById(validatedFields.psychologistId)
//   } catch (error) {
//     console.log(error)
//   }

//   if (!psychologistFound){
//     return response.error(req, res, 400)
//   }

//   try {
//     await psychologistController.deletePsychologistPathologies(validatedFields.psychologistId)
//   } catch (error) {
//     console.log(error)
//     return response.error(req, res, 500)
//   }

//   try {
//     await psychologistController.addPsychologistPathologies(validatedFields.psychologistPathologies)
//   } catch (error) {
//     console.log(error)
//     return response.error(req, res, 500)
//   }
  
//   return response.success(req, res, null, 200) 
// })

router.get('/psychologists/search', async (req, res) => {
  let psychologists = []
  try {
    psychologists = await psychologistController.searchPsychologists(req.query)
  } catch (error) {
    console.log(error)
  }
  
  return response.success(req, res, { psychologists }, 200)
})

router.get('/psychologists', async (req, res) => {
  let psychologists = []
  try {
    psychologists = await psychologistController.listAll()
  } catch (error) {
    console.log(error)
  }
  
  return response.success(req, res, { psychologists }, 200)
})

router.get('/psychologist/:id/public', async (req, res) => {
  let psychologistFound
  try {
    psychologistFound = await psychologistController.getPsychologistById(req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!psychologistFound) return response.error(req, res, 404)

  let psychologistData = psychologistFound.dataValues
  
  delete psychologistData.createdAt
  delete psychologistData.updatedAt
  delete psychologistData.userId
  delete psychologistData.workModelId
  
  return response.success(req, res, { psychologist: psychologistData}, 200)
})

router.get('/not-verified-psychologists', async (req, res) => {
  let psychologists = []
  try {
    psychologists = await psychologistController.getNotVerifiedPsychologists()
  } catch (error) {
    console.log(error)
  }
  
  return response.success(req, res, { psychologists }, 200)
})

router.get('/psychologist/:id/appointments',authUtils.authenticate, async (req, res) => {
  let appointments =[]
  try {
    appointments = await  psychologistController.getAppointments(req.params.id)
  } catch (error) {
    console.log(error)
  }
  return response.success(req, res, { appointments }, 200)
})

router.patch('/psychologist/:id/personal-data', authUtils.authenticate, async (req, res) => {
  let validatedFields = null
  try {
    validatedFields = psychologistController.validatePsychologistFields(req.body, req.params.id)
  } catch (error) {
    console.log(error)
  }

  if (!validatedFields) {
    return response.error(req, res, 400)
  }

  let psychologistFound = null
  try {
    psychologistFound = await psychologistController.getPsychologistById(validatedFields.psychologistId)
  } catch (error) {
    console.log(error)
  }

  if(!psychologistFound){
    return response.error(req, res, 404)
  }

  try {
    psychologistFound.urlProfilePicture = validatedFields.urlProfilePicture
    psychologistFound.description = validatedFields.description
    await psychologistFound.save()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 400)
  } 

  return response.success(req, res, null, 200)
})

module.exports = router;