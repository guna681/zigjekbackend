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
  const serviceTitle = 'ServiceTitle'
  const providerService = 'ProviderService'
  const serviceCategory = 'ServiceCategory'
  // services Page Select
  this.servicesView = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceTitle).select()
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = false
            output.data = result
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
  // Update
  this.servicesTitleEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceTitle)
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
  // services Page Select
  this.servicesTitleView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceTitle).select()
        .where('Id', id)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = false
            output.data = result
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
  // services Page Select
  this.ProviderserviceCategory = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService).select('*', knex.raw('CONCAT(?, ServiceCategory.Icon) as image', [process.env.BASE_URL + process.env.SERVICE_PATH]))
        .leftJoin('ServiceCategory', 'ServiceCategory.Id', `ProviderService.CategoryId`)
        .where(`ProviderService.ProviderId`, data.providerId)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = false
            output.data = result
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

  // services category Select
  this.ProviderserviceSubCategory = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService).select('*', knex.raw('CONCAT(?, ServiceSubCategory.Image) as image', [process.env.BASE_URL + process.env.SERVICE_PATH]))
        .leftJoin('ServiceSubCategory', 'ServiceSubCategory.Id', `ProviderService.SubCategoryId`)
        .where(`ProviderService.ProviderId`, data.providerId)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = false
            output.data = result
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
