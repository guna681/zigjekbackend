module.exports = function () {
  const FileUploadService = require('../../services/Admin/FileUploadService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var fileUploadService = new FileUploadService();
  
  this.fileUploadCtrl = (req, callback) => {
    var response = {}
    fileUploadService.fileUploadService(req, (result) => {
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
