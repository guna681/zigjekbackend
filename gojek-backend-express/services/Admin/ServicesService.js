module.exports = function () {
  const ServicesRepository = require('../../repository/Admin/ServicesRepository')
  require('dotenv').config({ path: './../.env' })
  const Common = require('../../Utils/common')

  var servicesRepository = new ServicesRepository()
  var common = new Common()

  this.servicesViewService = async (callback) => {
    var response = {}
    try {
      var appsliderData = await servicesRepository.servicesView()
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.servicesTitleEditService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        Title: data.Title,
        Color: data.Color,
        Status: data.Status
      }
      var appsliderdata = {
        data: resData,
        where: { Id: data.Id }
      }
      var appsliderData = await servicesRepository.servicesTitleEdit(appsliderdata)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.servicesTitleViewService = async (data, callback) => {
    var response = {}
    try {
      var appsliderData = await servicesRepository.servicesTitleView(data)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.servicesListingService = async (data, callback) => {
    var response = {}
    try {
      var serviceCategoryData = await servicesRepository.ProviderserviceCategory(data)
      var serviceSubCategoryData = await servicesRepository.ProviderserviceSubCategory(data)
      if (serviceCategoryData.error === false) {
        var res = {}
        res.serviceCategory = serviceCategoryData.data
        res.serviceSubCategory = serviceSubCategoryData.data
        response.error = false
        response.data = res
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getS2CellGeomentryService = async (req, callback) => {
    var response = {}
    try {
      var lat = req.latitude
      var long = req.longitude
      var getS2CellInfo = await common.getCellIdFromCoordinates(lat, long)
      if (getS2CellInfo.error) {
        response.error = getS2CellInfo.error
        response.msg = getS2CellInfo.msg
      } else {
        response.error = getS2CellInfo.error
        response.msg = 'VALID'
        response.data = { key: getS2CellInfo.key, id: getS2CellInfo.id }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}