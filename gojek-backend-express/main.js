const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

require('./controller/Admin/AdminAuthController')()
require('./controller/AuthController')()

app.use(cors())
app.use('/', express.static(path.join(__dirname, '/public')))

const bodyParser = require('body-parser')

const { check, validationResult } = require('express-validator/check')
const http = require('http').Server(app)

require('dotenv').config({ path: './../.env' })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', function (request, response, next) {
  request.headers.lang = request.headers.lang || 'default'
  console.log(`IP: ${request.connection.remoteAddress} Method: ${request.method} Route: ${request.originalUrl} Body: ` + JSON.stringify(request.body))
  next()
})

async function auth (request, response, next) {
  var error = {}
  try {
    var auth = await this.getPayloadFromToken(request.headers.access_token)
    if (auth.error) {
      error.error = true
      error.msg = 'Unauthorized access'
      return response.status(401).send(error)
    } else {
      request.params.auth = auth.data
      var authenticate = await this.apiServicesAuthCtrl(request)
      if (authenticate.error) {
        error.error = true
        error.msg = 'Unauthorized access'
        return response.status(401).send(error)
      } else {
        request.params.auth = authenticate.data
        next()
      }
    }
  } catch (err) {
    err.error = true
    err.msg = 'Unauthorized access'
    return response.status(401).send(err)
  }
}

async function adminauth (request, response, next) {
  var error = {}
  try {
    var auth = await this.getAdminAuthToken(request.headers.token)
    if (auth.error) {
      error.error = true
      error.msg = 'Unauthorized'
      return response.send(error)
    } else {
      var result = await this.adminAuthVerifyToken(auth.data)
      if (result.error) {
        error.error = true
        error.msg = 'Unauthorized'
        return response.send(error)
      } else {
        request.params.tokendata = [result.data]
      }
    }
  } catch (err) {
    err.error = true
    err.msg = 'Unauthorized'
    return response.send(err)
  }
  next()
}

app.auth = auth
app.adminauth = adminauth

const validator = {}
validator.check = check
validator.validation = validationResult

require('./routes/UserRoutes')(app, validator)
require('./routes/ProviderRoutes')(app, validator)
require('./routes/TrackingRoutes')(http)
require('./routes/BookingRoutes')(app, validator)
require('./routes/InvoiceRoutes')(app)

require('./routes/AdminRoutes')(app, validator)

app.use(function (req, res, next) {
  res.status(404)
  res.send('404: File Not Found')
})

http.listen(process.env.PORT, function () {
  console.log('Server is running on ' + process.env.PORT + '!')
})
