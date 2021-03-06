module.exports = function () {
  require('dotenv').config({ path: './../.env' })
  const config = {
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
  const booking = 'Booking'

  // Dashboard List Select
  this.dashboardListView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
     var query = knex(data).count(`Id as count`)
     if (data == 'Booking') {
        query.where(`Status`, 'completed')
     }
        query.then((result) => {
          if (result.length) {
            output.error = false
            output.data = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  // Dashboard Bookings total earnings
  this.dashboardBookingEarningsView = (name) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).select().sum('TotalAmount as Total')
        .whereRaw(`${name}(CreateAt) = ?`, [knex.raw(`${name}(now())`)])
        .where(`Status`, 'completed')
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

   // Dashboard booking count
   this.dashboardBookingCountView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).where(`Status`, data).count(`Id as count`)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  } 

  //  booking count
   this.bookingCountView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).where(`Status`, 'completed').where('Type',data).count(`Id as count`)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  } 

  // types of Bookings total earnings
  this.typesOfBookingEarningsView = (name) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).select().sum('TotalAmount as Total')
        .where('Type',name)
        .where(`Status`, 'completed')
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
}
