module.exports = function () {
  const UsersService = require('../../services/Admin/UsersService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var usersService = new UsersService();
  var common = new Common()

  this.usersListViewCtrl = (req, callback) => {
    var response = {}
    usersService.usersListViewService(req, (result) => {
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
  this.usersPushNotificationPageViewCtrl = (req, callback) => {
    var response = {}
    usersService.usersPushNotificationPageViewService(req, (result) => {
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
  this.usersPushNotificationSearchDataViewCtrl = (req, callback) => {
    var response = {}
    usersService.usersPushNotificationSearchDataViewService(req, (result) => {
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
  this.usersPushNotificationSendCtrl = (req, callback) => {
    var response = {}
    usersService.usersPushNotificationSendService(req, (result) => {
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
  this.getUsersProviderListCtrl = (req, callback) => {
    var response = {}
    usersService.getUsersProviderListService(req, (result) => {
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
  this.getManualBookingUsersCheckListCtrl = (req, callback) => {
    var response = {}
    this.getManualBookingUsersCheckListService(req, (result) => {
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

  this.disableUserCtrl = (req, callback) => {
    var response = {}
    usersService.disableUserService(req, (result) => {
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

  this.deleteUserCtrl = (req, callback) => {
    var response = {}
    usersService.deleteUserService(req, (result) => {
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
