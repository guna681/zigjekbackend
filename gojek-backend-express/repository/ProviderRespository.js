module.exports = function () {
  const provider = 'Provider'
  const providerOtp = 'ProviderOtp'
  const provideLocationUpdate = 'ProviderLocationUpdate'
  const cancelpolicy = 'CancellationPolicy'
  const staticpage = 'StaticPages'
  const documentType = 'DocumentType'
  const providerDocuments = 'ProviderDocuments'
  const booking = 'Booking'
  const providerPayment = 'ProviderPayment'
  const providerAddress = 'ProviderAddress'
  const timeSlot = 'TimeSlot'
  const providerAvailability = 'ProviderAvailability'
  const serviceCategory = 'ServiceCategory'
  const serviceSubCategory = 'ServiceSubCategory'
  const providerService = 'ProviderService'

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

  this.fetchProviderDetailsById = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where({ Id: providerId })
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

      this.fetchProviderDetails = (req) => {

    var output = {}
    if (req.CategoryId) {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
        knex(provider).select('*')
        .leftJoin(providerService, 'ProviderService.ProviderId', 'Provider.Id')
        .where({ 'Provider.Id': req.providerId })
        .then((result) => {
          console.log(result)
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
    } else {
          return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where({ Id: req.providerId })
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

  }

  this.fetchProvider = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
            output.result = result
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

  this.addProviderOtp = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerOtp)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
            resolve(output)
          } else {
            output.error = true
            resolve(output)
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

  this.delProviderOtp = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerOtp)
        .where(data)
        .delete()
        .then((result) => {
          if (result > 0) {
            output.error = false
            resolve(output)
          } else {
            output.error = true
            resolve(output)
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

  this.updateProviderOtpState = (data, status) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerOtp)
        .update({ Status: status })
        .where(data)
        .then((result) => {
          if (result) {
            output.error = false
            resolve(output)
          } else {
            output.error = true
            resolve(output)
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

  this.getProviderOtpState = (data, condition) => {
    return new Promise(function (resolve) {
      var output = {}
      var knex = new Knex(config)
      knex(providerOtp)
        .where(data)
        .where(condition)
        .then((result) => {
          output.count = result.length
          output.result = result
          if (result.length === 1) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.count = 0
          err.error = true
          err.result = null
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.addProvider = (data) => {
    return new Promise(function (resolve) {
      var output = {}
      var knex = new Knex(config)
      knex(provider)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
            output.message = 'success'
            output.result = result[0]
          } else {
            output.error = true
            output.message = 'fail'
            output.result = null
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.message = err.sqlMessage
          err.result = null
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderDetails = (data) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var output = {}
      knex(provider)
        .update(data)
        .where({ Mobile: data.Mobile, ExtCode: data.ExtCode })
        .then((result) => {
          if (result) {
            output.error = false
            output.result = result
            resolve(output)
          } else {
            output.error = true
            resolve(output)
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

  this.updateProviderLocationById = (data, providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction((t) => {
        return knex(provider)
          .transacting(t)
          .update(data)
          .where({ Id: providerId, IsActive: 'yes' })
          .then(() => {
            return knex(provideLocationUpdate)
              .where({ ProviderId: providerId })
              .update(data)
          })
          .then(t.commit)
          .catch((e) => {
            t.rollback()
            throw e
          })
      })
        .then((result) => {
          output.error = false
          output.result = result
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

  this.addProviderActiveLocation = (providerId, rideSharing, rideTypeIds, status, delivery) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction(function (t) {
        return knex(provideLocationUpdate)
          .transacting(t)
          .where({ ProviderId: providerId })
          .then(function (result) {
            if (result.length === 0) {
              output.error = false
              return knex(provideLocationUpdate)
                .insert({ ProviderId: providerId, IsPoolEnabled: rideSharing, RideTypeId: JSON.stringify(rideTypeIds), Status: status, IsDeliveryOpt: delivery })
            } else {
              output.error = false
              return knex(provideLocationUpdate)
                .where({ ProviderId: providerId })
                .update({ IsPoolEnabled: rideSharing, RideTypeId: JSON.stringify(rideTypeIds), Status: status, IsDeliveryOpt: delivery })
            }
          })
          .then(t.commit)
          .catch(function (e) {
            t.rollback()
            throw e
          })
      })
        .then(() => {
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

  this.fetchProviderDocList = (docType) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(documentType)
        .where('ApplicableTo', docType)
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
          err.error = false
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProivderFCMToken = (data, userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where({ Id: userId })
        .update(data)
        .then((result) => {
          if (result === 1) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          err.result = null
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderCancelPolicyList = (type) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancelpolicy)
        .select()
        .where(type)
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
  this.fetchProviderStaticPageList = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
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

  this.fetchProviderByCellId = (data, cellID, blockList, rideTypeIds) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .where(data)
        .whereNotIn('ProviderId', blockList)
        .whereIn('S2CellId', cellID)
        .whereRaw(`JSON_CONTAINS(RideTypeId, '["?"]')`, [rideTypeIds])
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchDeliveryProviderByCellId = (data, cellID, blockList) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .where(data)
        .whereNotIn('ProviderId', blockList)
        .whereIn('S2CellId', cellID)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderLocationStatus = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .update(data)
        .where('ProviderId', data.ProviderId)
        .then((result) => {
          if (result > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderDetailsUsingId = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where({ Id: data.Id })
        .update(data)
        .then((result) => {
          if (result) {
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
  this.fetchProviderStaticPageView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
        .select()
        .where(id)
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

  this.deleteProviderLocationUpdate = (Id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .where({ ProviderId: Id })
        .update({
          S2CellId: null,
          Latitude: null,
          Longitude: null,
          Bearing: null,
          RideTypeId: null,
          IsPoolActive: 'no',
          IsPoolEnabled: 'no',
          MaxPoolCapacity: '0',
          Status: 'offline'
        })
        // .delete()
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
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderRating = (providerId, rating) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .update('Rating', rating)
        .where('Id', providerId)
        .then((result) => {
          output.error = false
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

  this.updateVehicleDetails = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .update(data)
        .where('Id', data.Id)
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
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderDocument = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)

      knex.transaction((t) => {
        return knex(providerDocuments)
          .transacting(t)
          .where({ ProviderId: data.ProviderId, DocTypeId: data.DocTypeId })
          .then((doc) => {
            if (doc.length > 0) {
              return knex(providerDocuments)
                .update(data)
                .where({ ProviderId: data.ProviderId, DocTypeId: data.DocTypeId })
            } else {
              return knex(providerDocuments)
                .insert(data)
            }
          })
          .then((result) => {
            output.error = false
            resolve(output)
          })
          .catch((e) => {
            t.rollback()
            throw e
          })
      })
        .then((result) => {
          output.error = false
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
    })
  }

  this.fetchProviderDocumentExist = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerDocuments)
        .select('DocTypeId', 'Status')
        .where({ ProviderId: providerId })
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.providerUpdateLang = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .update(data.update)
        .where(data.where)
        .then((result) => {
          if (result) {
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
  // get provider total earnings of a month
  this.getProviderBookingStacksData = (providerId, year) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`SELECT MONTH(CreateAt ) as month , YEAR(CreateAt ) AS year, COUNT(Id) AS count , SUM(ProviderEarning ) AS total FROM ${booking} WHERE ProviderId = ${providerId} AND status = 'completed' AND YEAR(CreateAt) = ${year} GROUP BY MONTH(CreateAt) , YEAR(CreateAt)`)
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

  this.updateTripCount = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where('Id', providerId)
        .update({ TripCount: knex.raw('?? + ?', ['TripCount', 1]) })
        .then((result) => {
          if (result) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateBulkdProviderLocationState = (providerIds, status) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .whereIn('ProviderId', providerIds)
        .update('Status', status)
        .then((result) => {
          if (result) {
            output.error = false
          } else {
            output.error = true
          }
        }).catch((err) => {
          err.error = true
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.insertFinancialInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerPayment)
        .insert(data)
        .then((result) => {
          if (result) {
            output.error = false
          } else {
            output.error = true
          }
        }).catch((output) => {
          output.error = true
        }).finally(() => {
          knex.destroy()
          resolve(output)
        })
    })
  }

  this.deleteFinancialInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerPayment)
        .where(data)
        .del()
        .then(() => {
          output.error = false
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.insertAddressInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAddress)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderAddressInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAddress)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.deleteAddressInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAddress)
        .where(data)
        .del()
        .then(() => {
          output.error = false
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getTimeSlots = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(timeSlot)
        .select('Id', 'Day', 'Time')
        .then((result) => {
          if (result) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getProviderTimeSlots = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAvailability)
        .select('Id', 'Day', 'Time')
        .where('ProviderId', providerId)
        .then((result) => {
          if (result) {
            output.error = false
            output.result = result
          } else {
            output.error = true
            output.result = []
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getProviderTimeSlots = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAvailability)
        .select('Id', 'Day', 'Time')
        .where('ProviderId', providerId)
        .then((result) => {
          if (result) {
            output.error = false
            output.result = result
          } else {
            output.error = true
            output.result = []
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderTimeSlot = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAvailability)
        .insert(data)
        .then((result) => {
          if (result) {
            output.error = false
            output.result = result
          } else {
            output.error = true
            output.result = []
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.deleteProviderTimeSlot = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAvailability)
        .where('ProviderId', providerId)
        .del()
        .then(() => {
          output.error = false
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchCategory = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceCategory)
        .select('Id as id', 'Name as name', 'HasSubCategory as hasSubCategory', 'IsFixedPricing as isFixedPricing', 'PricePerHour as pricePerHour')
        .where('Type', 'SERVICE')
        .where('Status', 1)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchSubCategory = (categoryId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(serviceSubCategory)
        .select('Id as id', 'Name as name')
        .where('CategoryId', categoryId)
        .where('Status', 1)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.createProviderServiceCategory = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateServiceCategory = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService)
        .where('Id', data.Id)
        .where('ProviderId', data.ProviderId)
        .update(data)
        .then((result) => {
          if (result > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getMyServiceList = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService)
        .select('ProviderService.Id as id', 'ProviderService.CategoryId as categoryId', 'ServiceCategory.Name as categoryName', 'ProviderService.SubCategoryId as subCategoryId', 'ServiceSubCategory.Name as subCategoryName', 'Experience as experience', 'QuickPitch as quickPitch', 'ServiceCategory.PricePerHour as pricePerHour')
        .where('ProviderService.ProviderId', providerId)
        .leftJoin(provider, 'ProviderService.ProviderId', 'Provider.Id')
        .leftJoin(serviceCategory, 'ProviderService.CategoryId', 'ServiceCategory.Id')
        .leftJoin(serviceSubCategory, 'ProviderService.SubCategoryId', 'ServiceSubCategory.Id')
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.deleteServiceCategory = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService)
        .where(data)
        .del()
        .then((result) => {
          if (result > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderServiceInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderAvailability = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerAvailability)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderDocumentInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerDocuments)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderBankInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerPayment)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getServiceProviderIds = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerService)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getProviderListByIds = (data, page) => {
    var output = {}
    var limit = 10
    var offset = page > 1 ? (page - 1) * 10 : 0
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .whereIn('Id', data)
        .where('Status', 'verified')
        .limit(limit)
        .offset(offset)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = false
            output.result = []
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchServiceProviderByDistance = (lat, lon, distance, limit, services) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .select('Provider.id', knex.raw('ST_Distance_Sphere(point(ProviderAddress.Longitude, ProviderAddress.Latitude), point(?,?)) / 1000 as distance', [lon, lat]))
        .leftJoin(providerAddress, 'ProviderAddress.ProviderId', 'Provider.Id')
        .leftJoin(providerService, 'ProviderService.ProviderId', 'Provider.Id')
        // .having('distance', '<', distance)
        .where('Type', 'services')
        .where(services)
        .limit(limit)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.getProviderDeviceTokenByIds = (providerIds) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .select('GCMId as token', 'OS as deviceType')
        .where('Id', providerIds)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((output) => {
          output.error = true
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }

  this.resetProviderInfo = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .update({
          GCMId: null,
          OS: null,
          OSVersion: null,
          Latitude: null,
          Longitude: null,
          Bearing: null,
          S2CellID: null
        })
        .where('Id', providerId)
        .then((result) => {
          if (result) {
            output.error = false
            resolve(output)
          } else {
            output.error = true
            resolve(output)
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
}
