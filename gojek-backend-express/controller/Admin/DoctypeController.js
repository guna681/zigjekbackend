module.exports = function () {
  const DoctypeService = require('../../services/Admin/DoctypeService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var doctypeService = new DoctypeService();
  var common = new Common();

  this.adminDocTypeInsertCtrl = (req, callback) => {
    var response = {}
    doctypeService.adminDocTypeInsertService(req, (result) => {
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
  this.adminDocTypeSelectCtrl = (callback) => {
    var response = {}
    doctypeService.adminDocTypeSelectService((result) => {
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
  this.admindocTypeViewPageCtrl = (req, callback) => {
    var response = {}
    doctypeService.admindocTypeViewPageService(req, (result) => {
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
  this.adminGetDoctypeViewCtrl = (req, callback) => {
    var response = {}
    doctypeService.adminGetDoctypeViewService(req, (result) => {
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
  this.adminDocTypeUpdateCtrl = (req, callback) => {
    var response = {}
    doctypeService.adminDocTypeUpdateService(req, (result) => {
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

  this.adminDocTypeDeleteCtrl = (req, callback) => {
    var response = {}
    doctypeService.adminDocTypeDeleteService(req, (result) => {
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
