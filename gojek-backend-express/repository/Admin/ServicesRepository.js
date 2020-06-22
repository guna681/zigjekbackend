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
  const serviceCategoryBanner = 'ServiceCategoryBanner'
  const serviceCategoryExtras = 'ServiceCategoryExtras'
  const serviceCategoryTitle  = 'ServiceCategoryTitle'
  const serviceCategorySlide  = 'ServiceCategorySlide'
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
  this.serviceCategoryView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var query = knex(serviceCategory)
        .select('Id', 'TitleId', 'Name', 'Type', 'HasSubCategory', 'IsFixedPricing', knex.raw('CONCAT(?, Icon) as Icon', [process.env.BASE_URL + process.env.SERVICE_PATH]))
      if (data.titleId) {
        query.where('TitleId', data.titleId)
      } else {
      // query.where('TitleId', data.titleId)
      }
      query.then((result) => {
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
  // category data Insert
  this.categoryAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategory)
        .insert(data)
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
  // category banner data Insert
  this.categoryBannerAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategoryBanner)
        .insert(data)
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
  // ServiceCategoryExtras data Insert
  this.serviceCategoryExtrasAdd = (data) => {
    console.log(data)
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategoryExtras)
        .insert(data)
        .then((result) => {
          console.log(result)
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
  // ServiceCategoryExtras data Insert
  this.promotionTitleAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategoryTitle)
        .insert(data)
        .then((result) => {
          console.log(result)
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
   // ServiceCategoryExtras data Insert
   this.promotionImageAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategorySlide)
        .insert(data)
        .then((result) => {
          console.log(result)
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
