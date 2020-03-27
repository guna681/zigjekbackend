module.exports = function () {
 const BannerAdsService = require('../../services/Admin/BannerAdsService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var bannerAdsService = new BannerAdsService();
  var common = new Common();
  
  this.bannerAdsAddCtrl = (req, callback) => {
    var response = {}
    bannerAdsService.bannerAdsAddService(req, (result) => {
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
  this.bannerAdsPageViewCtrl = (callback) => {
    var response = {}
    bannerAdsService.bannerAdsPageViewService((result) => {
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
  this.getbannerAdsViewCtrl = (req, callback) => {
    var response = {}
    bannerAdsService.getbannerAdsViewService(req, (result) => {
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
  this.bannerAdsEditCtrl = (req, callback) => {
    var response = {}
    bannerAdsService.bannerAdsEditService(req, (result) => {
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
  this.bannerAdsStatusUpdateCtrl = (req, callback) => {
    var response = {}
    bannerAdsService.bannerAdsStatusUpdateService(req, (result) => {
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
