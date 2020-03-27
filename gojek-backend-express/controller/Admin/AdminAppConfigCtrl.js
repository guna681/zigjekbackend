module.exports = function () {
  const AdminAppConfigService = require('../../services/Admin/AdminAppConfigService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var adminAppConfigService = new AdminAppConfigService();
  var common = new Common();

  this.appConfigEditCtrl = (req, callback) => {
    var response = {}
    adminAppConfigService.appConfigEditService(req, (result) => {
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
  this.appConfigViewPageCtrl = (callback) => {
    var response = {}
    adminAppConfigService.appConfigViewPageService((result) => {
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
