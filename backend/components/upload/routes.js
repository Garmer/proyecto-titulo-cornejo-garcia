const { response } = require('express')
const express = require('express')
const uploadController = require("./controller")

const router = express.Router()

router.post("/single", uploadController.uploadSingleFile)

module.exports = router