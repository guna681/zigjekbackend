module.exports = function () {
  const EmailTemplateRepository = require('../../repository/Admin/EmailTemplateRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var emailTemplateRepository = new EmailTemplateRepository();
  var common = new Common();

  this.emailTemplateAddService = async (data, callback) => {
    var response = {}
    try {
      var emaildata = {
        KeyWord: data.KeyWord,
        Type: data.Type,
        Template: data.Template
      }
      var emailTemplateIData = await emailTemplateRepository.emailTemplateAdd(emaildata)
      if (emailTemplateIData.error === false) {
        response.error = false
        response.data = emailTemplateIData.data[0]
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
  this.emailTemplateViewService = async (callback) => {
    var response = {}
    try {
      var emailTemplateSData = await emailTemplateRepository.emailTemplateView()
      if (emailTemplateSData.error === false) {
        response.error = false
        response.data = emailTemplateSData.data
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
  this.emailTemplatePagesListViewService = async (data, callback) => {
    var response = {}
    try {
      var cancelcount = await emailTemplateRepository.emailTemplateSelectViewCount()
      var cancelData = await emailTemplateRepository.emailTemplateSelectView(data)
      var result = []
      if (cancelData.error === false && cancelcount.error === false) {
        result.push({
          data: cancelData.data,
          Count: cancelcount.data[0].count
        })
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
  this.getEmailTemplatePagesViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCancelData = await emailTemplateRepository.getEmailTemplatePageView(data)
      if (adminGCancelData.error === false) {
        response.error = false
        response.data = adminGCancelData.data[0]
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
  this.emailTemplateEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        KeyWord: data.KeyWord,
        Type: data.Type,
        Template: data.Template
      }
      result.where = { Id: data.Id }
      var emailTemplateUData = await emailTemplateRepository.emailTemplateEdit(result)
      if (emailTemplateUData.error === false) {
        response.error = false
        response.data = emailTemplateUData.data
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
