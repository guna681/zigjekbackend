module.exports = function () {
  const EmailTemplateService = require('../../services/Admin/EmailTemplateService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var emailTemplateService = new EmailTemplateService();
  var common = new Common();
  this.emailTemplateAddCtrl = (req, callback) => {
    var response = {}
    emailTemplateService.emailTemplateAddService(req, (result) => {
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
  this.emailTemplateViewCtrl = (callback) => {
    var response = {}
    emailTemplateService.emailTemplateViewService((result) => {
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
  this.emailTemplateSelectCtrl = (req, callback) => {
    var response = {}
    emailTemplateService.emailTemplatePagesListViewService(req, (result) => {
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
  this.getEmailTemplatePagesViewCtrl = (req, callback) => {
    var response = {}
    emailTemplateService.getEmailTemplatePagesViewService(req, (result) => {
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
  this.emailTemplateEditCtrl = (req, callback) => {
    var response = {}
    emailTemplateService.emailTemplateEditService(req, (result) => {
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
