module.exports = function () {
  const AdminAppConfigRepository = require('../../repository/Admin/AdminAppConfigRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var adminAppConfigRepository = new AdminAppConfigRepository();
  var common = new Common();

  this.appConfigEditService = async (data, callback) => {
    var response = {}
    try {
      var appconfigdata = {
        data: {
          Value: data.Value
        },
        where: {
          Id: data.Id
        }
      }
      var appUCountryData = await adminAppConfigRepository.appConfigEdit(appconfigdata)
      if (appUCountryData.error === false) {
        response.error = false
        response.data = appUCountryData.data
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
  this.appConfigViewPageService = async (callback) => {
    var response = {}
    try {
      var appconfigPSelectSData = await adminAppConfigRepository.appConfigPageView()
      var result = []
      result.push({
        data: appconfigPSelectSData.data
      })
      if (appconfigPSelectSData.error === false) {
        response.error = false
        response.data = result
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
