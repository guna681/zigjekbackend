module.exports = function () {
  const TrackingService = require('../services/TrackingService')
  const AppConfigService = require('../services/AppConfigService')
  const ProviderService = require('../services/ProviderService')
  const BookingService = require('../services/BookingService')
  const WalletService = require('../services/WalletService')
  const TransactionServices = require('../services/TransactionServices')
  const ProviderVehicleService = require('../services/ProviderVehicleService')
  const PushNotification = require('../thirdParty/pushNotification')
  const Common = require('../Utils/common')
  const UserService = require('../services/UserService')
  const RatingService = require('../services/RatingServices')
  const PaymentHelper = require('../thirdParty/paymentHelper')

  var paymentHelper = new PaymentHelper()
  var ratingService = new RatingService()
  var pushNotification = new PushNotification()
  var appConfigService = new AppConfigService()
  var trackingService = new TrackingService()
  var providerService = new ProviderService()
  var bookingService = new BookingService()
  var walletService = new WalletService()
  var transactionServices = new TransactionServices()
  var providerVehicleService = new ProviderVehicleService()
  var common = new Common()
  var userService = new UserService()

  this.providerAppSetting = (callback) => {
    var response = {}
    var type = 'provider'
    appConfigService.appConfig(type, (result) => {
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

  this.getNearestProviderLocation = (lat, lon, callback) => {
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

  this.providerMobileValidation = (req, callback) => {
    var response = {}
    var name = 'provider'
    providerService.checkProviderExsist(req, async (result) => {
      var authtyperesult = await appConfigService.authTypeChecking(name)
      if (result.error) {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            // this.sendOtpMobile(req.number, req.ext)
            response.error = true
            response.msg = result.msg
          } else {
            response.error = true
            response.msg = result.msg
          }
        }
      } else {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            // this.sendOtpMobile(req.number, req.ext)
            response.error = false
            response.msg = result.msg
            response.data = result.data
          } else {
            response.error = false
            response.msg = result.msg
            response.data = result.data
          }
        }
      }
      callback(response)
    })
  }

  this.providerOtpValidation = async (req, callback) => {
    var response = {}
    var data = req
    // var otpVerifynumber = await this.otpVerify(data.mobile, data.countryCode, data.otp)
    // if (otpVerifynumber.error) {
    //   response.error = true
    //   response.msg = 'OTP_VERIFY'
    // } else {
    providerService.providerOtpVerify(data, (result) => {
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

  this.providerOtpRecall = async (req, callback) => {
    var response = {}
    var data = req
    // var otpResendMobile = await this.sendOtpMobile(data.mobile, data.countryCode)
    var otpResendMobile = false
    if (otpResendMobile.error) {
      response.error = true
      response.msg = 'OTP_FAIL'
    } else {
      response.error = false
      response.msg = 'OTP_SENT'
    }
    callback(response)
  }

  this.registerProvider = (req, callback) => {
    var response = {}
    var data = req
    providerService.createProvider(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var providerId = await common.getPayloadFromToken(result.data.token, process.env.JWT_SECRET)
        // providerVehicleService.addProviderVehicleService(providerId, () => {})
        if (!providerId.error) {
          walletService.createWalletService(providerId.data.Id, 'provider', 0)
        }
        // var striperes = await this.stripeCreateProviderAccounts(req.email)
        // var stripeaccountid = striperes.data
        // await this.updateProviderStripeAccountID(stripeaccountid, providerId.data.Id)
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.providerPwdValidator = (req, callback) => {
    var response = {}
    var data = req

    providerService.providerPwdVerify(data, (result) => {
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

  this.providerForgotPwdOtp = (req, callback) => {
    var response = {}
    var data = req
    providerService.providerForgotOtp(data, (result) => {
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

  this.updateProviderPwd = (req, callback) => {
    var response = {}
    var data = req
    providerService.resetProviderPwd(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    })
  }

  this.updateProviderLocationCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerService.providerLocationUpdateService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = 'NOTEXIST: $[1],Provider Id'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    })
  }

  this.getSimulatedProviderLocation = (lat, lon, callback) => {
    var response = {}
    var data = {}
    data.lat = lat
    data.lon = lon
    trackingService.getRandProviderLocation(data, (result) => {
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

  this.providerDeviceUpdateCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerService.providerDeviceUpdateService(data, (result) => {
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

  this.viewProviderProfile = (req, callback) => {
    var data = req
    var response = {}
    providerService.getProviderDetails(data, (result) => {
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

  this.providerProfileUpdate = (req, callback) => {
    var response = {}
    var data = req
    providerService.updateProviderProfile(data, (result) => {
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

  this.providerFileUploadCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerService.providerFileUploadService(data, (result) => {
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

  this.providerStatusToggle = async (req, callback) => {
    var response = {}
    var data = req
    var providerId = req.auth.Id
    var providerStatus = await providerService.getProviderApprovalStatus(providerId)
    var activeVehicle = providerStatus.error ? providerStatus : await providerVehicleService.getProivderActiveVehicleDetails(providerId)
    if (activeVehicle.error) {
      response.error = true
      response.msg = activeVehicle.msg
      callback(response)
    } else {
      var rideSharingStatus = activeVehicle.error === false ? await bookingService.isRideSharingEnabled(activeVehicle.data.serviceIds) : { error: true }
      var rideTypeIds = activeVehicle.error === false ? activeVehicle.data.serviceIds : '[]'
      providerService.providerStatusUpdate(data, rideSharingStatus, rideTypeIds, (result) => {
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

  this.providerDashboardCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerService.providerDashboardService(data, async (result) => {
      try {
        var providerId = data.auth.Id
        if (result.error) {
          response.error = true
          response.msg = result.msg
        } else {
          var earning = {}
          earning = result.data
          var activeVehicle = await providerVehicleService.getProivderActiveVehicleDetails(providerId)
          if (activeVehicle.error) {
            earning.activeVehicle = null
          } else {
            earning.activeVehicle = activeVehicle.data
          }
          var statistic = await bookingService.getProviderBookingStatics(providerId)
          var totalEarnings = await walletService.getWalletInfoService(providerId, 'provider')
          earning.totalEarnings = totalEarnings.error === true ? 0 : '$ ' + totalEarnings.data
          if (statistic.error) {
            earning.earnings = result.data.earnings
          } else {
            earning.earnings = statistic.data
          }
          response.error = false
          response.msg = result.msg
          response.data = earning
        }
        callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    })
  }

  this.providerEarning = async (req, callback) => {
    var response = {}
    var providerId = req.auth.Id
    var duration = req.duration
    bookingService.getProviderEarnings(providerId, duration, (result) => {
      if (result.error) {
        response.error = true
        response.msg = 'NO_EARNING'
        response.data = result.data
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = result.data
      }
      callback(response)
    })
  }

  this.providerDocumentListingCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerService.providerDocumentListingService(data, (result) => {
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

  this.updateProivderLocationSimulation = (req, callback) => {
    trackingService.automation(() => { })
  }

  this.providerCancelPolicyList = (req, callback) => {
    var data = req
    var response = {}
    providerService.getproviderCancelPolicyList(data, (result) => {
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

  this.cancelProviderBooking = async (req, callback) => {
    var response = {}
    try {
      var booking = {}
      var deviceId
      booking.Id = req.bookingNo
      var bookingInfo = await bookingService.getBookingInfo(booking)
      if (bookingInfo.error) {
        deviceId = null
      } else {
        deviceId = bookingInfo.data[0].UserDeviceId
      }
      booking.CancelledFor = req.reason
      booking.CancelledBy = 'provider'
      booking.Status = 'cancelled'
      booking.ProviderId = req.auth.Id
      var cancel = await bookingService.bookingCancellation(booking)
      if (cancel.error) {
        response.error = true
        response.msg = cancel.msg
      } else {
        var content = {}
        content.title = 'Booking Cancelled by provider'
        content.body = req.reason
        content.data = 'booking_cancelled'
        var userInfo = await userService.getUserDeviceToken(deviceId)
        if (!userInfo.error) {
          pushNotification.sendPushNotificationByDeviceType(userInfo.data, content)
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

  this.providerStaticPageList = (req, callback) => {
    var data = req
    var response = {}
    providerService.getProviderStaticPageList(data, (result) => {
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

  this.providerBookingFeedback = async (req, callback) => {
    var data = req
    var response = {}
    var condition = {}
    try {
      const providerId = req.auth.Id
      condition.ProviderId = providerId
      condition.Id = data.bookingNo
      condition.Status = 'completed'

      var bookingInfo = await bookingService.getBookingInfo(condition)
      if (bookingInfo.error) {
        response.error = true
        response.msg = bookingInfo.msg
        callback(response)
      } else {
        var booking = bookingInfo.data[0]
        var userRating = {}
        userRating.BookingId = booking.Id
        userRating.UserId = booking.UserId
        userRating.ProviderId = booking.ProviderId
        userRating.Rating = data.rating
        userRating.Comments = data.comments
        userRating.ReviewedBy = 'provider'
        ratingService.userRating(userRating, async (result) => {
          if (result.error) {
            response.error = true
            response.msg = result.msg
          } else {
            var rating = await ratingService.getUserAverageRating(booking.UserId)
            if (!rating.error) {
              userService.userRatingUpdate(booking.UserId, rating.data.Rating)
            }
            response.error = false
            response.msg = result.msg
          }
          callback(response)
        })
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderSerivceTypeCtrl = (req, callback) => {
    var response = {}
    var data = req
    bookingService.getProviderSerivceTypeService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = result.data
      }
      callback(response)
    })
  }

  this.addProviderVehicleCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerVehicleService.addProviderVehicleService(data, (result) => {
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

  this.getProviderVehicleListCtrl = (req, callback) => {
    var response = {}
    var providerId = req.auth.Id
    providerVehicleService.getProviderVehicleListService(providerId, (result) => {
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

  this.getProviderVehicleDetailsCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerVehicleService.getProviderVehicleDetailsService(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var details = result.data
        var vehicleList = await bookingService.getProviderSelectedServiceList(details.RideVehicleTypeId)
        if (!vehicleList.error) {
          delete details.RideVehicleTypeId
          details['serviceType'] = vehicleList.data
        } else {
          delete details.RideVehicleTypeId
          details['serviceType'] = []
        }
        response.error = false
        response.msg = result.msg
        response.data = details
      }
      callback(response)
    })
  }

  this.editProviderVehicleCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerVehicleService.editProviderVehicleSerivce(data, (result) => {
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

  this.providerDocumentUpdateCtrl = (req, callback) => {
    var response = {}
    var data = req
    providerService.providerDocumentUpdateService(data, (result) => {
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

  this.getProviderWalletInfoCtrl = async (req, callback) => {
    var response = {}
    try {
      var providerId = req.auth.Id
      var type = 'provider'
      var walletInfo = await walletService.getWalletInfoService(providerId, type)
      if (walletInfo.error) {
        response.error = true
        response.msg = walletInfo.msg
      } else {
        var transact = {}
        transact.userType = 'provider'
        transact.userId = providerId

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
  this.providersSocialTokenchecksCtrl = (data, callback) => {
    var response = {}
    providerService.providersSocialTokenchecksService(data, (result) => {
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
  this.stipeProviderAccountCtrl = async (req, callback) => {
    var response = {}
    var data = req
    var stripeaccount = await paymentHelper.stripeCreateProviderAccounts(data.email)
    if (stripeaccount.error) {
      response.error = true
      response.msg = 'STRIPE_AC_ERROR'
    } else {
      response.error = false
      response.msg = 'STRIPE_AC'
      response.data = {
        stripeaccountid: stripeaccount.data }
    }
    callback(response)
  }
  this.providerPaymentChargeCtrl = async (req, callback) => {
    var response = {}
    try {
      var providerId = req.auth.Id
      var cardid = req.cardid
      var amount = req.amount
      var paymentcharge = await providerService.getProivderPaymentCharge(providerId)
      if (paymentcharge.error) {
        response.error = true
        response.msg = paymentcharge.msg
      } else {
        var stripeAccountID = paymentcharge.data.StripeAccountID
        var email = paymentcharge.data.Email
        paymentHelper.stripePaymentCharge(amount, stripeAccountID, cardid, email)
        response.error = false
        response.data = paymentcharge.data
        response.msg = paymentcharge.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.providerUpdateLanguageCtrl = async (req, callback) => {
    var response = {}
    providerService.providerUpdateLanguageService(req, (result) => {
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

  this.providerWithdrawalRequest = async (req, callback) => {
    var response = {}
    providerService.createWithDrawalRequest(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var data = {}
        data.userType = 'provider'
        data.userId = req.auth.Id
        data.description = 'Withdrawal Request'
        data.type = 'debit'
        data.amount = req.amount
        data.status = 'pending'
        data.withdrawalId = result.data
        transactionServices.createTransaction(data)
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.getProviderBookingStacksCtrl = async (req, callback) => {
    var response = {}
    var data = req
    providerService.getProviderBookingStacksService(data, (result) => {
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

  this.updateProviderFinancialInfoCtrl = async (req, callback) => {
    var response = {}
    var data = req
    providerService.createProviderPaymentService(data, (result) => {
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

  this.viewFinancialInfoCtrl = async (req, callback) => {
    var response = {}
    var data = req
    providerService.viewFinancialInfoService(data, (result) => {
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

  this.updateProviderAddressCtrl = async (req, callback) => {
    var response = {}
    var data = req
    providerService.createProviderAddressService(data, (result) => {
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

  this.viewAddressCtrl = async (req, callback) => {
    var response = {}
    var data = req
    providerService.viewddresService(data, (result) => {
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

  this.getProviderTimeSlotCtrl = async (data, callback) => {
    var response = {}
    var providerId = data.auth.Id
    providerService.getProviderTimeSlotService(providerId, (result) => {
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

  this.updateProviderTimeSlotCtrl = async (data, callback) => {
    var response = {}
    providerService.updateProviderTimeSlotService(data, (result) => {
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

  this.getCategoryListingCtrl = async (callback) => {
    var response = {}
    providerService.getCategoryListingService((result) => {
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

  this.getSubCategoryListingCtrl = async (data, callback) => {
    var response = {}
    providerService.getSubCategoryListingService(data, (result) => {
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

  this.updateProviderServiceCategoryCtrl = async (data, callback) => {
    var response = {}
    providerService.updateProviderServiceCategoryService(data, (result) => {
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

  this.updateServiceCategoryCtrl = async (data, callback) => {
    var response = {}
    providerService.updateServiceCategoryService(data, (result) => {
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

  this.myServiceListingCtrl = async (data, callback) => {
    var response = {}
    providerService.myServiceListingService(data, (result) => {
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

  this.deleteServiceCateogryCtrl = async (data, callback) => {
    var response = {}
    providerService.deleteServiceCateogryService(data, (result) => {
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

  this.checkPendingInfoCtrl = async (data, callback) => {
    var response = {}
    providerService.checkPendingInfoService(data, (result) => {
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

  this.getTripHistory = async (req, callback) => {
    var response = {}
    try {
      var providerId = req.auth.Id
      var booking = await bookingService.getProviderBookingHistory(providerId)
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
      condition.ProviderId = req.auth.Id
      var booking = await bookingService.getBookingInfo(condition)
      if (booking.error) {
        response.error = true
        response.msg = booking.msg
      } else {
        var bookingInfo = booking.data[0]
        var data = {}
        var receipt = []
        data['id'] = bookingInfo.Id
        data['orderRefferenceID'] = 'ORDER No. #' + bookingInfo.Id
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
        var user = await userService.getUserBookingInfo(booking.data[0].UserId)
        if (user.error) {
          bookingDetails.providerInfo = null
        } else {
          var userInfo = {}
          userInfo['name'] = user.data.firstName + ' ' + user.data.lastName
          userInfo['image'] = user.data.image
          userInfo['rating'] = user.data.rating
          userInfo['mobile'] = user.data.countryCode + user.data.mobile
          bookingDetails.userInfo = userInfo
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

  this.getOrderTabCtrl = async (req, callback) => {
    var response = {}
    try {
      var data = { UserType: 'provider', Key: req.auth.Type }
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
      req.userType = 'provider'
      var orderList = await bookingService.getOrderListingService(req)
      if (orderList.error) {
        response.error = true
        response.msg = orderList.msg
      } else {
        response.error = false
        response.msg = orderList.msg
        response.data = orderList.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.logoutCtrl = async (req, callback) => {
    var response = {}
    try {
      var orderList = await providerService.resetProviderInfo(req)
      if (orderList.error) {
        response.error = true
        response.msg = orderList.msg
      } else {
        response.error = false
        response.msg = orderList.msg
        response.data = orderList.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.serviceImageUpdateCtrl = async (req, callback) => {
    var response = {}
    try {
      var orderList = await bookingService.serviceImageUpdateService(req)
      if (orderList.error) {
        response.error = true
        response.msg = orderList.msg
      } else {
        response.error = false
        response.msg = orderList.msg
        response.data = orderList.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
