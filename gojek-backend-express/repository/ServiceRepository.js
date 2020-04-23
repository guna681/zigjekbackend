module.exports = function () {
  const serviceTitle = 'ServiceTitle'
  const serviceCategory = 'ServiceCategory'
  const serviceSubCategory = 'ServiceSubCategory'
  const serviceCategoryBanner = 'ServiceCategoryBanner'
  const serviceCategoryExtras = 'ServiceCategoryExtras'
  const serviceCategorySlide = 'ServiceCategorySlide'
  const serviceGroup = 'ServiceGroup'
  const service = 'Service'

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

  this.fetchServiceTitle = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceTitle)
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
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchServiceCategory = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategory)
        .select('Id', 'TitleId', 'Name', 'Type', 'HasSubCategory', 'IsFixedPricing', knex.raw('CONCAT(?, Icon) as Icon', [process.env.BASE_URL + process.env.SERVICE_PATH]))
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
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchServiceSubCategory = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceSubCategory)
        .select('Id as id', 'Name as subCategoryName', knex.raw('CONCAT(?, Image) as image', [process.env.BASE_URL + process.env.SERVICE_PATH]))
        .where(data)
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
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchServiceCategoryBanner = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategoryBanner)
        .select('Id as id', 'Text as text', knex.raw('CONCAT(?, Path) as filePath', [process.env.BASE_URL + process.env.BANNER_PATH]))
        .where(data)
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
          console.log(err)
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchServiceCategoryExtras = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategoryExtras)
        .select('Id as id', 'Text as text', knex.raw('CONCAT(?, Icon) as icon', [process.env.BASE_URL + process.env.ICON_PATH]))
        .where(data)
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
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.fetchServiceCategorySlide = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategorySlide)
        .select('Id as id', 'Text as text', knex.raw('CONCAT(?, Image) as image', [process.env.BASE_URL + process.env.SERVICE_SLIDE]))
        .where(data)
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
          console.log(err)
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchServiceGroup = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceGroup)
        .select('Id as id', 'Name as name', knex.raw('CONCAT(?, Image) as image', [process.env.BASE_URL + process.env.GROUP_PATH]))
        .where(data)
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
          console.log(err)
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchServiceListing = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(service)
        .select('Id as id', 'Name as name', knex.raw('CONCAT(?, Image) as image', [process.env.BASE_URL + process.env.SERVICE_PATH]))
        .where(data)
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
          console.log(err)
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
}
