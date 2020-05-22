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
  const provider = 'Provider'
  const providerDoc = 'ProviderDocuments'
  const providerVeh = 'ProviderVehicle'
  const ridevehicletype = 'RideVehicleType'
  const providervehicledoc = 'ProviderDocuments'
  const doctype = 'DocumentType'
  // Users List Count Select
  this.providersListCount = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
    var query = knex(provider).count(`Id as count`)
      // .where(`Type`, 'taxi')
      // .where(`IsDeliveryOpt`, IsDeliveryOpt)
      if (data.type == 'taxi') {
        if (data.IsDeliveryOpt == 0) {
          query.where('Type', data.type)
          query.where('IsDeliveryOpt', data.IsDeliveryOpt)
        } else {
          query.where('Type', data.type)
        }
      } else {
        query.where('Type', data.type)
        // query.where('IsDeliveryOpt', data.IsDeliveryOpt)
      }
      query.then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // Provider List Select
  this.providersPageListView = (data) => {
    var output = {}
    var limit = 10
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var query = knex(provider).select()
        .limit(limit).offset(offset)
      if (data.type == 'taxi') {
        if (data.IsDeliveryOpt == 0) {
          query.where('Type', data.type)
          query.where('IsDeliveryOpt', data.IsDeliveryOpt)
        } else {
          query.where('Type', data.type)
        }
      } else {
        query.where('Type', data.type)
        // query.where('IsDeliveryOpt', data.IsDeliveryOpt)
      }
      query.then((result) => {
        if (result.length) {
          output.error = false
          output.data = result
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

  // Provider List View
  this.providersListView = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .select()
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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

  // Provider push notification view List Select
  this.providersPushNotificationListView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider).select().limit(limit).offset(offset)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // provider Select
  this.getProviderView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider).select('*')
        .where('Id', id)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // provider Document Select
  this.getProviderDocView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerDoc).select('*')
        .leftJoin('DocumentType', 'DocumentType.Id', `ProviderDocuments.DocTypeId`)
        .where(`ProviderDocuments.id`, id)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // Provider Doctype Pages Update
  this.providerDocDataEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerDoc)
        .where(data.where)
        .update(data.data)
        .then((result) => {
          if (result) {
            output.error = false
            output.data = result
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
  // Provider Pages Update
  this.providerDataEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where(data.where)
        .update(data.data)
        .then((result) => {
          if (result) {
            output.error = false
            output.data = result
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
  // Providers push notification search data List Select
  this.providersPushNotificationSearchDataListView = (data) => {
    var output = {}
    var name = data.name
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider).select(knex.raw(`${provider}.*,CONCAT(FirstName,LastName) as fullname`))
        .having('fullname', 'like', `%${name}%`)
        .orHaving('Mobile', 'like', `%${name}%`)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // Providers push notification Send Select Data
  this.providersPushNotificationSendList = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider).select('GCMId')
        .whereIn('Id', data)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // Providers vehicle lists
  this.getProviderVehicleListView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVeh).select('*')
        .where('ProviderId', data)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // Providers ride vehicle type lists
  this.getProviderRideVehicleTypeListView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype).select('Id', 'Name')
        .whereIn('Id', data)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // get Providers vehicle documents lists
  this.getProviderVehicleDocumentsDetailsListView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providervehicledoc).select(knex.raw(`${providervehicledoc}.Id, ${providervehicledoc}.File, ${providervehicledoc}.Status, ${doctype}.Name`))
        .join(`${doctype}`, `${providervehicledoc}.DocTypeId`, `${doctype}.Id`)
        .where(`${providervehicledoc}.ProviderId`, data)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
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
  // Provider Vehicle data Update
  this.providerVehicleEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVeh)
        .where(data.where)
        .update(data.data)
        .then((result) => {
          if (result) {
            output.error = false
            output.data = result
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
  // Provider Vehicle Documents data Update
  this.providerVehicleDocumentsEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providervehicledoc)
        .where(data.where)
        .update(data.data)
        .then((result) => {
          if (result) {
            output.error = false
            output.data = result
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
  // provider List Count Select
  this.providersPushNotificationListCount = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var query = knex(provider).count(`Id as count`)
      query.then((result) => {
        if (result.length) {
          output.error = false
          output.data = result
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
