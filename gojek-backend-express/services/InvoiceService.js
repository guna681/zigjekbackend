module.exports = function () {
  const InvoiceRepository = require('../repository/InvoiceRepository')

  var invoiceRepository = new InvoiceRepository()

  this.getUsersBookingDetails = async (callback) => {
    var response = {}
    try {
      var userInfo = await invoiceRepository.fetchBookingUserDetails()
      if (userInfo.error) {
        response.error = true
        response.msg = 'UNAUTHORIZED'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = userInfo.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.updateEmailInvoiceStatusService = (Id) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var sendData = {
          where: {
            Id: Id
          },
          data: {
            EmailStatus: 'yes'
          }
        }
        var bookingiemailinvcdetails = await invoiceRepository.updateInvoiceMailBookingState(sendData)
        if (bookingiemailinvcdetails.error) {
          response.error = true
          response.msg = 'FAILED'
        } else {
          response.error = false
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
