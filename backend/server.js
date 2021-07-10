const express = require('express');
const httpLib = require('http')
const cors = require('cors')
const dotenv = require('dotenv')
const logger = require('morgan');

const app = express();
const server = httpLib.Server(app)
dotenv.config()

const config = require('./config/config')
// const socket = require('./socket')
const db = require("./db")
const router = require('./network/routes')
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// socket.connect(server)
db.connect()
router(app)

server.listen(config.appPort, function () {
    console.log('application listening in '+ config.host +':' + config.appPort)
})