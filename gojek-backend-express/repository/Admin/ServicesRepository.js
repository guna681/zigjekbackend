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
  const serviceCategoryTitle = 'ServiceCategoryTitle'
  const serviceCategorySlide = 'ServiceCategorySlide'
  const serviceSubCategory = 'ServiceSubCategory'
  const service = 'Service'
  const serviceImage = 'ServiceImage'
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
    var offset = (data.page - 1) * data.limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var query = knex(serviceCategory)
        .select('Id', 'TitleId', 'Name', 'Type', 'HasSubCategory', 'IsFixedPricing', knex.raw('CONCAT(?, Icon) as Icon', [process.env.BASE_URL + process.env.SERVICE_PATH]))
      if (data.titleId) {
        query.where('TitleId', data.titleId)
        query.limit(data.limit).offset(offset)
      } else {
      // query.where('TitleId', data.titleId)
        query.limit(data.limit).offset(offset)
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

  // serviceCategory View count
  this.categoryCount = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategory).count(`Id as count`)
        .where('TitleId', data.titleId)
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

  // category data Insert
  this.categoryAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(data.table)
        .insert(data.data)
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
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategoryExtras)
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
  this.promotionTitleAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategoryTitle)
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
  this.promotionImageAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategorySlide)
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

  // category data Update
  this.categoryEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(data.table)
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

  // subcategory View count
  this.subCategoryCount = (data, table) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(table).count(`Id as count`)
        .limit(data.limit).offset(data.dataoffset)
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
  // category View Page Select
  this.categoryView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(data.table).select()
        .where(data.where)
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
  //  Category Banner View Page Select
  this.CategoryBannerView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(data.table).select('Id', 'CategoryId', 'SubCategoryId', 'Text', 'Type', 'Path as bannerImage', 'Status')
        .where(data.where)
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

  // Delete
  this.categoryDelete = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(data.table)
        .where(data.where)
        .del()
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

  this.subCategoryView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceSubCategory).select('ServiceSubCategory.Id', 'ServiceSubCategory.Name as SubCategoryName', 'ServiceSubCategory.Image', 'ServiceSubCategory.Status', 'ServiceSubCategory.ServicesDisplayStyle', 'ServiceCategory.Name as CategoryName')
        .leftJoin('ServiceCategory', 'ServiceCategory.Id', `ServiceSubCategory.CategoryId`)
        .limit(limit).offset(offset)
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

  // CategoryList view with subCategory
  this.CategoryListView = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategory)
        .where('HasSubCategory', '1')
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

  // NEW SERVICES data Insert
  this.addServices = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(service)
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

  this.servicesListView = (data, table) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(table).select()
        .limit(limit).offset(offset)
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

  // category banner data Insert
  this.servicesImageAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceImage)
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
}
