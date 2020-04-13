module.exports = function () {
  const rideVehicleType = 'RideVehicleType'
  const booking = 'Booking'
  const orderItems = 'order_Items'
  const outlet = 'Outlets'
  const orderTab = 'OrderTab'
  const users = 'Users'

  require('dotenv').config({ path: './../.env' })
  var config = {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    pool: {
      min: Number(process.env.DB_POOL_MIN),
      max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
  }
  var Knex = require('knex')

  this.getRideVehicleType = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(rideVehicleType)
        .where(data)
        .where('IsActive', 'yes')
        .then((result) => {
          output.count = result.length
          output.result = result
          if (result.length > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchRideVehicleTypeUsingId = (rideId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(rideVehicleType)
        .where({ Id: rideId })
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
            output.result = null
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(null)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.createBooking = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .insert(data)
        .then((result) => {
          output.result = result
          if (result) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.msg = err.sqlMessage
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchBookingInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(data)
        .orderBy('CreateAt', 'desc')
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchBookingUsingState = (data, status, limit) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction((trx) => {
        trx(booking)
          .transacting(trx)
          .where(data)
          .whereIn('Status', status)
          .having('CreateAT', '<', knex.fn.now())
          .limit(limit)
          .then(trx.commit)
          .catch((err) => {
            trx.rollback()
            throw err
          })
      })
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateBookingState = (conditon, data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(conditon)
        .whereNot('Status', 'cancelled')
        .update(data)
        .then((result) => {
          if (result > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateBookingProviderId = (conditon, data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(conditon)
        .update({ AssignedProviderIds: knex.raw(`JSON_MERGE(AssignedProviderIds, '${data.ProviderId}')`) })
        .update(data)
        .then((result) => {
          if (result > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.msg = err.sqlMessage
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updatenWaitingBookingList = (data, status, second) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .update(data)
        .whereIn('Status', status)
        .whereRaw('UpdateAt <= NOW() - INTERVAL ' + second + ' SECOND')
        .then((result) => {
          if (result > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderBookingStatistics = (providerId, duration) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).select(knex.raw('COUNT(ProviderId) as TripCount, SUM(ProviderEarning) as ProviderEarning, CurrencyType'))
        .groupBy('CurrencyType')
        .groupBy('ProviderId')
        .whereRaw(`${duration}(CreateAt) = ?`, [knex.raw(`${duration}(now())`)])
        .where('ProviderId', providerId)
        .where('Status', 'completed')
        .then((result) => {
          if (result.length) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
            output.result = { TripCount: '0', ProviderEarning: '0.00' }
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderBookingEarnings = (providerId, duration) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .select('ProviderEarning', 'CurrencyType', 'Distance', 'PaymentMode', 'RideName', 'CreateAt')
        .whereRaw(`${duration}(CreateAt) = ?`, [knex.raw(`${duration}(now())`)])
        .where('ProviderId', providerId)
        .where('Status', 'completed')
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateRejectProvider = (providerId, bookingId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .update({ ProviderRejectedIds: knex.raw(`JSON_MERGE(ProviderRejectedIds, '${providerId}')`) })
        .where('Id', bookingId)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = false
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchUserBookingPendingFeedback = (userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .select('Id as id', 'ProviderId')
        .where('UserId', userId)
        .where('IsUserReviewed', 'no')
        .where('Status', 'completed')
        .whereNotNull('ProviderId')
        .orderBy('Id', 'DESC')
        .limit(1)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.getServiceTypeUsingIds = (serviceIds) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(rideVehicleType)
        .select('Id as id', 'Name as name')
        .whereIn('Id', serviceIds)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.checkRideSharingEnabled = (serviceIds) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(rideVehicleType)
        .whereIn('Id', serviceIds)
        .where('IsPoolEnabled', 'yes')
        .then((result) => {
          if (result.length > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getDishesOrdered = (orderId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(orderItems)
        .select(knex.raw(`CONCAT(dishName,' X',quantity) as dishName, isVeg, quantity, price as dishTotal`))
        .where('orderId', orderId)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getOutletDetails = (orderId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(outlet)
        .where('id', orderId)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchTabList = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(orderTab)
        .select('Name as displayName', 'Path as path', 'Type as type')
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchOrderList = (data, page) => {
    var output = {}
    var limit = 10
    var offset = page > 1 ? (page - 1) * 10 : 0
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(data)
        .limit(limit)
        .offset(offset)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = false
            output.result = result
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchDeliveryOrders = (data, page) => {
    var output = {}
    var limit = 10
    var offset = page > 1 ? (page - 1) * 10 : 0
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .select(knex.raw(`Booking.Id, CONCAT(Users.FirstName, Users.LastName) as UserName, 
        Booking.OutletName, Booking.FromLocation, Booking.ToLocation, 
        Booking.TotalAmount, Booking.CurrencyType, Booking.CreateAt, Booking.PaymentMode`))
        .join(users, 'Booking.UserId', 'Users.Id')
        .where(data)
        .limit(limit)
        .offset(offset)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = false
            output.result = result
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
}
