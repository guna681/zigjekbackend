module.exports = function (server, validator) {
  const basePath = '/api/users/'
  const UserController = require('../controller/UserController.js')
  const PromoCodesCtrl = require('../controller/PromoCodesCtrl.js')
  const PeekChargesCtrl = require('../controller/PeekChargesController.js')
  const SerivceCtrl = require('../controller/ServiceController.js')
  const ErrorController = require('../Utils/error.js')

  var userController = new UserController()
  var errorController = new ErrorController()
  var promoCodesCtrl = new PromoCodesCtrl()
  var peekChargesCtrl = new PeekChargesCtrl()
  var serviceCtrl = new SerivceCtrl()

  server.get(basePath + 'config', (request, response) => {
    userController.appSetting((result) => {
      const lang = request.headers.lang
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'check', [
    validator.check('mobile').isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,6,15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 1, max: 5 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],Country Code, 1, 5')
      .isNumeric().withMessage('NUMERIC: $[1], mobile')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      var mobile = {}
      mobile.number = body.mobile
      mobile.ext = body.countryCode
      userController.mobileValidation(mobile, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'signup', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,6,15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 1, max: 5 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],Country Code,1,5'),
    validator.check('email')
      .isEmail().withMessage('INVALID: $[1], email Id'),
    validator.check('firstName')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],firstname,1,50'),
    validator.check('lastName')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],lastname,1,50'),
    validator.check('countryId')
      .isLength({ min: 1, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryId,1,5'),
    validator.check('loginType').optional()
      .isIn(['manual', 'google', 'facebook', 'apple']).withMessage('INVALID: $[1],loginType'),
    validator.check('image')
      .isURL().withMessage('INVALID: $[1], Image URL')
      .optional(),
    validator.check('socialToken')
      .optional()
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('languageName')
      .optional()
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10'),
    validator.check('password')
      .custom((value, { request }) => {
        if (value) {
          if (value.length >= 8 && value.length < 50) {
            return true
          } else {
            throw new Error('PASSWORD: $[1] $[2], 8, 50')
          }
        } else {
          return true
        }
      })
      .isLength({ min: 0, max: 50 }).withMessage('PASSWORD: $[1] $[2], 8, 50'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      userController.registerUser(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'otpVerify', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,6,15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('otp')
      .isLength({ min: 4, max: 4 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],otp,1,4')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('type')
      .isLength({ min: 5, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,5,10')
      .isString().withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,6,10'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50'),
    validator.check('languageName')
      .optional()
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      userController.otpValidate(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'resendOtp', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile, 6, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('type')
      .isLength({ min: 5, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,5,10')
      .isString().withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,6,10')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      userController.recallOTP(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'pwdVerify', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile, 6, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('password')
      .isLength({ min: 8, max: 20 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],password, 8, 20'),
    validator.check('uuid')
      .isLength({ min: 10, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid, 10, 255')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      userController.pwdValidate(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'forgotPwdOtp', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,6, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      userController.forgotPwdOtp(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updatePwd', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile, 6, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('otp')
      .isLength({ min: 4, max: 4 }).withMessage('OTP'),
    validator.check('password')
      .isLength({ min: 8, max: 14 }).withMessage('PASSWORD: $[1] $[2],8,14')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      userController.UpdatePwd(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'listNearProvider', [
    validator.check('latitude')
      .isNumeric().withMessage('NUMERIC: $[1], latitude'),
    validator.check('longitude')
      .isNumeric().withMessage('NUMERIC: $[1], longitude')
  ], server.auth, function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      var lat = body.latitude
      var lon = body.longitude
      userController.getNearestProviderLocationForUser(lat, lon, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'tripHistory', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    userController.getTripHistory(body, (result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'tripDetails', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Booking No')
  ], server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    userController.getTripDetails(body, (result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.get(basePath + 'profile', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    userController.viewUserProfile(body, (result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'profileUpdate', [
    validator.check('fieldName')
      .isIn(['firstName', 'lastName', 'email', 'password', 'image']).withMessage('INVALID_FIELDNAME'),
    validator.check('data')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],data,1,50')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.userProfileUpdate(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'fileUpload', (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request
      const lang = request.headers.lang
      userController.userFileUploadCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'deviceUpdate', [
    validator.check('fcmToken')
      .isLength({ min: 10, max: 255 }).withMessage('INVALID: $[1],FCM token'),
    validator.check('brand')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],brand'),
    validator.check('model')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],model no'),
    validator.check('os')
      .isLength({ min: 2, max: 10 }).withMessage('INVALID: $[1],OS type'),
    validator.check('osVersion')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],OS version'),
    validator.check('appVersion')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],App Version'),
    validator.check('uuid')
      .optional()
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.userDeviceUpdateCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.get(basePath + 'cancelPolicy', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    userController.userCancelPolicyList(body, (result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'cancelBooking', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],booking No'),
    validator.check('reason')
      .isLength({ min: 0, max: 255 }).withMessage('INVALID: $[1],reason')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.cancelUserBooking(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.get(basePath + 'staticPage', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    body.id = request.query.id
    const lang = request.headers.lang
    userController.userStaticPageList(body, (result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })
  server.get(basePath + 'myActiveBooking', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      userController.getUserActiveBookingCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'rating', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],booking No'),
    validator.check('comments')
      .optional()
      .isLength({ min: 0, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],comments,0,255'),
    validator.check('rating')
      .optional()
      .isNumeric({ min: 1, max: 1 }).withMessage('NUMERIC: $[1],rating'),
    validator.check('action')
      .isIn(['yes', 'skipped']).withMessage('INVALID_FIELDNAME')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.userBookingFeedback(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'myWallet', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      userController.getUserWalletInfoCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'generateEphemeralKeys', [
    validator.check('stripe_version').trim().withMessage('MISSING: $[1],stripe version')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],stripe version')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.generateEphemeralKeysCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'payBookingFromCard', [
    validator.check('amount').trim().withMessage('MISSING: $[1],Amount')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Amount'),
    validator.check('cardid').trim().withMessage('MISSING: $[1],Card ID')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Card ID')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.customerPaymentChargeCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'usersSocialTokencheck', [
    validator.check('loginType')
      .isIn(['manual', 'google', 'facebook', 'apple']).withMessage('INVALID: $[1],loginType'),
    validator.check('socialToken')
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      userController.usersSocialTokenchecksCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'addMoneyFromCard', [
    validator.check('amount').trim().withMessage('INVALID: $[1],Amount')
      .isLength({ min: 1, max: 4 }).withMessage('INVALID: $[1],Amount'),
    validator.check('cardId').trim().withMessage('MISSING: $[1],Card ID')
      .isLength({ min: 5, max: 50 }).withMessage('INVALID: $[1],Card ID')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.usersUpdateWalletCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'addCard', [
    validator.check('source').trim().withMessage('MISSING: $[1],Source')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Source')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.usersStripeCreateCardsCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.get(basePath + 'cardList', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.usersStripeCardListsCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'removeCard', [
    validator.check('source').trim().withMessage('MISSING: $[1],Source')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Source')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      userController.usersStripeRemoveCardCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // user promo codes
  server.get(basePath + `promoCodesList`, server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      promoCodesCtrl.usersPromoCodesListCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // user promo codes
  server.post(basePath + `promoCodesRedeem`, [
    validator.check('coupon').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Coupon'),
    validator.check('amount').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],amount')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      promoCodesCtrl.promoCodesRedeemCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // user language update
  server.post(basePath + `updateLang`, [
    validator.check('languageName').trim().withMessage('MISSING: $[1],language Name')
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      userController.userUpdateLanguageCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // user peekcharges redeem
  server.post(basePath + `peekChargesRedeem`, [
    validator.check('date').trim().isLength({ min: 1, max: 100 })
      .withMessage('INVALID: $[1],date'),
    validator.check('time').trim().isLength({ min: 1, max: 100 })
      .withMessage('INVALID: $[1],time'),
    validator.check('amount').trim().isLength({ min: 1, max: 100 })
      .withMessage('INVALID: $[1],amount')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      peekChargesCtrl.peekChargesRedeemCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + `serviceListing`, server.auth, (request, response) => {
    const lang = request.headers.lang
    serviceCtrl.getServiceList((result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + `serviceSubCategoryListing`, [
    validator.check('categoryId').trim().isNumeric()
      .withMessage('INVALID: $[1], Category Id')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      serviceCtrl.getServiceSubCategoryList(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + `serviceSubCategoryLanding`, [
    validator.check('subCategoryId').trim().isNumeric()
      .withMessage('INVALID: $[1], Category Id')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      serviceCtrl.getServiceSubCategoryLandingCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + `serviceGroupListing`, [
    validator.check('categoryId').trim().isNumeric()
      .withMessage('INVALID: $[1], Category Id')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      serviceCtrl.getServiceGroupList(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + `serviceListingInGroup`, [
    validator.check('groupId').trim().isNumeric()
      .withMessage('INVALID: $[1], Group Id')
      .optional(),
    validator.check('subCategoryId').trim().isNumeric()
      .withMessage('INVALID: $[1], Sub-Category Id')
      .optional()
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      serviceCtrl.getServiceInGroupCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'getOrderTabs', server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    userController.getOrderTabCtrl((result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.get(basePath + 'getOrderList/:type/:page', [
    validator.check('type')
      .isIn(['taxi', 'services', 'delivery']).withMessage('INVALID: $[1],Order Type'),
    validator.check('page')
      .isNumeric().withMessage('INVALID: $[1],Page no')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.params
      body.auth = request.params.auth
      userController.getOrderListingCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'bookingDetails', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Booking No')
  ], server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'
    const error = validator.validation(request)
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      userController.getTripDetails(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'serviceRequest', [
    validator.check('providerId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Provider Id')
      .isNumeric().withMessage('INVALID: $[1],Provider Id')
      .optional(),
    validator.check('categoryId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Category Id')
      .isNumeric().withMessage('INVALID: $[1],Category Id'),
    validator.check('subCategoryId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Sub Category Id')
      .isNumeric().withMessage('INVALID: $[1],Sub Category Id')
      .optional(),
    validator.check('groupId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Group Id')
      .isNumeric().withMessage('INVALID: $[1],Group Id')
      .optional(),
    validator.check('serviceData')
      .isJSON().withMessage('INVALID: $[1],Service Data'),
    validator.check('addons')
      .isJSON().withMessage('INVALID: $[1],Add ons Data')
      .optional(),
    validator.check('bookingDate')
      .isISO8601().toDate().withMessage('INVALID: $[1],Booking date')
      .optional(),
    validator.check('timeSlot')
      .isJSON().withMessage('INVALID: $[1],Time Slot'),
    validator.check('description')
      .isLength({ min: 1, max: 100 }).withMessage('INVALID: $[1],Description')
      .optional(),
    validator.check('address')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1],Address'),
    validator.check('latitude')
      .isNumeric().withMessage('INVALID: $[1],Latidue'),
    validator.check('longitude')
      .isNumeric().withMessage('INVALID: $[1],Longitude'),
    validator.check('paymentMode')
      .isIn(['wallet', 'cash', 'card']).withMessage('INVALID_PAYMENT_MODE')
  ], server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'
    const error = validator.validation(request)
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      userController.createSerivceRequestCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'providerList/:page', [
    validator.check('subCategoryId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], SubCategory Id')
      .optional(),
    validator.check('categoryId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], CategoryId')
      .optional(),
    validator.check('page')
      .isNumeric().withMessage('INVALID: $[1],Page No.')
  ], server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    body.page = request.params.page
    const lang = request.headers.lang || 'default'
    const error = validator.validation(request)
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      userController.getProviderListByServiceCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'providerProfile', [
    validator.check('providerId')
      .isNumeric().withMessage('INVALID: $[1],ProviderId')
  ], server.auth, function (request, response) {
    var body = request.body
    // body.auth = request.params.auth
    const lang = request.headers.lang || 'default'
    const error = validator.validation(request)
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      userController.getProviderProfileViewCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'bookingTimeSlots', server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    userController.getBookingTimeSlots((result) => {
      errorController.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })
  server.post(basePath + 'serviceAddons', [
    validator.check('categoryId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Category Id')
      .optional(),
    validator.check('subCategoryId')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], SubCategory Id')
      .optional()
  ], server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    body.page = request.params.page
    const lang = request.headers.lang || 'default'
    const error = validator.validation(request)
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      userController.getServiceAddonsCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
}
