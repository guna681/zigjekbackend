module.exports = function () {
  const BookingRepository = require('../../repository/Admin/BookingRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var bookingRepository = new BookingRepository();
  var common = new Common();

  this.bookingAllDeleteService =  async (data, callback) => {
    var response = {}
    try {
      var adminGModelData = await bookingRepository.bookingAllDelete(data)
      if (adminGModelData.error === false) {
        response.error = false
        response.data = adminGModelData.data[0]
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
  this.bookingsListSelectService = async (data, callback) => {
    var response = {}
    try {
      var bookingscount = await bookingRepository.bookingsSelectViewCount()
      var bookingsData = await bookingRepository.bookingsSelectView(data)
      var result = []

      if (bookingsData.error === false && bookingscount.error === false) {
        result.push({
          data: bookingsData.data,
          Count: bookingscount.data[0].count
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
  this.getBookingsViewService = async (data, callback) => {
    var response = {}
    try {
      var bookingsData = await bookingRepository.getBookingsView(data)
      var bookingDetails = []
      bookingsData.data.forEach((j, index) => {
        var resultdata = common.secureChangerList(j.uEmail, j.uMobile)
        j.uEmail = resultdata['mobile']
        j.uMobile = resultdata['email']
        if (j.pEmail != null && j.pMobile != null) {
          var providerResult = common.secureChangerList(j.pEmail, j.pMobile)
          j.pEmail = providerResult['mobile']
          j.pMobile = providerResult['email']
        }
        bookingDetails.push(j)
      })
      if (bookingsData.error === false) {
        response.error = false
        response.data = bookingDetails[0]
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
  this.getProviderLocationBookingsViewService = async (data, callback) => {
    var response = {}
    try {
      var providerbookingsData = await bookingRepository.getProviderLocationBookingsView(data)
      if (providerbookingsData.error === false) {
        response.error = false
        response.data = providerbookingsData.data[0]
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
