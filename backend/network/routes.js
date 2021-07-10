const express = require('express');
// const message = require('../components/message/network');
const user = require('../components/user/routes');
const psychologist = require('../components/psychologist/routes')
const parent = require('../components/parent/routes')
const upload = require('../components/upload/routes');
const academicHistory = require('../components/academicHistory/routes')
const workHistory = require('../components/workHistory/routes')
const appointmentSchedule = require('../components/appointmentSchedule/routes')
const pathology = require('../components/pathology/routes')
const workModel = require('../components/workModel/routes')
const gender = require('../components/gender/routes')
const language = require('../components/language/routes')
const callPlatform = require('../components/callPlatform/routes')
const appointment = require('../components/appointment/routes')
const elbHealth = require('../components/elbHealth/routes')
const appointmentReview = require('../components/appointmentReview/routes')
const recoverPassword = require('../components/recoverPassword/routes')
const contact = require('../components/contact/routes')

const routes = function (server) {
    // server.use('/message', message);
    server.use('/user', user);
    server.use('/upload', upload)
    server.use(academicHistory)
    server.use(psychologist)
    server.use("/parent", parent)
    server.use(workHistory)
    server.use(appointmentSchedule)
    server.use(pathology)
    server.use(workModel)
    server.use(gender)
    server.use(language)
    server.use(callPlatform)
    server.use(appointment)
    server.use(elbHealth)
    server.use(appointmentReview)
    server.use(recoverPassword)
    server.use(contact)
}

module.exports = routes;