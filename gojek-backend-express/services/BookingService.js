module.exports = function () {
  const BookingRepository = require('../repository/BookingRepository')
  const GeoHelper = require('../thirdParty/geoHelper')
  const Common = require('../Utils/common')

  var common = new Common()
  var bookingRepository = new BookingRepository()
  var geoHelper = new GeoHelper()

  this.getRideTypeByCountry = async (data, callback) => {
    var response = {}
    try {
      var origin = [data.pickUpLatitude + ',' + data.pickUpLongitude]
      var destiny = [data.destinyLatitude + ',' + data.destinyLongitude]

      var ride = {}
      var availableRides = []
      // ride.CountryId = 1

      var geoDistance = await geoHelper.getDistanceInKM(origin, destiny)
      var rides = await bookingRepository.getRideVehicleType(ride)
      if (rides.error) {
        response.error = true
        response.msg = 'SERVICE_NOT_AVAILABLE'
      } else {
        rides.result.forEach(element => {
          var rideType = {}
          rideType.id = element.Id
          rideType.name = element.Name
          rideType.iconPassive = element.IconPassive
          rideType.iconActive = element.IconActive
          rideType.priceValue = common.getFareEstimation(element.BaseCharge, element.MinCharge, geoDistance.result.distance)
          rideType.priceText = element.CurrencyType + ' ' + rideType.priceValue
          rideType.waitingCharge = element.WaitingCharge
          rideType.capacity = element.Capacity
          rideType.shortDesc = element.ShortDesc
          rideType.longDesc = element.LongDesc
          availableRides.push(rideType)
        })
        response.error = false
        response.msg = 'VALID'
        response.data = availableRides
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.bookRideService = async (data, callback) => {
    var response = {}
    try {
      var origin = [data.pickUpLatitude + ',' + data.pickUpLongitude]
      var destiny = [data.destinyLatitude + ',' + data.destinyLongitude]

      var rideDetails = await bookingRepository.fetchRideVehicleTypeUsingId(data.rideType)

      if (rideDetails.error) {
        response.error = true
        response.msg = 'INVALID_RIDE'
      } else {
        var getDistance = await geoHelper.getDistanceInKM(origin, destiny)
        var booking = {}
        booking.UserId = data.auth.Id
        booking.UserDeviceId = data.auth.Device
        // booking.ProviderId = data.auth.ProviderId
        booking.FromLocation = data.pickUpLocation
        booking.ToLocation = data.dropLocation
        booking.SourceLat = data.pickUpLatitude
        booking.SourceLong = data.pickUpLongitude
        booking.DestinyLat = data.destinyLatitude
        booking.DestinyLong = data.destinyLongitude
        booking.RideTypeId = data.rideType
        booking.Distance = getDistance.result.distance
        booking.PaymentMode = data.paymentMode
        booking.BookingType = data.bookingType
        booking.SeatCount = data.seats
        if (data.bookingType === 'later') {
          booking.BookingTimestamp = data.bookingTimestamp
          booking.CreateAt = data.bookingTimestamp
        }
        if (data.isCouponApplied === 'yes') {
          booking.isCouponApplied = 'yes'
          booking.RedeemedId = data.redeemedId
          booking.DiscountAmount = data.discountAmount
        }
        var cellId = await common.getCellIdFromCoordinates(data.pickUpLatitude, data.pickUpLongitude)
        booking.S2CellId = cellId.id
        booking.Estimation = common.getFareEstimation(rideDetails.result.BaseCharge, rideDetails.result.MinCharge, booking.Distance)
        booking.TotalEarning = booking.Estimation * data
        booking.CurrencyType = rideDetails.result.CurrencyType
        booking.TotalAmount = booking.Estimation
        booking.ProviderRejectedIds = '[]'
        booking.AssignedProviderIds = '[]'
        booking.TotalEarning = (booking.Estimation * rideDetails.result.CommissionPercentage) / 100
        booking.ProviderEarning = booking.Estimation - booking.TotalEarning
        booking.RideName = rideDetails.result.Name
        booking.Status = 'waiting'

        var bookingDetails = await bookingRepository.createBooking(booking)

        if (bookingDetails.error) {
          response.error = true
          response.msg = 'BOOKING_UNAVAILABLE'
        } else {
          response.error = false
          response.msg = 'BOOKING_ADDED'
          response.data = { bookingNo: bookingDetails.result }
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.getBookingWaitlist = () => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        var status = ['waiting']
        condition.ProviderId = null
        var limit = 1
        var waitingList = await bookingRepository.fetchBookingUsingState(condition, status, limit)
        if (waitingList.error) {
          response.error = true
          response.msg = 'NO_NEW_BOOKING'
        } else {
          var result = waitingList.result.map((element) => {
            var data = {}
            data['id'] = element.Id
            data['userId'] = element.UserId
            data['userDeviceId'] = element.UserDeviceId
            data['lat'] = element.SourceLat
            data['lng'] = element.SourceLong
            data['cellId'] = element.S2CellId
            data['rideId'] = element.RideTypeId
            data['blockList'] = element.ProviderRejectedIds
            data['assignedList'] = element.AssignedProviderIds
            data['type'] = element.Type
            return data
          })
          response.error = false
          response.msg = 'VALID'
          response.data = result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.updateProviderInBooking = async (bookingId, providerId, providerDetails) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        var data = {}
        condition.Id = bookingId
        data.ProviderId = providerId.toString()
        data.VehicleName = providerDetails.vehicleName + '(' + providerDetails.vehicleModel + ')'
        var provider = await bookingRepository.updateBookingProviderId(condition, data)
        if (provider.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],Provider Id'
        } else {
          response.error = false
          response.msg = 'NEW_BOOKING'
        }
        resolve(response)
      } catch (err) {
        response.error = true
      }
    })
  }

  this.providerBookingUpdateService = async (data, callback) => {
    var response = {}
    try {
      var update = {}
      var condition = {}
      condition.Id = data.bookingNo
      var status = data.action
      var message

      if (status === 'accept') {
        update.Status = 'accepted'
        message = 'BOOKING_ACCEPT'
      } else if (status === 'arrive') {
        update.Status = 'arrived'
        message = 'PROVIDER_ARRIVED'
      } else if (status === 'pickup') {
        update.Status = 'pickedup'
        message = 'PROVIDER_PICKUP'
      } else if (status === 'drop') {
        update.Status = 'dropped'
        message = 'PROVIDER_DROP'
      } else if (status === 'cancel') {
        update.CancelledBy = 'provider'
        update.Status = 'cancelled'
        message = 'BOOKING_CANCEL'
      } else if (status === 'complete') {
        update.Status = 'completed'
        update.IsActive = 'no'
        message = 'BOOKING_COMPLETE'
      } else if (status === 'reject') {
        update.CancelledBy = 'provider'
        update.Status = 'waiting'
        update.IsActive = 'yes'
        update.ProviderId = null
        message = 'BOOKING_REJECT'
      }
      var booking = await bookingRepository.updateBookingState(condition, update)
      if (booking.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1],booking status'
      } else {
        var bookingDetails = await bookingRepository.fetchBookingInfo(condition)

        var bookingInfo = bookingDetails.result.map(element => {
          var booking = {}
          booking['bookingNo'] = element.Id
          booking['userId'] = element.UserId
          booking['userDeviceId'] = element.UserDeviceId
          booking['fromLocation'] = element.FromLocation
          booking['toLocation'] = element.ToLocation
          booking['paymentMode'] = element.PaymentMode
          booking['distance'] = element.Distance
          booking['currencyType'] = element.CurrencyType
          booking['tax'] = element.Tax
          booking['waitingCharges'] = element.WaitingCharges
          booking['totalAmount'] = element.TotalAmount
          booking['vehicleName'] = element.VehicleName
          booking['rideName'] = element.RideName
          booking['estimation'] = element.Estimation
          booking['sourceLat'] = element.SourceLat
          booking['sourceLong'] = element.SourceLong
          booking['destinyLat'] = element.DestinyLat
          booking['destinyLong'] = element.DestinyLong
          booking['createAt'] = element.CreateAt
          booking['status'] = element.Status
          booking['providerEarning'] = element.ProviderEarning
          return booking
        })

        response.error = false
        response.msg = message
        response.data = bookingInfo
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.changeBookingStatus = async (bookingId, status) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        condition.Id = bookingId
        var data = {}
        data.IsActive = status === 'cancelled' ? 'no' : 'yes'
        data.Status = status
        var booking = await bookingRepository.updateBookingState(condition, data)
        if (booking.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],booking'
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

  this.bookingCancellation = async (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        condition.Id = data.Id
        var booking = await bookingRepository.updateBookingState(condition, data)
        if (booking.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],booking'
        } else {
          response.error = false
          response.msg = 'BOOKING_CANCEL'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderBooking = async (providerId, status, type) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var limit = 1
        var condition = {}
        condition.ProviderId = providerId
        var pendingServiceInfo = await bookingRepository.fetchBookingUsingType(condition, limit, type)
        var bookingDetails = pendingServiceInfo.error ? await bookingRepository.fetchBookingUsingState(condition, status, limit) : pendingServiceInfo
        if (bookingDetails.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          var booking = bookingDetails.result.map(element => {
            var data = {}
            data['bookingId'] = element.Id
            data['fromLocation'] = element.FromLocation
            data['toLocation'] = element.ToLocation
            data['sourceLat'] = element.SourceLat
            data['sourceLong'] = element.SourceLong
            data['destinyLat'] = element.DestinyLat
            data['destinyLong'] = element.DestinyLong
            data['type'] = element.Type
            data['status'] = element.Status
            data['startTime'] = common.timeStampFormatter(element.UpdateAt)
            data['currentTime'] = common.timeStampFormatter(new Date())
            data['outletId'] = element.outletId
            if (status.indexOf(element.Status)) {
              data['paymentMode'] = element.PaymentMode
              data['estimation'] = (element.CurrencyType + element.Estimation).toString()
              data['userId'] = element.UserId
            }
            return data
          })
          response.error = false
          response.msg = 'NEW_BOOKING'
          response.data = booking[0]
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getBookingInfo = async (data, status) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var bookingDetails = await bookingRepository.fetchBookingInfo(data)
        if (bookingDetails.error) {
          response.error = true
          response.msg = 'INVALID_BOOKING'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.data = bookingDetails.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.reassignBookingService = (timer) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var status = ['assigned', 'unassigned']
        var data = {}
        data.ProviderId = null
        data.Status = 'waiting'
        data.IsActive = 'no'
        var booking = await bookingRepository.updatenWaitingBookingList(data, status, timer)
        if (booking.error) {
          response.error = true
          response.msg = 'NO_BOOKING_REASSIGNED'
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

  this.getUserActiveBooking = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var status = ['accepted', 'processing', 'waiting', 'pickedup', 'arrived', 'dropped', 'assigned', 'completed']
        var data = {}
        data.UserId = userId
        data.IsUserReviewed = 'no'
        var limit = 1
        var bookingInfo = await bookingRepository.fetchBookingUsingState(data, status, limit)
        if (bookingInfo.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          var bookingDetails = bookingInfo.result.map(element => {
            var booking = {}
            booking['id'] = element.Id
            booking['providerId'] = element.ProviderId
            booking['fromLocation'] = element.FromLocation
            booking['toLocation'] = element.ToLocation
            booking['status'] = element.Status
            booking['estimation'] = element.Estimation
            booking['currency'] = element.CurrencyType
            booking['sourceLat'] = element.SourceLat
            booking['sourceLong'] = element.SourceLong
            booking['destinyLat'] = element.DestinyLat
            booking['destinyLong'] = element.DestinyLong
            booking['totalAmt'] = element.CurrencyType + ' ' + element.TotalAmount
            booking['rideId'] = element.RideTypeId
            return booking
          })
          response.error = false
          response.msg = 'ACTIVE_BOOKING'
          response.data = bookingDetails[0]
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getUserBookingHistory = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var user = {}
        user.UserId = userId
        var booking = await bookingRepository.fetchBookingInfo(user)
        if (booking.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          var bookingInfo = booking.result.map(element => {
            var data = {}
            data['bookingNo'] = element.Id
            data['sourceLat'] = element.SourceLat
            data['soruceLong'] = element.SourceLong
            data['destinyLat'] = element.DestinyLat
            data['destinyLong'] = element.DestinyLong
            data['estimation'] = element.Estimation
            data['total'] = element.CurrencyType + element.TotalAmount
            data['isActive'] = element.IsActive
            data['status'] = element.Status
            data['vehicleName'] = element.VehicleName === null ? 'Test Vehicle' : element.VehicleName
            data['paymentMode'] = element.PaymentMode
            data['createdTime'] = element.CreateAt
            return data
          })

          response.error = false
          response.msg = 'VALID'
          response.data = bookingInfo
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderBookingStatics = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var data = []
        var today = await bookingRepository.fetchProviderBookingStatistics(providerId, 'day')

        var todayEarning = {}
        todayEarning.title = 'Today'
        todayEarning.sub_title_1 = 'Trips'
        todayEarning.sub_title_2 = 'Earnings'
        todayEarning.value_1 = String(today.result.TripCount)
        todayEarning.value_2 = today.result.TripCount > 0 ? today.result.CurrencyType + ' ' + today.result.ProviderEarning : '0'
        todayEarning.key = 'day'
        data.push(todayEarning)

        var week = await bookingRepository.fetchProviderBookingStatistics(providerId, 'week')

        var weekEarning = {}
        weekEarning.title = 'This week'
        weekEarning.sub_title_1 = 'Trips'
        weekEarning.sub_title_2 = 'Earnings'
        weekEarning.value_1 = String(week.result.TripCount)
        weekEarning.value_2 = week.result.TripCount > 0 ? week.result.CurrencyType + ' ' + week.result.ProviderEarning : '0'
        weekEarning.key = 'week'
        data.push(weekEarning)

        var month = await bookingRepository.fetchProviderBookingStatistics(providerId, 'month')

        var monthEarning = {}
        monthEarning.title = 'This month'
        monthEarning.sub_title_1 = 'Trips'
        monthEarning.sub_title_2 = 'Earnings'
        monthEarning.value_1 = String(month.result.TripCount)
        monthEarning.value_2 = month.result.TripCount > 0 ? month.result.CurrencyType + ' ' + month.result.ProviderEarning : '0'
        monthEarning.key = 'month'
        data.push(monthEarning)

        var year = await bookingRepository.fetchProviderBookingStatistics(providerId, 'year')

        var yearEarning = {}
        yearEarning.title = 'This Year'
        yearEarning.sub_title_1 = 'Trips'
        yearEarning.sub_title_2 = 'Earnings'
        yearEarning.value_1 = String(year.result.TripCount)
        yearEarning.value_2 = year.result.TripCount > 0 ? year.result.CurrencyType + ' ' + year.result.ProviderEarning : '0'
        yearEarning.key = 'year'
        data.push(yearEarning)

        response.error = false
        response.data = data
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getProviderEarnings = async (providerId, duration, callback) => {
    var response = {}
    try {
      var earning = await bookingRepository.fetchProviderBookingEarnings(providerId, duration)
      if (earning.error) {
        response.error = true
        response.data = []
      } else {
        var earningList = earning.result.map(element => {
          var data = {}
          data['earnings'] = element.CurrencyType + ' ' + element.ProviderEarning
          data['rideName'] = element.RideName
          data['distance'] = String(element.Distance)
          data['paymentMode'] = element.PaymentMode
          data['date'] = common.dateFormatter(element.CreateAt)
          data['createdAt'] = element.CreateAt
          return data
        })
        response.error = false
        response.data = earningList
      }
      callback(response)
    } catch (err) {
      err.error = true
      callback(err)
    }
  }

  this.providerBookingRejectUpdate = (providerId, bookingId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        providerId = providerId.toString()
        var booking = await bookingRepository.updateRejectProvider(providerId, bookingId)
        if (booking.error) {
          response.error = true
        } else {
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getUserBookingFeedback = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var feedback = await bookingRepository.fetchUserBookingPendingFeedback(userId)
        if (feedback.error) {
          response.error = true
        } else {
          response.error = false
          response.data = feedback.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.updateUserBookingFeedback = (bookingNo, userId, action) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        condition.Id = bookingNo
        condition.UserId = userId
        var data = {}
        data.IsUserReviewed = action
        var booking = await bookingRepository.updateBookingState(condition, data)
        if (booking.error) {
          response.error = true
        } else {
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderSerivceTypeService = async (data, callback) => {
    var response = {}
    try {
      var ride = {}
      // ride.CountryId = 1
      var rides = await bookingRepository.getRideVehicleType(ride)
      if (rides.error) {
        response.error = true
        response.msg = 'SERVICE_NOT_AVAILABLE'
      } else {
        var rideList = rides.result.map(elements => {
          var rideInfo = {}
          rideInfo['id'] = elements.Id
          rideInfo['name'] = elements.Name
          return rideInfo
        })
        response.error = false
        response.msg = 'VALID'
        response.data = rideList
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderSelectedServiceList = (serivesIds) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var rideList = await bookingRepository.getServiceTypeUsingIds(serivesIds)
        if (rideList.error) {
          response.error = true
          response.msg = 'SERVICE_NOT_AVAILABLE'
        } else {
          response.error = false
          response.data = rideList.result
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getRideTypeDetailService = (rideTypeId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var rideList = await bookingRepository.fetchRideVehicleTypeUsingId(rideTypeId)
        if (rideList.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          var result = rideList.result
          var data = {}
          data.rideName = result.Name
          data.rideImage = result.IconActive
          response.error = false
          response.msg = 'VALID'
          response.data = data
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.isRideSharingEnabled = (serviceTypeIds) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var rideSharing = await bookingRepository.checkRideSharingEnabled(serviceTypeIds)
        if (rideSharing.error) {
          response.error = true
        } else {
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.response = true
        resolve(err)
      }
    })
  }

  this.getProviderBookingHistory = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var user = {}
        user.ProviderId = providerId
        var booking = await bookingRepository.fetchBookingInfo(user)
        if (booking.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          var bookingInfo = booking.result.map(element => {
            var data = {}
            data['bookingNo'] = element.Id
            data['sourceLat'] = element.SourceLat
            data['soruceLong'] = element.SourceLong
            data['destinyLat'] = element.DestinyLat
            data['destinyLong'] = element.DestinyLong
            data['estimation'] = element.Estimation
            data['total'] = element.CurrencyType + element.TotalAmount
            data['isActive'] = element.IsActive
            data['status'] = element.Status
            data['vehicleName'] = element.VehicleName === null ? 'Test Vehicle' : element.VehicleName
            data['paymentMode'] = element.PaymentMode
            data['createdTime'] = element.CreateAt
            data['type'] = element.Type
            return data
          })

          response.error = false
          response.msg = 'VALID'
          response.data = bookingInfo
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getBookingDishes = (orderId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var dishes = await bookingRepository.getDishesOrdered(orderId)
        if (dishes.error) {
          response.error = true
        } else {
          response.error = false
          response.data = dishes.result
        }
        resolve(response)
      } catch (err) {
        err.response = true
        resolve(err)
      }
    })
  }

  this.getOutletInfo = (outletId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var outlet = await bookingRepository.getOutletDetails(outletId)
        if (outlet.error) {
          response.error = true
        } else {
          response.error = false
          response.data = outlet.result
        }
        resolve(response)
      } catch (err) {
        err.response = true
        resolve(err)
      }
    })
  }

  this.getOrderTabService = (type) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var orderList = await bookingRepository.fetchTabList(type)
        if (orderList.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          response.error = false
          response.data = orderList.result
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.response = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getOrderListingService = (data) => {
    var response = {}
    var page = 1
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        var orderId = []
        var dishesList = []
        condition.Type = data.type
        page = data.page
        var orderList
        if (data.userType === 'user') {
          condition.UserId = data.auth.Id
        } else if (data.userType === 'provider') {
          condition.ProviderId = data.auth.Id
        }
        if (data.type === 'taxi') {
          orderList = await bookingRepository.fetchOrderList(condition, page)
        } else if (data.type === 'delivery') {
          orderList = await bookingRepository.fetchDeliveryOrders(condition, page)
          orderId = orderList.error ? [] : orderList.result.map(element => { return element.Id })
          // console.log(orderId)
          dishesList = await bookingRepository.getMultiDishesOrdered(orderId)
        } else if (data.type === 'services') {
          delete condition.Type
          orderList = await bookingRepository.fetchServiceList(condition, page)
        }
        if (orderList.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          var bookingInfo = orderList.result.map(element => {
            var data = {}
            data['bookingNo'] = element.Id
            data['orderRefferenceID'] = 'ORDER No. #' + element.Id
            data['outletName'] = element.OutletName
            data['sourceLocation'] = element.FromLocation
            data['sourceLat'] = element.SourceLat
            data['soruceLong'] = element.SourceLong
            data['userName'] = element.UserName
            data['destinyLocation'] = element.ToLocation
            data['destinyLat'] = element.DestinyLat
            data['destinyLong'] = element.DestinyLong
            data['estimation'] = element.Estimation
            data['total'] = (element.CurrencyType + element.TotalAmount).toString()
            data['isActive'] = element.IsActive
            data['status'] = element.Status
            data['dishList'] = dishesList ? [] : dishesList.result.filter(dish => dish.orderId === element.Id)
            data['vehicleName'] = element.VehicleName
            data['paymentMode'] = element.PaymentMode
            data['createdTime'] = element.CreateAt
            data['type'] = element.Type
            data['categoryName'] = element.CategoryName
            data['bookingDate'] = element.BookingTimestamp
            data['timeSlot'] = element.ServiceTimeSlot
            return data
          })

          response.error = false
          response.data = bookingInfo
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        console.log(err)
        err.response = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.createSerivceRequestService = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var service = {}
        service.UserId = data.auth.Id
        service.ProviderId = data.providerId
        service.ServiceCategoryId = data.categoryId
        service.ServiceSubCategoryId = data.subCategoryId
        service.ServiceGroupId = data.groupId
        service.BookingTimestamp = data.bookingDate
        service.ServiceTimeSlot = data.timeSlot
        service.ToLocation = data.address
        service.DestinyLat = data.latitude
        service.DestinyLong = data.longitude
        service.PaymentMode = data.paymentMode
        service.ServiceIds = data.serviceData
        service.ServiceAddons = data.addons === undefined ? '[]' : data.addons
        service.Status = 'pending'
        service.Type = 'services'

        var createService = await bookingRepository.addServiceRequest(service)
        if (createService.error) {
          response.error = true
          response.msg = 'BOOKING_UNAVAILABLE'
        } else {
          response.error = false
          response.msg = 'BOOKING_ADDED'
          response.data = { bookingNo: createService.result }
        }
        resolve(response)
      } catch (err) {
        err.response = true
        resolve(err)
      }
    })
  }

  this.serviceImageUpdateService = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var service = {}
        var condition = {}
        condition.Id = data.bookingNo
        condition.ProviderId = data.auth.Id
        if (data.type === 'start') {
          service.ServiceStartImage = data.imageURL
        } else if (data.type === 'end') {
          service.ServiceEndImage = data.imageURL
        }
        var createService = await bookingRepository.updateServiceImage(condition, service)
        if (createService.error) {
          response.error = true
          response.msg = 'OOPS'
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

  this.getBookingCategoryInfoService = (type) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var orderList = await bookingRepository.fetchTabList(type)
        if (orderList.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          response.error = false
          response.data = orderList.result
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.response = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getServiceAddons = (type) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var addOnsTitle = await bookingRepository.fetchAddonsTitle(type)
        var titleIds = addOnsTitle.error ? [] : addOnsTitle.result.map((element) => { return element.Id })
        var addOnsList = await bookingRepository.fetchAddons(titleIds)
        if (addOnsTitle.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          var addOns = addOnsTitle.result.map((title) => {
            var data = {}
            data.id = title.Id
            data.title = title.Name
            data.type = title.Type
            data.data = addOnsList.result.filter((addons) => title.Id === addons.titleId)
            return data
          })
          response.error = false
          response.data = addOns
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.response = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
  this.getServiceInfo = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var serviceIds = data.map((element) => { return element.serviceId })
        var serviceList = await bookingRepository.fetchServiceInfo(serviceIds)
        if (serviceList.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          var alterServiceList = serviceList.result.map((service) => {
            var element = data.filter(qty => service.id == qty.serviceId)
            service.qty = element[0].qty
            return service
          })
          response.error = false
          response.data = alterServiceList
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

  this.getAddonsInfo = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var addonId = data.map((element) => { return element.addonsId })
        var addonList = await bookingRepository.fetchAddonsInfo(addonId)
        if (addonList.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          response.error = false
          response.data = addonList.result
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.response = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.updateServiceBookingInfo = (bookingId, providerIds) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        condition.Id = bookingId
        var data = {}
        providerIds = providerIds.map((element) => { return element.toString() })
        data.AssignedProviderIds = JSON.stringify(providerIds)
        var bookingUpdate = await bookingRepository.updateBookingInfo(data, condition)
        if (bookingUpdate.error) {
          response.error = true
        } else {
          response.error = false
          response.data = bookingUpdate.result
        }
        resolve(response)
      } catch (err) {
        err.response = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
