module.exports = function () {
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var common = new Common();

  this.fileUploadService = async (data, callback) => {
    var response = {}
    try {
      var imgupload = await common.imageUpload(data.req, data.res)
      console.log(imgupload)
      if (imgupload.error === false) {
        response.error = false
        response.data = imgupload.msg
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
