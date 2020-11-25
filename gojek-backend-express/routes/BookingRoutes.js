module.exports = function (server, validator) {
  const basePath = '/api/booking/'
  const ErrorController = require('../Utils/error')
  const BookingController = require('../controller/BookingController')

  var errorController = new ErrorController()
  var bookingController = new BookingController()

  setInterval(async () => {
    await bookingController.taxiBookingDefaultHandler();
    await bookingController.deliveryBookingDefaultHandler();
    bookingController.taxiBookingHandler((result) => {
      errorController.ctrlHandler([result], result.error, 'default', (message) => {
        // console.log('Booking Service', message)
      })
    })

    bookingController.deliveryBookingHandler((result) => {
      errorController.ctrlHandler([result], result.error, 'default', (message) => {
        // console.log('Booking Service', message)
      })
    })
    bookingController.reassignBookingCtrl(async (result) => {
      errorController.ctrlHandler([result], result.error, 'default', (message) => {
        // console.log('Reassign Booking', message)
      })
    })
  }, 5000)

  server.post(basePath + 'rideType', [
    validator.check('pickUpLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup latitude'),
    validator.check('pickUpLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup longitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup longitude'),
    validator.check('destinyLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination latitude'),
    validator.check('destinyLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination latitude'),
    validator.check('countryShortCode')
      .isLength({ min: 2, max: 2 }).withMessage('INVALID: $[1],country short code')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      bookingController.getAvailabeRide(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'bookRide', [
    validator.check('pickUpLocation')
      .isLength({ min: 10, max: 255 }).withMessage('INVALID_ADDRESS: $[1] $[2] $[3],pickup,10,255'),
    validator.check('dropLocation')
      .isLength({ min: 10, max: 255 }).withMessage('INVALID_ADDRESS: $[1] $[2] $[3],drop,10,255'),
    validator.check('pickUpLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup latitude'),
    validator.check('pickUpLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup longitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup longitude'),
    validator.check('destinyLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination latitude'),
    validator.check('destinyLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination longitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination longitude'),
    validator.check('rideType')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID_RIDETYPE'),
    validator.check('paymentMode')
      .isIn(['wallet', 'cash', 'card']).withMessage('INVALID_PAYMENT_MODE'),
    validator.check('seats')
      .optional()
      .isNumeric().withMessage('INVALID: $[1],Seats count'),
    validator.check('isCouponApplied')
      .optional()
      .isIn(['yes', 'no']).withMessage('INVALID: $[1], coupon status'),
    validator.check('couponCode')
      .optional()
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1], coupon code'),
    validator.check('discountRate')
      .optional()
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],discount rate'),
    validator.check('bookingType')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],booking type'),
    validator.check('bookingTimestamp')
      .optional()
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],booking time')
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
      bookingController.bookRideCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'confirmBooking', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],Booking No'),
    validator.check('action')
      .isIn(['accept', 'reject']).withMessage('INVALID_FIELDNAME'),
    validator.check('type')
      .optional()
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],type')
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
      bookingController.providerBookingStatusCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'changeBookingStatus', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],Booking No.'),
    validator.check('action')
      .isIn(['arrive', 'pickup', 'drop', 'complete', 'cancel']).withMessage('INVALID_FIELDNAME'),
    validator.check('type')
      .optional()
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],type')
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
      bookingController.providerBookingStatusCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'onGoingBooking', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      bookingController.providerOngoingBookingCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

   server.get(basePath + 'newOnGoingBooking', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      errorController.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      bookingController.providerOngoingBookingCtrl1(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'checkBooking', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],Booking No.'),
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
      bookingController.checkBookingCtrl(body, (result) => {
        errorController.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })  
}
