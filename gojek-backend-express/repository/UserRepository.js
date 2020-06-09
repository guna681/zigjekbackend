module.exports = function () {
  require('dotenv').config({ path: './../.env' })

  const users = 'Users'
  const userDevice = 'UserDevices'
  const userOtp = 'UserOtp'
  const cancelpolicy = 'CancellationPolicy'
  const staticpage = 'StaticPages'

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

  this.addUser = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
            response.result = null
          }
          resolve(response)
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
  this.validateUser = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .select('Mobile', 'ExtCode', 'Language')
        .where('Mobile', data.number)
        .where('ExtCode', data.ext)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
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
  this.addOtp = (data) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
        .catch((err) => {
          err = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.delOtp = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .where(data)
        .delete()
        .then((result) => {
          response.error = false
          resolve(response)
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

  this.fetchOtp = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp).select('OTP')
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
          } else {
            response.error = true
          }
          resolve(response)
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

  this.validateOtp = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
          }
          resolve(response)
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

  this.updateOtpStatus = (data, status) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .update({ Status: status })
        .where(data)
        .then((result) => {
          if (result) {
            response.error = false
            resolve(response)
          } else {
            response.error = true
            resolve(response)
          }
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

  this.updateOTP = (data, knex) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .update({ Status: 'verified' })
        .where(data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          err = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.fetchUserDetails = (mobile, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .select('Id', 'FirstName', 'LastName', 'Image', 'Email', 'Mobile', 'Password', 'Rating', 'StripeCustomerID')
        .where(mobile)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
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

  this.addUserDevice = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
          }
          resolve(response)
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

  this.updateUserDevice = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .update(data)
        .where({ DeviceId: data.DeviceId })
        .then((result) => {
          if (result > 0) {
            response.error = false
          } else {
            response.error = true
          }
          resolve(response)
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

  this.fetchUserDevice = (deviceId, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .select('Id')
        .where('DeviceId', deviceId)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
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

  this.deleteUserDevice = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .where(data)
        .delete()
        .then((result) => {
          response.error = false
          resolve(response)
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

  this.updateUserDetails = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update(data)
        .where({ Mobile: data.Mobile, ExtCode: data.ExtCode })
        .then((result) => {
          if (result) {
            response.error = false
          } else {
            response.error = true
          }
          resolve(response)
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

  this.fetchUserDetailsById = (userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .where({ Id: userId })
        .select()
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

  this.updateUserProfileUsingId = (data, userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update(data)
        .where({ Id: userId })
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

  this.updateUserFCMToken = (data, userDeviceInfo) => {
    console.log(data, userDeviceInfo)
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .update(data)
        .where(userDeviceInfo)
        .then((result) => {
          if (result === 1) {
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

  this.fetchUserCancelPolicyList = (type) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancelpolicy)
        .select()
        .where(type)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
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
  this.fetchUserStaticPageList = () => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
        .select()
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
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
  this.fetchUserStaticPageView = (id) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
        .select()
        .where(id)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
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
  this.fetchUserDeviceInfoUsingId = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
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
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateUserRating = (userId, rating, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update('Rating', rating)
        .where('Id', userId)
        .then((result) => {
          output.error = false
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
  this.usersSocialTokenchecks = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .select('Id', 'FirstName', 'LastName', 'Image', 'Email', 'Mobile', 'Password', 'Rating')
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
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
  this.updateLang = (data, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update(data.update)
        .where(data.where)
        .then((result) => {
          output.error = false
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
}
