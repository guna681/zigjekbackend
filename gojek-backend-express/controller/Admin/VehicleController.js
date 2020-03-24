module.exports = function () {
  const VehicleService = require('../../services/Admin/VehicleService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var vehicleService = new VehicleService();
  var common = new Common();

  this.vehicleBrandAddCtrl = (req, callback) => {
    var response = {}
    vehicleService.vehicleBrandAddService(req, (result) => {
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
  this.vehicleBrandViewCtrl = (callback) => {
    var response = {}
    vehicleService.vehicleBrandViewService((result) => {
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
  this.vehicleBrandPageViewCtrl = (req, callback) => {
    var response = {}
    vehicleService.vehicleBrandPageViewService(req, (result) => {
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
  this.getVehicleBrandViewCtrl = (req, callback) => {
    var response = {}
    vehicleService.getVehicleBrandViewService(req, (result) => {
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
  this.vehicleBrandEditCtrl = (req, callback) => {
    var response = {}
    vehicleService.vehicleBrandEditService(req, (result) => {
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
  this.vehicleModelAddCtrl = (req, callback) => {
    var response = {}
    vehicleService.vehicleModelAddService(req, (result) => {
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
  this.vehicleModelPageViewCtrl = (req, callback) => {
    var response = {}
    vehicleService.vehicleModelPageViewService(req, (result) => {
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
  this.vehicleModelViewCtrl = (callback) => {
    var response = {}
    vehicleService.vehicleModelViewService((result) => {
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
  this.getVehicleModelViewCtrl = (req, callback) => {
    var response = {}
    vehicleService.getVehicleModelViewService(req, (result) => {
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
  this.vehicleModelEditCtrl = (req, callback) => {
    var response = {}
    vehicleService.vehicleModelEditService(req, (result) => {
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
