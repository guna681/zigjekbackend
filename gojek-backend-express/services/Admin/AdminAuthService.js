module.exports = function () {
  const AdminAuthRepository = require('../../repository/Admin/AdminAuthRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var adminAuthRepository = new AdminAuthRepository();
  var common = new Common();

  this.adminVerifyPwd = async (data, callback) => {
    var response = {}
    try {
      var admin = {}
      admin.Email = data.Email
      var adminDetailsData = await adminAuthRepository.fetchadminDetails(admin)
      if (adminDetailsData.error === false) {
        var adminDetails = adminDetailsData.data[0]
        var compare = await common.comparePassword(data.Password, adminDetails.Password)
        if (adminDetails.Email === data.Email && compare === true) {
          var adminAuth = {}
          adminAuth.Id = adminDetails.Id
          adminAuth.Roles = 'admin'
          var adminList = {}
          adminList.firstName = adminDetails.FirstName
          adminList.lastName = adminDetails.LastName
          adminList.Username = adminDetails.Username
          adminList.Email = adminDetails.Email
          adminList.Roles = adminDetails.Roles
          adminList.token = await common.generateToken(adminAuth, process.env.JWT_SECRET)
          response.error = false
          response.data = adminList
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED: $[1],Password'
        }
      } else {
        response.error = true
        response.msg = 'FAILED: $[1],Email Id'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.adminVerifyTokenService = async (data, callback) => {
    var response = {}
    try {
      var admin = {}
      switch (data.Roles) {
        case 'admin':
          admin.where = { Id: data.Id }
          admin.role = 'Admin'
          break
        case 'users':
          admin.where = { Id: data.Id }
          admin.role = 'Users'
          break
        case 'providers':
          admin.where = { Id: data.Id }
          admin.role = 'Provider'
          break
        default:
          console.log('Error')
          break
      }
      var adminTokenData = await adminAuthRepository.adminVerifyJwtToken(admin)
      if (adminTokenData.error === false) {
        var adminTokenDetails = adminTokenData.data[0]
        response.error = false
        response.msg = 'VALID'
        response.data = adminTokenDetails
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
