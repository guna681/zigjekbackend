module.exports = function () {
  const WalletRepository = require('../../repository/Admin/WalletRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var walletRepository = new WalletRepository();
  var common = new Common();

  this.getWithdrawlListViewService = async (data, callback) => {
    var response = {}
    try {
      var withdrawlcount = await walletRepository.getWithdrawlListViewCount()
      var withdrawldata = await walletRepository.getWithdrawlListViewData(data)
      var uresult = []
      if (withdrawldata.error === false && withdrawlcount.error === false) {
        uresult.push({
          data: withdrawldata.data,
          Count: withdrawlcount.data[0].count
        })
        response.error = false
        response.data = uresult
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
  this.withDrawlRequestStatusUpdateService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Status: data.Status
      }
      result.where = { Id: data.Id }
      var withdrawlUData = await walletRepository.withDrawlRequestStatusUpdate(result)
      if (withdrawlUData.error === false) {
        response.error = false
        response.data = withdrawlUData.data
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
