module.exports = function () {
  const PeekChargesService = require('../../services/Admin/peekChargesService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var peekChargesService = new PeekChargesService();
  var common = new Common();
  this.peekChargesAddCtrl = (req, callback) => {
    var response = {}
    peekChargesService.peekChargesAddService(req, (result) => {
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
  this.getPeekChargesPageViewCtrl = (req, callback) => {
    var response = {}
    peekChargesService.peekChargesPageViewService(req, (result) => {
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
  this.getPeekChargesEditListViewCtrl = (req, callback) => {
    var response = {}
    peekChargesService.getPeekChargesEditListViewService(req, (result) => {
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
  this.peekChargesEditCtrl = (req, callback) => {
    var response = {}
    peekChargesService.peekChargesEditService(req, (result) => {
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
  this.promoCodesStatusUpdateCtrl = (req, callback) => {
    var response = {}
    peekChargesService.promoCodesStatusUpdateService(req, (result) => {
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
