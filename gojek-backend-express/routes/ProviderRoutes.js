module.exports = function (server, validator) {
  const basePath = '/api/provider/'
  const ProviderController = require('../controller/ProviderController')
  const ProviderVehicleController = require('../controller/ProviderVehicleController')
  const ErrorHandler = require('../Utils/error')

  const date = new Date()
  const year = date.getFullYear
  var providerController = new ProviderController()
  var errorHandler = new ErrorHandler()
  var providerVehicleController = new ProviderVehicleController()

  server.get(basePath + 'config', (request, response) => {
    providerController.providerAppSetting((result) => {
      const lang = request.headers.lang
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
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
    const lang = request.headers.lang || 'default'
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      var data = {}
      data.number = body.mobile
      data.ext = body.countryCode
      providerController.providerMobileValidation(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'resendOtp', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,6,15')
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
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      providerController.providerOtpRecall(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
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
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      providerController.providerOtpValidation(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
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
    validator.check('isDeliveryOpt').optional()
      .isNumeric().withMessage('NUMERIC: $[1], Delivery Opted')
      .isLength({ min: 0, max: 1 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10'),
    validator.check('type').optional()
      .isIn(['taxi', 'services']).withMessage('INVALID: $[1], Type'),
    validator.check('loginType').optional()
      .isIn(['manual', 'google', 'facebook']).withMessage('INVALID: $[1],loginType'),
    validator.check('socialToken').optional()
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('languageName').optional()
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
    validator.check('countryId')
      .isLength({ min: 1, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryId,1,5'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      providerController.registerProvider(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'pwdVerify', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], mobile,6,15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('password')
      .isLength({ min: 8, max: 20 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3], password, 8, 20'),
    validator.check('uuid')
      .isLength({ min: 10, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3], uuid, 10, 255')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      providerController.providerPwdValidator(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'forgotPwdOtp', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], mobile,6, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      providerController.providerForgotPwdOtp(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updatePwd', [
    validator.check('mobile')
      .isLength({ min: 6, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], mobile,6,15')
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
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      providerController.updateProviderPwd(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updateLocation', [
    validator.check('latitude')
      .isNumeric().withMessage('INVALID_LATITUDE'),
    validator.check('longitude')
      .isNumeric().withMessage('INVALID_LONGITUDE'),
    validator.check('bearing')
      .isNumeric().withMessage('INVALID_BEARING')
  ], server.auth, function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.updateProviderLocationCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
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
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],App Version')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerDeviceUpdateCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'cancelPolicy', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    providerController.providerCancelPolicyList(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'cancelBooking', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],booking No'),
    validator.check('reason')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1],reason')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.cancelProviderBooking(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
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
    providerController.providerStaticPageList(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.get(basePath + 'stateUpdate', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerStatusToggle(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'profile', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    providerController.viewProviderProfile(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'profileUpdate', [
    validator.check('fieldName')
      .isIn(['firstName', 'lastName', 'email', 'password', 'image']).withMessage('INVALID_FIELDNAME'),
    validator.check('data')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3], data,1,50')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerProfileUpdate(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'docList', [
    validator.check('docType')
      .isIn(['provider', 'bank', 'vehicle']).withMessage('INVALID_FIELDNAME')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerDocumentListingCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'fileUpload', (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request
      const lang = request.headers.lang
      providerController.providerFileUploadCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'dashboard', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    providerController.providerDashboardCtrl(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'rating', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], booking No'),
    validator.check('comments')
      .isLength({ min: 0, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],comments,0,50'),
    validator.check('rating')
      .isNumeric({ min: 1, max: 1 }).withMessage('NUMERIC: $[1],rating')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerBookingFeedback(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'myEarning', [
    validator.check('duration')
      .isIn(['day', 'week', 'month', 'year']).withMessage('INVALID_FIELDNAME')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerEarning(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'vehicleBrand',
    server.auth, (request, response) => {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerVehicleController.getVehicleBrandCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    })

  server.post(basePath + 'vehicleModel', [
    validator.check('brandId')
      .isNumeric().withMessage('NUMERIC: $[1], brand Id')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerVehicleController.getVehicleModelCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'serviceType', [
    validator.check('seats')
      .isLength({ min: 1, max: 5 }).withMessage('INVALID: $[1], seats')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.getProviderSerivceTypeCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'addVehicle', [
    validator.check('vehicleBrand')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Brand'),
    validator.check('vehicleModel')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Model'),
    validator.check('seats')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], seats'),
    validator.check('noPlate')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Vehicle Number Plate'),
    validator.check('year')
      .isInt({ min: 2000, max: 2019 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],Year,2000,2019'),
    validator.check('color')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1], Color'),
    validator.check('serviceType')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Service Type'),
    validator.check('imageUrl')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Image URL')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.addProviderVehicleCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'myVehicle',
    server.auth, (request, response) => {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.getProviderVehicleListCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    })
  server.post(basePath + 'myVehicleDetails', [
    validator.check('vehicleId')
      .isNumeric({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.getProviderVehicleDetailsCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updateVehicleDetails', [
    validator.check('vehicleId')
      .isNumeric().withMessage('INVALID: $[1], Vehicle Id')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id'),
    validator.check('vehicleBrand')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Brand'),
    validator.check('vehicleModel')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Model'),
    validator.check('seats')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], seats'),
    validator.check('noPlate')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Vehicle Number Plate'),
    validator.check('year')
      .isInt({ min: 2000, max: year }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], Year,2000,' + year),
    validator.check('color')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1], Color'),
    validator.check('serviceType')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Service Type'),
    validator.check('imageUrl')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Image URL')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.editProviderVehicleCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'setVehicleActive', [
    validator.check('vehicleId')
      .isNumeric().withMessage('INVALID: $[1], Vehicle Id')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerVehicleController.setProviderVehicleActiveCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'deleteVehicle', [
    validator.check('vehicleId')
      .isNumeric().withMessage('INVALID: $[1], Vehicle Id')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerVehicleController.removeProviderVehicleCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'docUpload', [
    validator.check('path')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], path'),
    validator.check('docType')
      .isNumeric({ min: 1, max: 11 }).withMessage('INVALID: $[1], docType')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerDocumentUpdateCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'myWallet', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.getProviderWalletInfoCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'providerAccountCreation', [
    validator.check('email')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], email')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.stipeProviderAccountCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'providersSocialTokencheck', [
    validator.check('loginType')
      .isIn(['manual', 'google', 'facebook']).withMessage('INVALID: $[1],loginType'),
    validator.check('socialToken')
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      providerController.providersSocialTokenchecksCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'providerPaymentCharge', [
    validator.check('amount').trim().withMessage('MISSING: $[1],Amount')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Amount'),
    validator.check('cardid').trim().withMessage('MISSING: $[1],Card ID')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Card ID')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.providerPaymentChargeCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // provider language update
  server.post(basePath + `updateLang`, [
    validator.check('languageName').trim().withMessage('MISSING: $[1],language Name')
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      providerController.providerUpdateLanguageCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // provider language update
  server.post(basePath + `updateLang`, [
    validator.check('languageName').trim().withMessage('MISSING: $[1],language Name')
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      providerController.providerUpdateLanguageCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + `withdrawalRequest`, [
    validator.check('amount').isNumeric('INVALID: $[1], amount')
      .isLength({ min: 1, max: 6 }).withMessage('INVALID: $[1], amount')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      providerController.providerWithdrawalRequest(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'getBookingStats', [
    validator.check('year').trim().withMessage('MISSING: $[1],year')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],year')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.getProviderBookingStacksCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updateFinancialInfo', [
    validator.check('data').isJSON().withMessage('MISSING: $[1], Data')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Data')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.updateProviderFinancialInfoCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updateAddressInfo', [
    validator.check('address1')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1],Address 1'),
    validator.check('address2')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1],Address 2'),
    validator.check('city')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],City'),
    validator.check('province')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],Province'),
    validator.check('landmark')
      .isLength({ min: 1, max: 100 }).withMessage('INVALID: $[1],Landmark'),
    validator.check('latitude')
      .isNumeric().withMessage('INVALID: $[1], Latitude')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],Latitude'),
    validator.check('longitude')
      .isNumeric().withMessage('INVALID: $[1], Longitude')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],Longitude')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      providerController.updateProviderAddressCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'viewAddressInfo', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    providerController.viewAddressCtrl(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.get(basePath + 'getProviderTimeSlots', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    providerController.getProviderTimeSlotCtrl(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'updateProviderTimeSlots', [
    validator.check('data').isJSON().withMessage('MISSING: $[1], Data')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.updateProviderTimeSlotCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + `categoryListing`, server.auth, (request, response) => {
    const lang = request.headers.lang
    providerController.getCategoryListingCtrl((result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'getSubCategory', [
    validator.check('categoryId').isNumeric().withMessage('INVALID: $[1], Category Id')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.getSubCategoryListingCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updateProviderServiceCategory', [
    validator.check('categoryId').isNumeric().withMessage('NUMERIC: $[1], Category Id'),
    validator.check('subCategoryId').isNumeric().withMessage('NUMERIC: $[1], Sub Category Id').optional(),
    validator.check('pricePerHour').isNumeric().withMessage('NUMERIC: $[1], Price Per Hour').optional(),
    validator.check('experience').isNumeric().withMessage('INUMERIC: $[1], Experience').optional(),
    validator.check('quickPitch').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Quick Pitch').optional()
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      providerController.updateProviderServiceCategoryCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + `myServiceListing`, server.auth, (request, response) => {
    const lang = request.headers.lang
    var body = request.body
    body.auth = request.params.auth
    providerController.myServiceListingCtrl(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.delete(basePath + 'deleteServiceCategory/:Id', [
    validator.check('Id').isNumeric().withMessage('NUMERIC: $[1], Id')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.params
      body.auth = request.params.auth
      providerController.deleteServiceCateogryCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.patch(basePath + 'updateProviderServiceCategory/:serviceId', [
    validator.check('serviceId').isNumeric().withMessage('NUMERIC: $[1], Service Id'),
    validator.check('categoryId').isNumeric().withMessage('NUMERIC: $[1], Category Id'),
    validator.check('subCategoryId').isNumeric().withMessage('NUMERIC: $[1], Sub Category Id').optional(),
    validator.check('pricePerHour').isNumeric().withMessage('NUMERIC: $[1], Price Per Hour').optional(),
    validator.check('experience').isNumeric().withMessage('INUMERIC: $[1], Experience').optional(),
    validator.check('quickPitch').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Quick Pitch').optional()
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.serviceId = request.params.serviceId
      body.auth = request.params.auth
      providerController.updateServiceCategoryCtrl(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + `checkPendingInfo`, server.auth, (request, response) => {
    const lang = request.headers.lang
    var body = request.body
    body.auth = request.params.auth
    providerController.checkPendingInfoCtrl(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.get(basePath + 'tripHistory', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    providerController.getTripHistory(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
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

    providerController.getTripDetails(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'bookingDetails', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Booking No')
  ], server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    providerController.getTripDetails(body, (result) => {
      errorHandler.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })
}
