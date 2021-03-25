const express = require('express')
const http = require('http')

require('dotenv').config()
require('./core/db')()

const createRoutes = require('./routes')

const app = express()
const server = http.createServer(app)

const io = require('./core/sockets')(server)
createRoutes(app)

const PORT = process.env.PORT || process.env.APP_PORT || 8989
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
