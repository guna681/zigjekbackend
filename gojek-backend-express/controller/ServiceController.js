module.exports = function () {
  const ServiceCategoryService = require('../services/ServiceCategoryService.js')

  var serviceCategoryService = new ServiceCategoryService()

  this.getServiceList = (callback) => {
    var response = {}
    serviceCategoryService.getServiceListing((result) => {
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
