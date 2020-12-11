module.exports = function () {
  const BookingService = require('../../services/Admin/BookingService')
  require('dotenv').config({ path: './../.env' })

  var bookingService = new BookingService()
  this.bookingAllDeleteCtrl = (req, callback) => {
    var response = {}
    bookingService.bookingAllDeleteService(req, (result) => {
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
  this.bookingsListSelectCtrl = (req, callback) => {
    var response = {}
    bookingService.bookingsListSelectService(req, (result) => {
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
  this.getBookingsViewCtrl = (req, callback) => {
    var response = {}
    bookingService.getBookingsViewService(req, (result) => {
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
  this.getProviderLocationBookingsViewCtrl = (req, callback) => {
    var response = {}
    bookingService.getProviderLocationBookingsViewService(req, (result) => {
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
