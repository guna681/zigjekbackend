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
  const peekcharges = 'PeekCharges'

  // get peek charges redeem date
  this.getPeekChargesDate = (date, time) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select * from ${peekcharges} where Day is not null and  "${date}" <= DATE_FORMAT(Day, "%Y-%m-%d") and StartTime <= "${time}" and "${time}" <= EndTime`)
        .then((result) => {
          if (result[0].length) {
            output.error = false
            output.data = result[0]
          } else {
            output.error = true
            output.data = result[0]
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
  // get peek charges redeem Week
  this.getPeekChargesWeek = (date, time) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select * from ${peekcharges} where Day is null and JSON_SEARCH(Week,'one',dayname("${date}")) and StartTime <= "${time}" and "${time}" <= EndTime`)
        .then((result) => {
          if (result[0].length) {
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
