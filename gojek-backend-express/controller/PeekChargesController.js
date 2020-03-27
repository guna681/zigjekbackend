module.exports = function () {
 const PeekChargesService = require('../services/PeekChargesService')

 var peekChargesService = new PeekChargesService()
  this.peekChargesRedeemCtrl = (req, callback) => {
    var response = {}
    peekChargesService.peekChargesRedeemService(req, (result) => {
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
