module.exports = function () {
  const InvoiceService = require('../services/InvoiceService')
  const BookingRepository = require('../repository/BookingRepository')
  const AppConfigService = require('../services/AppConfigService')
  const RatingService = require('../services/RatingServices')
  const Common = require('../Utils/common')
  const Mailer = require('../Utils/mailer')

  var invoiceService = new InvoiceService()
  var bookingRepository = new BookingRepository()
  var appConfigService = new AppConfigService()
  var ratingService = new RatingService()
  var common = new Common()
  var mailer = new Mailer()

  this.invoiceMailerCtrl = (callback) => {
    invoiceService.getUsersBookingDetails(async (result) => {
      try {
        var usersInfo = result
        if (usersInfo.error) {

        } else {
          var smtp = await appConfigService.getSMTPConfig()
          var template = await appConfigService.getEmailTemplateList(2)
          usersInfo.data.map(async (userDetails) => {
            var FirstName = userDetails.FirstName
            var LastName = userDetails.LastName
            var Image = userDetails.Image
            var Email = userDetails.Email
            var year = new Date().getFullYear()
            var rating = {
              TypeId: {
                BookingId: userDetails.Id
              },
              Type: {
                ReviewedBy: 'user'
              }
            }
            if (userDetails.IsUserReviewed === 'no') {
              var curtype = userDetails.currencyType
              var temp = await common.multipleStringReplace(template.data, [
                { substr: '*username*', to: FirstName + LastName },
                { substr: '*name*', to: FirstName + LastName },
                { substr: '*year*', to: year },
                { substr: '*userimage*', to: Image },
                { substr: '*basefare*', to: curtype + userDetails.estimation },
                { substr: '*ridedate*', to: userDetails.createAt },
                { substr: '*source*', to: userDetails.fromLocation },
                { substr: '*destination*', to: userDetails.toLocation },
                { substr: '*ridename*', to: userDetails.rideName },
                { substr: '*distance*', to: ((userDetails.distance) / 1000) },
                { substr: '*triptime*', to: userDetails.waitingCharges },
                { substr: '*time*', to: curtype + userDetails.waitingCharges },
                { substr: '*tax*', to: curtype + userDetails.tax },
                { substr: '*total*', to: curtype + userDetails.totalAmount },
                { substr: '*subtotal*', to: curtype + userDetails.totalAmount },
                { substr: '*paymentcharge*', to: curtype + userDetails.totalAmount },
                { substr: '*paymentmode*', to: userDetails.paymentMode }
              ])
              mailer.MailerNew(smtp.data, Email, 'Booking Invoice', temp)
              await invoiceService.updateEmailInvoiceStatusService(userDetails.Id)
            } else {
              var fetchrating = await ratingService.fetchRatingDetailsService(rating)
              var triprating = await common.bookingTripStarCounting(fetchrating.data.Rating)
              var curtype1 = userDetails.currencyType
              var temp1 = await common.multipleStringReplace(template.data, [
                { substr: '*username*', to: FirstName + LastName },
                { substr: '*name*', to: FirstName + LastName },
                { substr: '*year*', to: year },
                { substr: '*userimage*', to: Image },
                { substr: '*basefare*', to: curtype1 + userDetails.estimation },
                { substr: '*ridedate*', to: userDetails.createAt },
                { substr: '*source*', to: userDetails.fromLocation },
                { substr: '*destination*', to: userDetails.toLocation },
                { substr: '*ridename*', to: userDetails.rideName },
                { substr: '*distance*', to: ((userDetails.distance) / 1000) },
                { substr: '*triptime*', to: userDetails.waitingCharges },
                { substr: '*time*', to: curtype1 + userDetails.waitingCharges },
                { substr: '*tax*', to: curtype1 + userDetails.tax },
                { substr: '*total*', to: curtype1 + userDetails.totalAmount },
                { substr: '*subtotal*', to: curtype1 + userDetails.totalAmount },
                { substr: '*paymentcharge*', to: curtype1 + userDetails.totalAmount },
                { substr: '*paymentmode*', to: userDetails.paymentMode },
                { substr: '*triprating*', to: triprating }
              ])
              mailer.MailerNew(smtp.data, Email, 'Booking Invoice', temp1)
              await invoiceService.updateEmailInvoiceStatusService(userDetails.Id)
            }
          })
        }
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    })
  }
}
