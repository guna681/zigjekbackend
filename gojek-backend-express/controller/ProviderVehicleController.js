module.exports = function () {
 const ProviderVehicleService = require('../services/ProviderVehicleService')
 const ProviderService = require('../services/ProviderService')

 var providerVehicleService = new ProviderVehicleService()
 var providerService = new ProviderService()

  this.getVehicleBrandCtrl = (callback) => {
    var response = {}
    providerVehicleService.getVehicleBrandService((result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response) 
    })
  }

  this.getVehicleModelCtrl = (req, callback) => {
    var response = {}
    var data = req
    var brandId = data.brandId
    providerVehicleService.getVehicleModelService(brandId, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.setProviderVehicleActiveCtrl = (req, callback) => {
    var response = {}
    var data = req
    var providerId = data.auth.Id
    providerVehicleService.setProviderVehicleActiveService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        providerVehicleService.getProviderVehicleDetailsService(data, (result) => {
          var vehicle = {}
          vehicle.Id = providerId
          vehicle.activeVehicleId = result.data.id
          vehicle.vehicleBrand = result.data.brandName
          vehicle.vehicleModel = result.data.modelName
          vehicle.vehicleNumber = result.data.noPlate
          providerService.changeProviderActiveVehicle(vehicle)
        })
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.removeProviderVehicleCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerVehicleService.removeProviderVehicleService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
}
