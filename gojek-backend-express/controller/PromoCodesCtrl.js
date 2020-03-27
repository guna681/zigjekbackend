module.exports = function () {
 const PromoCodesService = require('../services/PromoCodesService')
 var promoCodesService = new PromoCodesService()
  require('../Utils/common')()
  require('dotenv').config({ path: './../.env' })
  this.usersPromoCodesListCtrl = (data, callback) => {
    var response = {}
    promoCodesService.usersPromoCodesListService(data, (result) => {
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
  this.promoCodesRedeemCtrl = async (req, callback) => {
    var response = {}
    var userID = req.auth.Id
    var amount = req.amount
    var promocodesuser = await promoCodesService.userPromoCodesRedeemService(req)
    if (promocodesuser.error) {
      response.error = true
      response.msg = promocodesuser.msg
    } else {
      var addData = {
        userId: userID,
        amount: amount,
        discountAmount: promocodesuser.data.Amount
      }
      var addpromocodeData = await promoCodesService.addPromoCodeRedeemableService(addData)
      if (addpromocodeData.error) {
        response.error = true
        response.msg = promocodesuser.msg
      } else {
        promocodesuser.data.promoCodeRedeemId = addpromocodeData.result[0]
        response.error = false
        response.msg = promocodesuser.msg
        response.data = promocodesuser.data
      }
    }
    callback(response)
  }
}
