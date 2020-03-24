module.exports = function () {
  const AppSliderService = require('../../services/Admin/AppSliderService')
  const Common = require('../../Utils/common')
  require('dotenv').config()
var appSliderService = new AppSliderService();
var common = new Common();
  this.appSliderAddCtrl = (req, callback) => {
    var response = {}
    appSliderService.appSliderAddService(req, (result) => {
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
  this.appSliderPageViewCtrl = (req, callback) => {
    var response = {}
    appSliderService.appSliderPageViewService(req, (result) => {
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
  this.getappSliderViewCtrl = (req, callback) => {
    var response = {}
    appSliderService.getappSliderViewService(req, (result) => {
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
  this.appSliderEditCtrl = (req, callback) => {
    var response = {}
    appSliderService.appSliderEditService(req, (result) => {
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
  this.appSliderDeleteCtrl = (req, callback) => {
    var response = {}
    appSliderService.appSliderDeleteService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }
}
