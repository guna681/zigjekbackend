module.exports = function () {
  const ServicesService = require('../../services/Admin/ServicesService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })
  var common = new Common();

  var servicesService = new ServicesService();

  this.servicesViewCtrl = (callback) => {
    var response = {}
    servicesService.servicesViewService((result) => {
      console.log(result)
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
}
