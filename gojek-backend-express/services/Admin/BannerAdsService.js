module.exports = function () {
  const BannerAdsRepository = require('../../repository/Admin/BannerAdsRepository')
  require('dotenv').config({ path: './../.env' })

  var bannerAdsRepository = new BannerAdsRepository()

  this.bannerAdsAddService = async (data, callback) => {
    var response = {}
    try {
      var appsliderdata = {
        Title: data.Title,
        Description: data.Description,
        Image_path: data.Image_path,
        Url: data.Url,
        Status: data.Status
      }
      var appsliderInsertData = await bannerAdsRepository.bannerAdsAdd(appsliderdata)
      if (appsliderInsertData.error === false) {
        response.error = false
        response.data = appsliderInsertData.data[0]
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
  this.bannerAdsPageViewService = async (callback) => {
    var response = {}
    try {
      var appsliderPSelectSData = await bannerAdsRepository.bannerAdsPageView()
      var result = []
      if (appsliderPSelectSData.error === false) {
        if (appsliderPSelectSData.error === false && appsliderPSelectSData.data.length === 0) {
          result.push({
            data: appsliderPSelectSData.data
          })
          response.error = false
          response.data = result
          response.msg = 'VALID'
        } else {
          result.push({
            data: appsliderPSelectSData.data
          })
          response.error = false
          response.data = result
          response.msg = 'VALID'
        }
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
  this.getbannerAdsViewService = async (data, callback) => {
    var response = {}
    try {
      var appsliderData = await bannerAdsRepository.getbannerAdsView(data)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data[0]
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
  this.bannerAdsEditService = async (data, callback) => {
    var response = {}
    try {
      if (data.Title == 'WEB') {
       var resData = {
        Title: data.Title,
        Description: '',
        Image_path: data.Image_path,
        Url: data.Url,
        Status: data.Status
      }
      } else {
     var resData = {
        Title: data.Title,
        Description: data.Description,
        Image_path: data.Image_path,
        Url: '',
        Status: data.Status
      }
      }
      var appsliderdata = {
        data: resData,
        where: { Id: data.Id }
      }
      var appsliderData = await bannerAdsRepository.bannerAdsEdit(appsliderdata)
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
  this.bannerAdsStatusUpdateService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Status: data.Status
      }
      result.where = { Id: data.Id }
      var promocodesUData = await bannerAdsRepository.bannerAdsEdit(result)
      if (promocodesUData.error === false) {
        response.error = false
        response.data = promocodesUData.data
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
