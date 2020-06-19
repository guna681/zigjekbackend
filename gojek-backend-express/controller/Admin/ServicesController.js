module.exports = function () {
  const ServicesService = require('../../services/Admin/ServicesService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var servicesService = new ServicesService();

  this.servicesTitleListViewCtrl = (callback) => {
    var response = {}
    servicesService.servicesViewService((result) => {
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
  this.servicesTitleEditCtrl = (req, callback) => {
    var response = {}
    servicesService.servicesTitleEditService(req, (result) => {
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
  this.servicesTitleViewCtrl = (data, callback) => {
    var response = {}
    servicesService.servicesTitleViewService(data, (result) => {
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

  this.servicesListingCtrl = (data, callback) => {
    var response = {}
    servicesService.servicesListingService(data, (result) => {
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

  this.getS2CellGeomentryCtrl = (req, callback) => {
    var response = {}
    servicesService.getS2CellGeomentryService(req, (result) => {
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

  this.serviceCategoryListViewCtrl = (data, callback) => {
    var response = {}
    servicesService.serviceCategoryService(data, (result) => {
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

  this.addCategoryCtrl = (data, callback) => {
    var response = {}
    servicesService.addCategoryService(data, (result) => {
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
