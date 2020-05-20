module.exports = function () {
  const ServiceTypeService = require('../../services/Admin/ServiceTypeService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var serviceTypeService = new ServiceTypeService();
  var common = new Common();

  this.rideTypeAddCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.rideTypeAddService(req, (result) => {
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
  this.rideTypeViewCtrl = (callback) => {
    var response = {}
    serviceTypeService.rideTypeViewService((result) => {
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
  this.rideTypeEditCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.rideTypeEditService(req, (result) => {
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
  this.rideTypeLanguageAddCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.rideTypeLanguageAddService(req, (result) => {
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
  this.rideTypeLanguageViewCtrl = (callback) => {
    var response = {}
    serviceTypeService.rideTypeLanguageViewService((result) => {
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
  this.rideTypeLanguageEditCtrl = (req, callback) => {
    var response = {}
    this.rideTypeLanguageEditService(req, (result) => {
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
  this.rideVehicleTypeAddCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.rideVehicleTypeAddService(req, (result) => {
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
  this.rideVehicleTypeViewCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.rideVehicleTypeViewService(req, (result) => {
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

  this.rideVehicleTypeEditCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.rideVehicleTypeEditService(req, (result) => {
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
  this.rideVehicleTypeStatusEditCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.rideVehicleTypeStatusEditService(req, (result) => {
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
  this.getRideVehicleTypePagesViewCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.getRideVehicleTypePagesViewService(req, (result) => {
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
  this.staticPagesAddCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.staticPagesAddService(req, (result) => {
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
  this.staticPagesListViewCtrl = (callback) => { 
    var response = {}
    serviceTypeService.staticPagesListViewService((result) => {
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
  this.staticPagesSelectCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.staticPagesSelectService(req, (result) => {
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
  this.getStaticPagesViewCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.getStaticPagesViewService(req, (result) => {
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
  this.staticPagesEditCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.staticPagesEditService(req, (result) => {
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
  this.cancellationPolicyAddCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.cancellationPolicyAddService(req, (result) => {
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
  this.cancellationPolicyViewCtrl = (callback) => {
    var response = {}
    serviceTypeService.cancellationPolicyViewService((result) => {
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
  this.cancellationPolicyPageViewCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.cancellationPolicyPageViewService(req, (result) => {
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
  this.getCancellationPolicyViewCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.getCancellationPolicyViewService(req, (result) => {
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
  this.cancellationPolicyEditCtrl = (req, callback) => {
    var response = {}
    serviceTypeService.cancellationPolicyEditService(req, (result) => {
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
  this.rideManualBookingVehicleTypeViewCtrl = (callback) => {
    var response = {}
    this.rideManualBookingVehicleTypeViewService((result) => {
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
