module.exports = function () {
  const UserService = require('../services/UserService.js')
  const AppConfigService = require('../services/AppConfigService')
  const ProviderService = require('../services/ProviderService')
  const BookingService = require('../services/BookingService')
  const Common = require('../Utils/common.js')
  const Mailer = require('../Utils/mailer')
  const PaymentHelperService = require('../thirdParty/paymentHelper')
  const WalletService = require('../services/WalletService')
  const TransactionServices = require('../services/TransactionServices')
  const TrackingService = require('../services/TrackingService')
  const PushNotification = require('../thirdParty/pushNotification')
  const RatingService = require('../services/RatingServices')
  require('dotenv').config({ path: './../.env' })

  var ratingService = new RatingService()
  var pushNotification = new PushNotification()
  var trackingService = new TrackingService()
  var appConfigService = new AppConfigService()
  var userService = new UserService()
  var providerService = new ProviderService()
  var bookingService = new BookingService()
  var common = new Common()
  var mailer = new Mailer()
  var paymentHelperService = new PaymentHelperService()
  var walletService = new WalletService()
  var transactionServices = new TransactionServices()

  this.appSetting = (callback) => {
    var response = {}
    var type = 'user'
    appConfigService.appConfig(type, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }

  this.mobileValidation = (mobile, callback) => {
    if (process.env.ISTWILIO == '0') {
    var response = {}
    userService.checkUserExists(mobile, (result) => {
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
    } else {
          var response = {}
    var name = 'user'
    userService.checkUserExists(mobile, async (result) => {
      var authtyperesult = await appConfigService.authTypeChecking(name)
      if (result.error) {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            common.sendOtpMobile(mobile.number, mobile.ext)
            response.error = false
            response.msg = result.msg
          } else {
            common.sendOtpMobile(mobile.number, mobile.ext)
            response.error = false
            response.msg = result.msg
          }
        }
      } else {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            common.sendOtpMobile(mobile.number, mobile.ext)
            response.error = false
            response.msg = result.msg
          } else {
            response.error = false
            response.msg = result.msg
          }
        }
      }
      callback(response)
    })

    }
  }

  this.twilioMobileValidation = (mobile, callback) => {
    var response = {}
    var name = 'user'
    userService.checkUserExists(mobile, async (result) => {
      var authtyperesult = await appConfigService.authTypeChecking(name)
      if (result.error) {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            common.sendOtpMobile(mobile.number, mobile.ext)
            response.error = false
            response.msg = result.msg
          } else {
            common.sendOtpMobile(mobile.number, mobile.ext)
            response.error = false
            response.msg = result.msg
          }
        }
      } else {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            common.sendOtpMobile(mobile.number, mobile.ext)
            response.error = false
            response.msg = result.msg
          } else {
            response.error = false
            response.msg = result.msg
          }
        }
      }
      callback(response)
    })
  }

  this.registerUser = async (req, callback) => {
    var response = {}
    var data = req
    var stripeData = {}
    userService.createUser(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var userId = await common.getPayloadFromToken(result.data.token, process.env.JWT_SECRET)
        var striperes = await paymentHelperService.createPaymentCustomerId(data.email)
        var stripeCustomerId = striperes.data.id
        stripeData.StripeCustomerID = stripeCustomerId
        await userService.updateUserStripeCustomerID(stripeData, userId.data.sub)
        var smtp = await appConfigService.getSMTPConfig()
        var template = await appConfigService.getEmailTemplateList(1)
        var FirstName = data.firstName
        var LastName = data.lastName
        var year = new Date().getFullYear()
        var temp = await common.multipleStringReplace(template.data, [
          { substr: '*username*', to: FirstName + LastName }, { substr: '*year*', to: year }])
        mailer.MailerNew(smtp.data, req.email, 'Welcome', temp)
        if (!userId.error) {
          walletService.createWalletService(userId.data.Id, 'user', 0)
        }
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.recallOTP = async (req, callback) => {
    var response = {}
    var mobile = req.mobile
    var ext = req.countryCode
    // var otpResendMobile = await common.sendOtpMobile(mobile, ext)
    var otpResendMobile = false
    if (otpResendMobile) {
      response.error = true
      response.msg = 'OTP_FAIL'
    } else {
      response.error = false
      response.msg = 'OTP_SENT'
    }
    callback(response)
  }

  this.otpValidate = async (req, callback) => {
    var response = {}
    var data = req
    // var otpVerifynumber = await this.otpVerify(data.mobile, data.countryCode, data.otp)
    // if (otpVerifynumber.error) {
    //   response.error = true
    //   response.msg = 'OTP_VERIFY'
    //   callback(response)
    // } else {
    userService.verifyOTP(data, (result) => {
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
    // }
  }

  this.pwdValidate = (req, callback) => {
    var response = {}
    var data = req

    userService.verifyPwd(data, (result) => {
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

  this.forgotPwdOtp = (req, callback) => {
    var response = {}
    var data = req
    userService.generateForgotOtp(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.UpdatePwd = (req, callback) => {
    var response = {}
    var data = req
    userService.resetPwd(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.getNearestProviderLocationForUser = (lat, lon, callback) => {
    var response = {}
    var data = {}
    data.lat = lat
    data.lon = lon
    trackingService.fetchProivderLocation(data, (result) => {
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

  this.viewUserProfile = (req, callback) => {
    var data = req
    var response = {}
    userService.getUserDetails(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }

  this.userProfileUpdate = (req, callback) => {
    var response = {}
    var data = req
    userService.updateUserProfile(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.userFileUploadCtrl = (req, callback) => {
    var response = {}
    var data = req
    userService.userFileUploadService(data, (result) => {
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

  this.userDeviceUpdateCtrl = (req, callback) => {
    var response = {}
    var data = req
    userService.userDeviceUpdateService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.userCancelPolicyList = (req, callback) => {
    var response = {}
    userService.getuserCancelPolicyList((result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }
  this.userStaticPageList = (req, callback) => {
    var data = req
    var response = {}
    userService.getUserStaticPageList(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }

  this.getUserActiveBookingCtrl = async (req, callback) => {
    var response = {}
    var providerInfo
    try {
      var data = req
      var userId = data.auth.Id
      var user = await userService.getUserRating(userId)
      var bookingInfo = await bookingService.getUserActiveBooking(userId)
      var feedback = await bookingService.getUserBookingFeedback(userId)
      if (!bookingInfo.error) {
        var rideId = bookingInfo.data.rideId
        delete bookingInfo.data.rideId
        if (bookingInfo.data.providerId) {
          providerInfo = await providerService.getProviderInfo(bookingInfo.data.providerId)
          if (providerInfo.error) {
            bookingInfo.data.providerInfo = null
          } else {
            bookingInfo.data.providerInfo = providerInfo.data
          }
        } else {
          bookingInfo.data.providerInfo = null
        }
        if (bookingInfo.data.status === 'completed') {
          var rideInfo = await bookingService.getRideTypeDetailService(rideId)
          if (!rideInfo.error && !feedback.error) {
            bookingInfo.data.rideName = rideInfo.data.rideName
            bookingInfo.data.rideImage = rideInfo.data.rideImage
          }
          delete bookingInfo.data.providerId
          response.error = true
          response.msg = 'NO_BOOKING'
          response.data = bookingInfo.data
        } else {
          delete bookingInfo.data.providerId
          response.error = false
          response.msg = bookingInfo.msg
          response.data = bookingInfo.data
        }
      } else {
        response.error = true
        response.msg = 'NO_BOOKING'
        response.data = {}
      }
      if (!user.error) {
        response.data['rating'] = user.data.rating
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.cancelUserBooking = async (req, callback) => {
    var response = {}
    try {
      var booking = {}
      var providerId
      booking.Id = req.bookingNo
      var bookingInfo = await bookingService.getBookingInfo(booking)
      if (bookingInfo.error) {
        providerId = null
      } else {
        providerId = bookingInfo.data[0].ProviderId
      }
      booking.CancelledFor = req.reason
      booking.CancelledBy = 'user'
      booking.Status = 'cancelled'
      booking.UserId = req.auth.Id
      booking.IsActive = 'no'
      var cancel = await bookingService.bookingCancellation(booking)
      if (cancel.error) {
        response.error = true
        response.msg = cancel.msg
      } else {
        var content = {}
        content.title = 'Customer cancelled the booking'
        content.body = req.reason
        content.data = 'booking_cancelled'
        var deviceInfo = await providerService.getProviderDeviceToken(providerId)
        if (!deviceInfo.error) {
          var providerUnblock = 'active'
          providerService.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          pushNotification.sendPushNotificationByDeviceType(deviceInfo.data, content)
        }
        response.error = false
        response.msg = cancel.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getUserLocationCellId = async (latitude, longitude, callback) => {
    var response = {}
    try {
      var cellId = await common.getCellIdFromCoordinates(latitude, longitude)
      if (cellId.error) {
        response.error = true
        response.msg = 'INVALID: $[1],latitude and longitude'
      } else {
        var data = cellId.id
        response.error = false
        response.data = data
        response.msg = 'LOCATION_ID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.userBookingFeedback = async (req, callback) => {
    var response = {}
    try {
      var data = req
      var condition = {}
      const userId = req.auth.Id
      var action = req.action
      condition.UserId = userId
      condition.Id = data.bookingNo
      condition.Status = 'completed'

      var bookingInfo = await bookingService.getBookingInfo(condition)
      if (bookingInfo.error) {
        response.error = true
        response.msg = bookingInfo.msg
        callback(response)
      } else {
        if (action === 'skipped') {
          response.error = false
          response.msg = 'VALID'
          bookingService.updateUserBookingFeedback(data.bookingNo, userId, action)
          callback(response)
        } else {
          var booking = bookingInfo.data[0]
          var userRating = {}
          userRating.BookingId = booking.Id
          userRating.UserId = booking.UserId
          userRating.ProviderId = booking.ProviderId
          userRating.Rating = data.rating
          userRating.Comments = data.comments
          userRating.ReviewedBy = 'user'
          ratingService.providerRating(userRating, async (result) => {
            if (result.error) {
              response.error = true
              response.msg = result.msg
            } else {
              var rating = await ratingService.getProviderAverageRating(booking.ProviderId)
              if (!rating.error) {
                providerService.providerRatingUpdate(booking.ProviderId, rating.data.Rating)
              }
              response.error = false
              response.msg = result.msg
            }
            bookingService.updateUserBookingFeedback(data.bookingNo, userId, action)
            callback(response)
          })
        }
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getTripHistory = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var booking = await bookingService.getUserBookingHistory(userId)
      if (booking.error) {
        response.error = true
        response.msg = booking.msg
      } else {
        response.error = false
        response.msg = booking.msg
        response.data = booking.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getTripDetails = async (req, callback) => {
    var response = {}
    try {
      var condition = {}
      condition.Id = req.bookingNo
      condition.UserId = req.auth.Id
      var booking = await bookingService.getBookingInfo(condition)
      if (booking.error) {
        response.error = true
        response.msg = booking.msg
      } else {
        var bookingInfo = booking.data[0]
        var data = {}
        var receipt = []
        data['id'] = bookingInfo.Id
        data['orderRefferenceID'] = bookingInfo.Type !== 'delivery' ? 'ORDER No. #' + bookingInfo.Id : bookingInfo.orderReferenceId
        data['createdTime'] = bookingInfo.CreateAt
        data['fromLocation'] = bookingInfo.FromLocation
        data['toLocation'] = bookingInfo.ToLocation
        data['sourceLat'] = bookingInfo.SourceLat
        data['sourceLong'] = bookingInfo.SourceLong
        data['destinyLat'] = bookingInfo.DestinyLat
        data['destinyLong'] = bookingInfo.DestinyLong
        data['status'] = bookingInfo.Status
        data['totalAmt'] = (bookingInfo.CurrencyType + bookingInfo.TotalAmount).toString()
        data['paymentMode'] = bookingInfo.PaymentMode
        data['type'] = bookingInfo.Type
        data['vehicleName'] = bookingInfo.VehicleName === null ? 'Food Devliery' : bookingInfo.VehicleName
        data['isActive'] = bookingInfo.IsActive
        if (bookingInfo.Type === 'taxi') {
          receipt.push({ fieldName: 'Tax', value: bookingInfo.Tax })
          receipt.push({ fieldName: 'Fare', value: String(bookingInfo.Estimation) })
          receipt.push({ fieldName: 'Sub Total', value: String(Number(bookingInfo.Estimation) + Number(bookingInfo.Tax)) })
          receipt.push({ fieldName: 'Total Amount', value: bookingInfo.CurrencyType + ' ' + bookingInfo.TotalAmount })
        } else if (bookingInfo.Type === 'delivery') {
          data['description'] = bookingInfo.Description
          data['orderId'] = bookingInfo.Id
          data['outletName'] = bookingInfo.OutletName
          var dishList = await bookingService.getBookingDishes(req.bookingNo)
          data['dishes'] = dishList.error ? [] : dishList.data.map(element => { element.displayPrice = bookingInfo.CurrencyType + element.dishTotal; return element })
          receipt.push({ fieldName: 'Tax', value: bookingInfo.Tax })
          receipt.push({ fieldName: 'Fare', value: String(bookingInfo.Estimation) })
          receipt.push({ fieldName: 'Sub Total', value: String(Number(bookingInfo.Estimation) + Number(bookingInfo.Tax)) })
          receipt.push({ fieldName: 'Total Amount', value: bookingInfo.CurrencyType + ' ' + bookingInfo.TotalAmount })
        } else if (bookingInfo.Type === 'services') {
          data['categoryName'] = 'Test'
          data['timeSlot'] = bookingInfo.ServiceTimeSlot
          data['bookingDate'] = bookingInfo.BookingTimestamp
          data['serviceStartImage'] = bookingInfo.ServiceStartImage
          data['serviceEndImage'] = bookingInfo.ServiceEndImage
          var serviceList = await bookingService.getServiceInfo(bookingInfo.ServiceIds)
          data['serviceList'] = serviceList.error ? [] : serviceList.data
          var addonsList = await bookingService.getAddonsInfo(bookingInfo.ServiceAddons)
          data['serviceAddonsList'] = addonsList.error ? [] : addonsList.data
          receipt.push({ fieldName: 'Tax', value: bookingInfo.Tax })
          receipt.push({ fieldName: 'Fare', value: String(bookingInfo.TotalAmount) })
          receipt.push({ fieldName: 'Total Amount', value: bookingInfo.CurrencyType + ' ' + bookingInfo.TotalAmount })
        }
        data['receipt'] = receipt
        var bookingDetails = data
        var provider = await providerService.getProviderInfo(booking.data[0].ProviderId)
        if (provider.error) {
          bookingDetails.providerInfo = null
        } else {
          var providerInfo = {}
          providerInfo['name'] = provider.data.firstName + ' ' + provider.data.lastName
          providerInfo['image'] = provider.data.image
          providerInfo['rating'] = provider.data.rating
          providerInfo['mobile'] = provider.data.countryCode + provider.data.mobile
          bookingDetails.providerInfo = providerInfo
        }
        response.error = false
        response.msg = 'VALID'
        response.data = bookingDetails
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getUserWalletInfoCtrl = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var type = 'user'
      var walletInfo = await walletService.getWalletInfoService(userId, type)
      if (walletInfo.error) {
        response.error = true
        response.msg = walletInfo.msg
      } else {
        var transact = {}
        transact.userType = 'user'
        transact.userId = userId

        var data = {}
        data.balanceTxt = '$ ' + walletInfo.data
        data.balance = walletInfo.data

        var transaction = await transactionServices.getTransactionList(transact)
        if (transaction.error) {
          data.transaction = []
        } else {
          data.transaction = transaction.data
        }
        response.error = false
        response.data = data
        response.msg = walletInfo.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.generateEphemeralKeysCtrl = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var email = req.auth.Email
      var ephemeralKeyInfo = await userService.generateEphemeralKeysService(userId)
      if (ephemeralKeyInfo.error) {
        response.error = true
        response.msg = 'NO_DATA'
      } else {
        var stripeData = {}
        if (ephemeralKeyInfo.data.stripeCustomerId === null) {
          stripeData = {}
          var striperes = await paymentHelperService.createPaymentCustomerId(email)
          var stripeCustomerId = striperes.data.id
          stripeData.StripeCustomerID = stripeCustomerId
          await userService.updateUserStripeCustomerID(stripeData, userId)
        }
        stripeData = {
          customerID: ephemeralKeyInfo.data.stripeCustomerId === null ? stripeCustomerId : ephemeralKeyInfo.data.stripeCustomerId,
          stripe_version: req.stripe_version
        }
        var createEphemeral = await paymentHelperService.createPaymentEphemerralKey(stripeData)
        response.error = false
        response.data = createEphemeral
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.customerPaymentChargeCtrl = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var type = 'user'
      var cardid = req.cardid
      var amount = req.amount
      var paymentcharge = await userService.customerPaymentChargeService(userId, type)
      if (paymentcharge.error) {
        response.error = true
        response.msg = paymentcharge.msg
      } else {
        var customerID = paymentcharge.data.stripeCustomerId
        var email = paymentcharge.data.email
        var stripecharge = await paymentHelperService.stripePaymentCharge(amount, customerID, cardid, email)
        if (stripecharge.error === false) {
          response.error = false
          response.data = paymentcharge.data
          response.msg = 'STRIPE_PAYMENT_SUCCESS'
        } else {
          response.error = true
          response.msg = 'STRIPE_PAYMENT_ERROR'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.usersSocialTokenchecksCtrl = (data, callback) => {
    var response = {}
    userService.usersSocialTokenchecksService(data, (result) => {
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

  this.usersUpdateWalletCtrl = async (req, callback) => {
    var response = {}
    try {
      var transact = {}
      var sendwallet = {}
      var userId = req.auth.Id
      var userType = 'user'
      var cardid = req.cardid
      var amount = req.amount
      var paymentcharge = await userService.customerPaymentChargeService(userId, userType)
      if (paymentcharge.error) {
        response.error = true
        response.msg = paymentcharge.msg
      } else {
        transact.userType = userType
        transact.userId = userId
        transact.amount = amount
        transact.type = 'credit'
        transact.description = 'Wallet recharged'
        var tnx = await transactionServices.createTransaction(transact)
        var customerID = paymentcharge.data.stripeCustomerId
        var email = paymentcharge.data.email
        var stripecharge = await paymentHelperService.stripePaymentCharge(amount, customerID, cardid, email)
        if (stripecharge.error === false) {
          sendwallet.userId = userId
          sendwallet.userType = userType
          sendwallet.amount = amount
          var paymentwallet = await walletService.creditWalletService(sendwallet)
          if (paymentwallet.error === false) {
            if (!tnx.error) {
              var transactId = {}
              transactId.transactId = tnx.data
              transactId.status = 'success'
              transactionServices.editTransaction(transactId)
            }
            response.error = false
            response.data = paymentcharge.data
            response.msg = paymentwallet.msg
          } else {
            response.error = true
            response.msg = paymentwallet.msg
          }
        } else {
          response.error = true
          response.msg = 'STRIPE_PAYMENT_ERROR'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.usersStripeCreateCardsCtrl = async (req, callback) => {
    var response = {}
    var userId = req.auth.Id
    var type = 'user'
    var source = req.source
    var paymentuser = await userService.customerPaymentChargeService(userId, type)
    if (paymentuser.error) {
      response.error = true
      response.msg = paymentuser.msg
    } else {
      var customerID = paymentuser.data.stripeCustomerId
      var carddetails = await paymentHelperService.usersStripeCreateCards(customerID, source)
      if (carddetails.error) {
        response.error = true
        response.msg = 'STRIPE_CARD_ERROR'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = carddetails.data
      }
    }
    callback(response)
  }
  this.usersStripeCardListsCtrl = async (req, callback) => {
    var response = {}
    var userId = req.auth.Id
    var email = req.auth.Email
    var type = 'user'
    var paymentCharge = await userService.customerPaymentChargeService(userId, type)
    if (paymentCharge.error || paymentCharge.data.stripeCustomerId === null) {
      response.error = true
      response.msg = 'NO_CARDS_FOUND'
      if (paymentCharge.data.stripeCustomerId === null) {
        var stripeData = {}
        var striperes = await paymentHelperService.createPaymentCustomerId(email)
        var stripeCustomerId = striperes.data.id
        stripeData.StripeCustomerID = stripeCustomerId
        await userService.updateUserStripeCustomerID(stripeData, userId)
      }
      callback(response)
    } else {
      try {
        var customerID = paymentCharge.data.stripeCustomerId
        var cardDetails = await paymentHelperService.getStripeCardLists(customerID)
        if (cardDetails.error) {
          response.error = true
          response.msg = 'FAILED'
        } else {
          if (cardDetails.data.data.length <= 0) {
            response.error = true
            response.msg = 'NO_CARDS_FOUND'
          } else {
            response.error = false
            response.msg = 'VALID'
            response.data = cardDetails.data.data
          }
        }
        callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'FAILED'
        callback(err)
      }
    }
  }
  this.usersStripeRemoveCardCtrl = async (req, callback) => {
    var response = {}
    var userId = req.auth.Id
    var type = 'user'
    var cardid = req.source
    var paymentcharge = await userService.customerPaymentChargeService(userId, type)
    if (paymentcharge.error) {
      response.error = true
      response.msg = paymentcharge.msg
    } else {
      var customerID = paymentcharge.data.stripeCustomerId
      var carddetails = await paymentHelperService.stripeCardRemove(customerID, cardid)
      if (carddetails.error) {
        response.error = true
        response.msg = 'NO_CARDID_FOUND'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = carddetails.data
      }
    }
    callback(response)
  }
  this.userUpdateLanguageCtrl = async (req, callback) => {
    var response = {}
    userService.userUpdateLanguageService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.getOrderTabCtrl = async (callback) => {
    var response = {}
    try {
      var data = { UserType: 'user' }
      var tabList = await bookingService.getOrderTabService(data)
      if (tabList.error) {
        response.error = true
        response.msg = tabList.msg
      } else {
        response.error = false
        response.msg = tabList.msg
        response.data = tabList.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getOrderListingCtrl = async (req, callback) => {
    var response = {}
    try {
      req.userType = 'user'
      var tabList = await bookingService.getOrderListingService(req)
      if (tabList.error) {
        response.error = true
        response.msg = tabList.msg
      } else {
        response.error = false
        response.msg = tabList.msg
        response.data = tabList.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.createSerivceRequestCtrl = async (req, callback) => {
    var response = {}
    try {
      var createBooking = await bookingService.createSerivceRequestService(req)
      if (createBooking.error) {
        response.error = true
        response.msg = createBooking.msg
      } else {
        var content = {}
        content.data = 'incoming_booking'
        content.title = 'Booking Alert'
        content.body = 'You have new booking request'
        if (req.providerId) {
          var providerInfo = await providerService.getProivderMessageToken(req.providerId)
          pushNotification.sendPushNotificationByDeviceType(providerInfo.data, content)
        } else {
          var availableProvider = await providerService.getServiceProviderBasedOnDistance(req)
          if (availableProvider.error === false) {
            var bookingId = createBooking.data.bookingNo
            var deviceToken = await providerService.getProviderDeviceTokensById(availableProvider.data)
            if (!deviceToken.error) deviceToken.data.map((element) => pushNotification.sendPushNotificationByDeviceType(element, content, 'default'))
            bookingService.updateServiceBookingInfo(bookingId, availableProvider.data)
          }
        }
        response.error = false
        response.msg = createBooking.msg
        response.data = createBooking.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderListByServiceCtrl = async (req, callback) => {
    var response = {}
    try {
      var data
      if (req.categoryId) {
        data = { CategoryId: req.categoryId }
      } else {
        data = { SubCategoryId: req.subCategoryId }
      }
      var page = req.page
      providerService.getProviderListByService(data, page, (result) => {
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
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderProfileViewCtrl = async (req, callback) => {
    var response = {}
    try {
      var providerId = req.providerId
      providerService.getProviderProfileViewService(providerId, (result) => {
        if (result.error) {
          response.error = true
          response.msg = result.msg
        } else {
          response.error = false
          response.msg = result.msg
          response.data = {}
          response.data = { providerInfo: result.data, review: [] }
        }
        callback(response)
      })
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getBookingTimeSlots = async (callback) => {
    var response = {}
    try {
      providerService.getProviderTimeSlotService(null, (result) => {
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
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getServiceAddonsCtrl = async (req, callback) => {
    var response = {}
    try {
      var data
      if (req.categoryId) {
        data = { CategoryId: req.categoryId }
      } else if (req.subCategoryId) {
        data = { SubCategoryId: req.subCategoryId }
      }
      var addOns = await bookingService.getServiceAddons(data)
      if (addOns.error) {
        response.error = true
        response.msg = addOns.msg
      } else {
        response.error = false
        response.msg = addOns.msg
        response.data = addOns.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
