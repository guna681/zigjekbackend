module.exports = function () {
  const PromoCodesService = require('../../services/Admin/PromoCodesService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var promoCodesService = new PromoCodesService();
  var common = new Common();

  this.promoCodesAddCtrl = (req, callback) => {
    var response = {}
    promoCodesService.promoCodesAddService(req, (result) => {
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
  this.getPromoCodesListViewCtrl = (callback) => {
    var response = {}
    promoCodesService.getPromoCodesListViewService((result) => {
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
  this.getPromoCodesEditListViewCtrl = (req, callback) => {
    var response = {}
    promoCodesService.getPromoCodesEditListViewService(req, (result) => {
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
  this.promoCodesEditCtrl = (req, callback) => {
    var response = {}
    promoCodesService.promoCodesEditService(req, (result) => {
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
    promoCodesService.promoCodesStatusUpdateService(req, (result) => {
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
