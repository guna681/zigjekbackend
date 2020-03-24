module.exports = function () {
  const AdminAuthService = require('../../services/Admin/AdminAuthService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var adminAuthService = new AdminAuthService();
  var common = new Common();

  this.adminPassValidate = (req, callback) => {
    var response = {}
    var data = {}
    data.Email = req.Email
    data.Password = req.Password
    adminAuthService.adminVerifyPwd(data, (result) => {
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
  this.adminAuthVerifyToken = (req) => {
    return new Promise(function (resolve) {
      var response = {}
      var data = {}
      data.Id = req.Id
      data.Roles = req.Roles
      data.iat = req.iat
      adminAuthService.adminVerifyTokenService(data, (result) => {
        if (result.error) {
          response.error = true
          response.msg = result.msg
        } else {
          response.error = false
          response.msg = result.msg
          response.data = result.data
        }
        resolve(response)
      })
    })
  }
}
