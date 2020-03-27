module.exports = function () {
  const PromoCodesRepository = require('../../repository/Admin/PromoCodesRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var promoCodesRepository = new PromoCodesRepository();
  var common = new Common();

  this.promoCodesAddService = async (data, callback) => {
    var response = {}
    try {
      var promocodesdata = {
        Name: data.Name,
        Coupon: data.Coupon,
        Discount: data.Discount,
        Description: data.Description,
        Type: data.Type,
        Threshold: data.Threshold,
        MinValueToRedeem: data.MinValueToRedeem,
        MaxValueToRedeem: data.MaxValueToRedeem,
        ValidFrom: data.ValidFrom,
        ValidTo: data.ValidTo,
        RedeemableType: data.RedeemableType,
        Status: data.Status
      }
      var promocodesIData = await promoCodesRepository.promoCodesAdd(promocodesdata)
      if (promocodesIData.error === false) {
        response.error = false
        response.data = promocodesIData.data[0]
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
  this.getPromoCodesListViewService = async (callback) => {
    var response = {}
    try {
      var promocodesSData = await promoCodesRepository.getPromoCodesView()
      if (promocodesSData.error === false) {
        promocodesSData.data.filter((x) => {
          x['ValidFrom'] = common.dateFormatter(x.ValidFrom)
          x['ValidTo'] = common.dateFormatter(x.ValidTo)
        })
        response.error = false
        response.data = promocodesSData.data
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
  this.getPromoCodesEditListViewService = async (data, callback) => {
    var response = {}
    try {
      var promocodeseditListData = await promoCodesRepository.getPromoCodesEditListView(data)
      if (promocodeseditListData.error === false) {
        response.error = false
        response.data = promocodeseditListData.data[0]
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
  this.promoCodesEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Name: data.Name,
        Coupon: data.Coupon,
        Discount: data.Discount,
        Description: data.Description,
        Type: data.Type,
        Threshold: data.Threshold,
        MinValueToRedeem: data.MinValueToRedeem,
        MaxValueToRedeem: data.MaxValueToRedeem,
        ValidFrom: data.ValidFrom,
        ValidTo: data.ValidTo,
        RedeemableType: data.RedeemableType,
        Status: data.Status
      }
      result.where = { Id: data.Id }
      var promocodesUData = await this.promoCodesEdit(result)
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
  this.promoCodesStatusUpdateService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Status: data.Status
      }
      result.where = { Id: data.Id }
      var promocodesUData = await promoCodesRepository.promoCodesEdit(result)
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
