module.exports = function (http) {
  const io = require('socket.io')(http)
  require('../controller/UserController')()
  require('../controller/ProviderController')()
  require('../services/BookingService')()
  require('../Utils/error')()
  require('../Utils/common')()
  require('dotenv').config({ path: './../.env' })

  // setInterval(() => {
  //   updateProivderLocationSimulation(() => {})
  // }, 1000)

  console.log('Socket IO connected successfully')

  io.use(async function (socket, next) {
    var response = {}
    if (socket.handshake.query && socket.handshake.query.token) {
      var auth = await getPayloadFromToken(socket.handshake.query.token, process.env.JWT_SECRET)
      if (auth.error) {
        response.error = true
        response.msg = 'Unauthorized'
        next(new Error(response))
      } else {
        socket.auth = auth
        next()
      }
    } else {
      response.error = true
      response.msg = 'Unauthorized'
      next(new Error(response))
    }
  })
    .on('connection', function (socket) {
      socket.on('get_nearest_provider_location', function (data) {
        var socketId = socket.id
        var lang = data.lang ? data.lang : 'default'
        if ((data.latitude && data.longitude) || data.lang) {
          getNearestProviderLocation(data.latitude, data.longitude, (result) => {
            ctrlHandler([result], result.error, lang, (message) => {
              io.to(socketId).emit('get_nearest_provider_location', message)
            })
          })
        } else {
          var error = []
          var errMsg = {}
          errMsg.error = true
          if (!data.latitude) {
            errMsg.msg = 'INVALID_LATITUDE'
          } else if (!data.longitude) {
            errMsg.msg = 'INVALID_LONGITUDE'
          }
          error.push(errMsg)
          requestHandler([error], true, lang, (message) => {
            io.to(socketId).emit('get_nearest_provider_location', message)
          })
        }
      })

      socket.on('update_provider_offline', function (data, callback) {
        var lang = data.lang ? data.lang : 'default'
        getUserLocationCellId(data.latitude, data.longitude, async (result) => {
          var response = {}
          var rdata = {}
          var provider = {}
          var providerLocation = []
          var neighborsCellID = await getNeighborsUsingS2Key(data.latitude, data.longitude)
          var neighborsCells = neighborsCellID.key
          neighborsCells.push(result.data)

          provider.providerId = socket.auth.data.Id
          provider.latitude = data.latitude.toString()
          provider.longitude = data.longitude.toString()
          provider.bearing = parseInt(data.bearing)
          providerLocation.push(provider)
          rdata.providerLocation = providerLocation
          response.data = rdata
          response.msg = 'You have provider location update'
          response.error = false
          ctrlHandler([result], result.error, lang, (message) => {
            callback(message)
          })

          neighborsCells.forEach(function (cells) {
            io.to(cells).emit('update_provider_offline', response)
          })
        })
      })

      socket.on('update_provider_location', async function (data, callback) {
        var lang = data.lang ? data.lang : 'default'
        if ((data.latitude && data.longitude)) {
          data.auth = socket.auth.data
          updateProviderLocationCtrl(data, (result) => {
            ctrlHandler([result], result.error, lang, (message) => {
              callback(message)
            })
          })
          if (typeof data.bookingNo === 'undefined' || data.bookingNo === null || data.bookingNo === 0) {
            getUserLocationCellId(data.latitude, data.longitude, async (result) => {
              var response = {}
              var rdata = {}
              var provider = {}
              var providerLocation = []
              var neighborsCellID = await getNeighborsUsingS2Key(data.latitude, data.longitude)
              var neighborsCells = neighborsCellID.key
              neighborsCells.push(result.data)

              provider.providerId = data.auth.Id
              provider.latitude = data.latitude.toString()
              provider.longitude = data.longitude.toString()
              provider.bearing = parseInt(data.bearing)
              provider.rideTypeId = 1
              providerLocation.push(provider)
              rdata.providerLocation = providerLocation
              response.data = rdata
              response.msg = 'You have provider location update'
              response.error = false
              neighborsCells.forEach(function (cells) {
                io.to(cells).emit('get_nearest_provider_location', response)
              })
            })
          } else {
            var response = {}
            var provider = {}
            var bookingId = { Id: data.bookingNo }
            var bookingDetails = await getBookingInfo(bookingId, null)
            var bookingInfo = bookingDetails.data[0]
            var bookingStatus = bookingInfo.Status

            provider.latitude = data.latitude.toString()
            provider.longitude = data.longitude.toString()
            provider.bearing = parseInt(data.bearing)
            provider.rideTypeId = 1
            provider.status = bookingStatus
            response.error = false
            response.data = provider
            io.to(data.bookingNo).emit('live_tracking', response)
          }
        } else {
          var error = []
          var errMsg = {}
          errMsg.error = true
          if (!data.latitude) {
            errMsg.msg = 'INVALID_LATITUDE'
          } else if (!data.longitude) {
            errMsg.msg = 'INVALID_LONGITUDE'
          }
          error.push(errMsg)
          requestHandler([error], true, lang, (message) => {
            callback(message)
          })
        }
      })

      socket.on('get_my_cellId', function (data, callback) {
        var response = {}
        var lang = data.lang ? data.lang : 'default'
        try {
          if ((data.latitude && data.longitude)) {
            getUserLocationCellId(data.latitude, data.longitude, (result) => {
              socket.join(result.data)
            })
            response.error = false
            response.msg = 'VALID'
          } else {
            response.error = true
            response.msg = 'NO_DATA'
          }
          ctrlHandler([response], response.error, lang, (message) => {
            callback(message)
          })
        } catch (err) {
          response.error = true
          response.msg = 'OOPS'
          ctrlHandler([response], response.error, lang, (message) => {
            callback(message)
          })
        }
      })

      socket.on('join_live_tracking', function (data, callback) {
        var response = {}
        var lang = data.lang || 'default'
        try {
          if (data.bookingNo) {
            response.error = false
            response.msg = 'SOCKET_TRACKING_ON'
            socket.join(data.bookingNo)
          } else {
            response.error = true
            response.msg = 'NO_DATA'
          }
        } catch (err) {
          response.error = true
          response.msg = 'OOPS'
        }
        ctrlHandler([response], response.error, lang, (message) => {
          callback(message)
        })
      })
    })
}
