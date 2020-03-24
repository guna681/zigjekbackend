module.exports = function () {
  require('dotenv').config()
  const ProviderVehicleRepository = require('../repository/ProviderVehicleRepository')

  var providerVehicleRepository = new ProviderVehicleRepository()

  this.getVehicleBrandService = async (callback) => {
    var response = {}
    try {
      var vehicleBrand = await providerVehicleRepository.fetchVehicleBrand()
      if (vehicleBrand.error) {
        response.error = true
        response.msg = 'NO_VEHICLE_BRAND'
      } else {
        response.error = false
        response.data = vehicleBrand.result
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = false
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getVehicleModelService = async (brandId, callback) => {
    var response = {}
    try {
      var vehicleBrand = await providerVehicleRepository.fetchVehicleModel(brandId)
      if (vehicleBrand.error) {
        response.error = true
        response.msg = 'NO_VEHICLE_MODEL'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = vehicleBrand.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.addProviderVehicleService = async (req, callback) => {
    var data = req
    var response = {}
    try {
      var vehicle = {}
      vehicle.ProviderId = data.auth === undefined ? data.data.Id : data.auth.Id
      vehicle.VehicleImage = data.imageUrl === undefined ? 'http://139.59.55.166:3000/public/uploads/provider/a1fa3975-5884-48eb-a193-b4c0bb1a9e72.jpg' : data.imageUrl
      vehicle.VehicleBrandName = data.vehicleBrand === undefined ? 'Tesla' : data.vehicleBrand
      vehicle.VehicleModelName = data.vehicleModel === undefined ? 'Roadster' : data.vehicleModel
      vehicle.RideVehicleTypeId = data.serviceType === undefined ? '["1","2","3","4","5","6","7"]' : data.serviceType
      vehicle.VehicleNumber = data.noPlate === undefined ? 'TES7 7E 57' : data.noPlate
      vehicle.Year = data.year === undefined ? '2019' : data.year
      vehicle.Color = data.color === undefined ? 'blue' : data.color
      vehicle.Status = data.serviceType === undefined ? 'active' : 'pending'
      vehicle.IsActive = 'no'
      var create = await providerVehicleRepository.addVehicle(vehicle)
      if (create.error) {
        response.error = true
        response.msg = 'ERROR_ADD_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_ADDED'
        response.data = create.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderVehicleListService = async (ProviderId, callback) => {
    var response = {}
    try {
      var vehicles = await providerVehicleRepository.fetchProviderVehicle(ProviderId)
      if (vehicles.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = vehicles.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderVehicleDetailsService = async (data, callback) => {
    var response = {}
    try {
      var vehicleId = data.vehicleId
      var providerId = data.auth.Id
      var vehicle = await providerVehicleRepository.fetchProviderVehicleDetails(providerId, vehicleId)
      if (vehicle.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = vehicle.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.editProviderVehicleSerivce = async (data, callback) => {
    var response = {}
    try {
      var vehicle = {}
      vehicle.Id = data.vehicleId
      vehicle.ProviderId = data.auth.Id
      vehicle.VehicleImage = data.imageUrl
      vehicle.VehicleBrandName = data.vehicleBrand
      vehicle.VehicleModelName = data.vehicleModel
      vehicle.RideVehicleTypeId = data.serviceType
      vehicle.VehicleNumber = data.noPlate
      vehicle.Year = data.year
      vehicle.Color = data.color
      vehicle.Status = 'pending'
      vehicle.IsActive = 'no'

      var edit = await providerVehicleRepository.updateProviderVehicleDetails(vehicle)

      if (edit.error) {
        response.error = true
        response.msg = 'ERROR_ADD_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_UPDATE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.setProviderVehicleActiveService = async (data, callback) => {
    var response = {}
    try {
      var vehicleId = data.vehicleId
      var providerId = data.auth.Id
      var status = await providerVehicleRepository.updateActiveVehicle(vehicleId, providerId)
      if (status.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_ACTIVE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.removeProviderVehicleService = async (data, callback) => {
    var response = {}
    try {
      var condition = {}
      condition.Id = data.vehicleId
      condition.ProviderId = data.auth.Id
      var vehicle = await providerVehicleRepository.deleteVehicle(condition)
      if (vehicle.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_DELETED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      callback(err)
    }
  }

  this.getProivderActiveVehicleDetails = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var vehicle = await providerVehicleRepository.fetchActiveVehicle(providerId)
        if (vehicle.error) {
          response.error = true
          response.msg = 'NO_VEHICLE'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.data = vehicle.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
