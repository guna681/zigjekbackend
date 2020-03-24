module.exports = function () {
  const ReviewManagementService = require('../../services/Admin/ReviewManagementService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var reviewManagementService = new ReviewManagementService();
  var common = new Common();

  this.admingetUserProviderReviewManagementCtrl = (req, callback) => {
    var response = {}
    reviewManagementService.admingetUserProviderReviewManagementService(req, (result) => {
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
