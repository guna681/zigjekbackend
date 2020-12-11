module.exports = function () {
  const rideVehicleType = 'RideVehicleType'
  const booking = 'Booking'
  const orderItems = 'order_Items'
  const outlet = 'Outlets'
  const orderTab = 'OrderTab'
  const users = 'Users'
  const serviceCategory = 'ServiceCategory'
  const serviceSubCategory = 'ServiceSubCategory'
  const serviceAddoOnsTitle = 'ServiceAddOnsTitle'
  const serviceAddoOns = 'ServiceAddOns'
  const service = 'Service'
  const serviceAddOns = 'ServiceAddOns'
  const admin = 'Admin'

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

  this.getBookingInfo = (data) => {
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
          // .where('Status', 'assigned')
          .whereIn('Status', status)
          .whereIn('Type', ['taxi', 'delivery', 'services'])
          // .having('CreateAt', '<', knex.fn.now())
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

  this.fetchBookingUsingState1 = (data, status, limit) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction((trx) => {
        trx(booking)
          .transacting(trx)
          // .where(data)
          .where('isCurrentBooking', '1')
          .whereIn('Status', status)
          .whereIn('Type', ['taxi', 'delivery', 'services'])
          // .having('CreateAt', '<', knex.fn.now())
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

  this.fetchBookingUsingStateType = (data, status, limit, type) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction((trx) => {
        trx(booking)
          .transacting(trx)
          .where(data)
          .whereIn('Status', status)
          .whereIn('Type', type)
          // .having('CreateAt', '<', knex.fn.now())
          .limit(limit)
          .orderByRaw('FIELD(Status,"unassigned","waiting") DESC')
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

  this.fetchBookingUsingType = (data, limit, type) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction((trx) => {
        trx(booking)
          .transacting(trx)
          .whereRaw(`JSON_CONTAINS(AssignedProviderIds, '["?"]')`, [data.ProviderId])
          .where('Status', 'assigned')
          .whereNull('ProviderId')
          .whereIn('Type', [type])
          .having('CreateAt', '<', knex.fn.now())
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

  this.fetchBookingCount = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        // .whereRaw(`JSON_CONTAINS(AssignedProviderIds, '["?"]')`, [data.auth.Id])
        .where('ProviderId', data.auth.Id)
        .where('Status', 'assigned')
        .count('Id as count')
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

  this.updateOutletEarning = (conditon, data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(outlet)
        .where(conditon)
        .update({ totalAmount: knex.raw('?? + ?', ['totalAmount', data.outletEarning]), balanceAmount: knex.raw('?? + ?', ['balanceAmount', data.outletEarning]) })
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

  this.updateAdminEarning = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(admin)
        .where('Roles', '1')
        .update({ totalAmount: knex.raw('?? + ?', ['totalAmount', data.adminEarning]), balanceAmount: knex.raw('?? + ?', ['balanceAmount', data.adminEarning]) })
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

  this.updateBookingEarning = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where('Id', data.id)
        .update({ outletEarnings: data.outletEarning, adminServiceCharge: data.adminEarning })
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

  this.selectOutlet = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(outlet)
        .where('id', data)
        .then((result) => {
          if (result) {
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
        .update({ AssignedProviderIds: knex.raw('JSON_MERGE(AssignedProviderIds, ?)', [data.ProviderId.toString()]) })
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

  this.updatenWaitingBookingList = (data, status, second, type) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .update(data)
        .whereIn('Status', status)
        .whereIn('Type', type)
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
        .update({ ProviderRejectedIds: knex.raw('JSON_MERGE(ProviderRejectedIds, "?")', [providerId.toSting()]), orderStatus: 'rejected' })
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

  this.updateCodType = (codType, bookingId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .update('PaymentMode', codType)
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

  this.getMultiDishesOrdered = (orderId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(orderItems)
        .select('orderId', knex.raw(`CONCAT(dishName,' X',quantity) as dishName, isVeg, quantity, price as dishTotal`))
        .whereIn('orderId', orderId)
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

  this.getServiceDetails = (categoryId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategory)
        .where('Id', categoryId)
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
        .orderBy('CreateAt', 'desc')
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
        .select(knex.raw(`Booking.Id, CONCAT(Users.FirstName,' ',Users.LastName) as UserName, 
        Booking.OutletName, Booking.FromLocation, Booking.ToLocation, 
        Booking.TotalAmount, Booking.CurrencyType, Booking.CreateAt, Booking.PaymentMode, Booking.Type, Booking.Status`))
        .join(users, 'Booking.UserId', 'Users.Id')
        .where(data)
        .limit(limit)
        .orderBy('CreateAt', 'desc')
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

  this.addServiceRequest = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
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

  this.fetchServiceList = (data, page) => {
    var output = {}
    var limit = 10
    var offset = page > 1 ? (page - 1) * 10 : 0
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .select(knex.raw(`Booking.Id, CONCAT(Users.FirstName,' ',Users.LastName) as UserName, Booking.ToLocation, 
        Booking.TotalAmount, Booking.CurrencyType, Booking.CreateAt, Booking.PaymentMode, ServiceCategory.Name as CategoryName, Booking.TotalAmount, Booking.Status, Booking.DestinyLat, Booking.DestinyLong, Booking.ServiceTimeSlot, Booking.BookingTimestamp, Booking.Type`))
        .leftJoin(users, 'Booking.UserId', 'Users.Id')
        .leftJoin(serviceCategory, 'Booking.ServiceCategoryId', 'ServiceCategory.Id')
        .where(data)
        .where('Booking.Type', 'services')
        .orderBy('CreateAt', 'desc')
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

  this.updateServiceImage = (conditon, data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(conditon)
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

  this.fetchBookingCategory = (categoryId, subCategoryId, groupId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceSubCategory)
        .select('')
        .leftJoin('')
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

  this.fetchAddonsTitle = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceAddoOnsTitle)
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

  this.fetchAddons = (titleIds) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceAddoOns)
        .select('id', 'name', 'price', 'currencyType', 'titleId')
        .whereIn('TitleId', titleIds)
        .where('Status', 1)
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

  this.fetchServiceInfo = (serviceIds) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(service)
        .select('id', 'name', 'price', 'currencyType', 'commission')
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
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchAddonsInfo = (addonsId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceAddOns)
        .select('id', 'name', 'price', 'currencyType')
        .whereIn('Id', addonsId)
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

  this.updateBookingInfo = (data, conditon) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(conditon)
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

  this.getCurrentBooking = (data, page) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .select()
        .where('ProviderId', data.auth.Id)
        .where('Booking.Type', 'services')
        .whereNotIn('Status', ['cancelled', 'completed', 'reject'])
        .orderBy('CreateAt', 'asc')
        .limit(1)
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
