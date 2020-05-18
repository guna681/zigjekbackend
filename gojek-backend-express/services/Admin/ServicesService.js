module.exports = function () {
  const ServicesRepository = require('../../repository/Admin/ServicesRepository')
  require('dotenv').config({ path: './../.env' })

  var servicesRepository = new ServicesRepository()

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
}
