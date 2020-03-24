module.exports = function () {
  const WalletService = require('../../services/Admin/WalletService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var walletService = new WalletService();
  var common = new Common();

  this.getWithdrawlListViewCtrl = (req, callback) => {
    var response = {}
    walletService.getWithdrawlListViewService(req, (result) => {
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
  this.withDrawlRequestStatusUpdateCtrl = (req, callback) => {
    var response = {}
    walletService.withDrawlRequestStatusUpdateService(req, (result) => {
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
