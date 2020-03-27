module.exports = function () {
  const DashboardService = require('../../services/Admin/DashboardService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var dashboardService = new DashboardService();
  var common = new Common();

  this.admindashboardListViewCtrl = (callback) => {
    var response = {}
    dashboardService.admindashboardListViewService((result) => {
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
