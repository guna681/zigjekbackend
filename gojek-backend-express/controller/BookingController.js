module.exports = function () {
  const BookingService = require('../services/BookingService')
  const ProviderService = require('../services/ProviderService')
  const UserService = require('../services/UserService')
  const AppConfigService = require('../services/AppConfigService')
  const WalletService = require('../services/WalletService')
  const TransactionService = require('../services/TransactionServices')
  const Common = require('../Utils/common')
  const PaymentHelper = require('../thirdParty/paymentHelper')
  const PushNotification = require('../thirdParty/pushNotification')
  const AdminAppConfigRepository = require('../repository/Admin/AdminAppConfigRepository')
  const BookingRepository = require('../repository/BookingRepository')


  var pushNotification = new PushNotification()
  var paymentHelper = new PaymentHelper()
  var bookingService = new BookingService()
  var providerService = new ProviderService()
  var userService = new UserService()
  var appConfigService = new AppConfigService()
  var walletService = new WalletService()
  var transactionService = new TransactionService()
  var bookingRepository = new BookingRepository()
  var common = new Common()
  var adminAppConfigRepository = new AdminAppConfigRepository();


  this.getAvailabeRide = (req, callback) => {
    var data = req
    var response = {}
    bookingService.getRideTypeByCountry(data, (result) => {
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

  this.bookRideCtrl = (req, callback) => {
    var response = {}
    var data = req
    bookingService.bookRideService(data, (result) => {
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

  this.providerBookingStatusCtrl = (req, callback) => {
    var response = {}
    var data = req
    // console.log(data,'***')
    bookingService.providerBookingUpdateService(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        console.log(result)
        var providerUnblock
        var providerWalletInfo
        var providerTnxStatus
        var providerTnx
        var deviceInfo = result.data[0].userId
        var content = {}
        var providerId = data.auth.Id
        var bookingId = data.bookingNo
        var userToken = await userService.getUserDeviceToken(deviceInfo)

        if (data.action === 'accept') {
          content.data = 'booking_accepted'
          content.title = 'Provider has been assigned'
          content.body = 'You can now track the provider'
        } else if (data.action === 'reject') {
          providerUnblock = 'active'
          bookingService.providerBookingRejectUpdate(providerId, bookingId)
          providerService.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          content.data = 'provider_rejected'
          content.title = 'The provider has rejected your booking'
          content.body = 'We will assign new ride for you.'
          userToken.error = true
        } else if (data.action === 'arrive') {
          content.data = 'driver_reached'
          content.title = 'The provider reached location'
          content.body = 'The provider is waiting at your pickup point'
        } else if (data.action === 'pickup') {
          content.data = 'trip_started'
          content.title = 'Trip has started'
          content.body = 'Your trip has been started. Have a safe journey'
        } else if (data.action === 'complete') {
          if (data.type == 'delivery') {
             var condition = {}
      condition.Id = data.bookingNo
      var booking = await bookingService.getBookingInfo(condition)
        var bookingInfo = booking.data[0]
        var outletEarning = bookingInfo.TotalAmount - bookingInfo.ProviderEarning

          var earningCondition = {}
        earningCondition.id = bookingInfo.outletId
        var earningData = {}
        earningData.outletEarning = outletEarning

        var booking = await bookingRepository.updateBookingEarning(earningCondition, earningData)

          }
          content.data = 'payment_completed'
          content.title = 'Payment recieved'
          content.body = 'We have recieved your payment'
          providerService.updateProviderTripCountService(providerId)
          var updateCod = await bookingService.codeTypeUpdate(data.codType, bookingId)
        } else if (data.action === 'drop') {
          providerUnblock = 'active'
          providerService.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          content.data = 'trip_completed'
          content.title = 'Trip has been completed'
          content.body = 'Please let us know your feedback'
          if (result.data[0].paymentMode === 'cash') {
            providerWalletInfo = {}
            providerWalletInfo.userId = providerId
            providerWalletInfo.userType = 'provider'
            var appconfigPSelectSData = await adminAppConfigRepository.appConfigPageView()
            providerWalletInfo.amount = appconfigPSelectSData.data[18].Value
            var providerWallet = await walletService.debitWalletService(providerWalletInfo)

            if (!providerWallet.error) {
              providerWalletInfo.type = 'debit'
              if (result.data[0].rideName == null) {
              providerWalletInfo.description = 'Credit to wallet Service'
              } else {
              providerWalletInfo.description = 'Credit to wallet - ' + result.data[0].rideName
              }
              providerTnx = await transactionService.createTransaction(providerWalletInfo)
            }
          } else if (result.data[0].paymentMode === 'wallet') {
            var userWalletInfo = {}
            userWalletInfo.userId = result.data[0].userId
            userWalletInfo.userType = 'user'
            userWalletInfo.amount = result.data[0].estimation
            var userWallet = await walletService.debitWalletService(userWalletInfo)
            userWalletInfo.type = 'debit'
            if (result.data[0].rideName == null) {
              providerWalletInfo.description = 'Credit to wallet Service'
              } else {
              providerWalletInfo.description = 'Credit to wallet - ' + result.data[0].rideName
              }
            var userTnx = await transactionService.createTransaction(userWalletInfo)
            if (!userTnx.error) {
              var userTnxStatus = {}
              userTnxStatus.status = 'success'
              userTnxStatus.transactId = userTnx.data
              transactionService.editTransaction(userTnxStatus)
            }
            if (!userWallet.error) {
              providerWalletInfo = {}
              providerWalletInfo.userId = providerId
              providerWalletInfo.userType = 'provider'
              providerWalletInfo.amount = result.data[0].providerEarning
              walletService.creditWalletService(providerWalletInfo)
              providerWalletInfo.type = 'credit'
              if (result.data[0].rideName == null) {
              providerWalletInfo.description = 'Credit to wallet Service'
              } else {
              providerWalletInfo.description = 'Credit to wallet - ' + result.data[0].rideName
              }
              providerTnx = await transactionService.createTransaction(providerWalletInfo)
              if (!providerTnx.error) {
                providerTnxStatus = {}
                providerTnxStatus.status = 'success'
                providerTnxStatus.transactId = providerTnx.data
                transactionService.editTransaction(providerTnxStatus)
              }
            }
          } else if (result.data[0].paymentMode === 'card') {
            var amount = result.data[0].providerEarning
            var customerId = data.auth.StripeCustomerID
            var cardId = result.data[0].CardId
            var email = data.auth.Email
            var payment = paymentHelper.stripePaymentCharge(amount, customerId, cardId, email)
            if (!payment.error) {
              providerWalletInfo = {}
              providerWalletInfo.userId = providerId
              providerWalletInfo.userType = 'provider'
              providerWalletInfo.amount = result.data[0].providerEarning
              walletService.creditWalletService(providerWalletInfo)
              providerWalletInfo.type = 'credit'
              if (result.data[0].rideName == null) {
              providerWalletInfo.description = 'Credit to wallet Service'
              } else {
              providerWalletInfo.description = 'Credit to wallet - ' + result.data[0].rideName
              }
              providerTnx = transactionService.createTransaction(providerWalletInfo)

              if (!providerTnx.error) {
                providerTnxStatus = {}
                providerTnxStatus.status = 'success'
                providerTnxStatus.transactId = providerTnx.Id
                transactionService.editTransaction(providerTnx)
              }
            }
          } else if (data.codType === 'cardOnDelivery') {
             providerWalletInfo = {}
            providerWalletInfo.userId = providerId
            providerWalletInfo.userType = 'provider'
            var appconfigPSelectSData = await adminAppConfigRepository.appConfigPageView()
            providerWalletInfo.amount = appconfigPSelectSData.data[18].Value
            var providerWallet = await walletService.debitWalletService(providerWalletInfo)

            if (!providerWallet.error) {
              providerWalletInfo.type = 'debit'
              if (result.data[0].rideName == null) {
              providerWalletInfo.description = 'Credit to wallet Service'
              } else {
              providerWalletInfo.description = 'Credit to wallet - ' + result.data[0].rideName
              }
              providerTnx = await transactionService.createTransaction(providerWalletInfo)
            }
          }
        } else if (data.action === 'cancel') {
          providerUnblock = 'active'
          bookingService.providerBookingRejectUpdate(providerId, bookingId)
          providerService.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          content.data = 'booking_cancelled'
          content.title = 'Your trip has been cancelled'
          content.body = 'Please try after sometime'
        }
        if (userToken.error === false) {
          content.type = data.type
          content.orderId = JSON.stringify(bookingId)
          pushNotification.sendPushNotificationByDeviceType(userToken.data, content)
        }
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.taxiBookingHandler = async (callback) => {
    var response = {}
    try {
      var content = {}
      const bookingProcess = 'processing'
      const bookingAssigned = 'assigned'
      const bookingCancel = 'cancelled'
      const blockProviderStatus = 'blocked'
      const activeProviderStatus = 'active'
      const type = ['taxi']
      var status = ['waiting']
      var providerList
      var userDeviceInfo
      var providerInfo
      var providerDetails = null
      const weights = [
        {
          key: 'distance',
          value: -5
        },
        {
          key: 'duration',
          value: -4
        },
        {
          key: 'review',
          value: 7
        },
        {
          key: 'tripCount',
          value: -3
        }
      ]
      var waitingList = await bookingService.getBookingWaitlist(type, status)
      if (waitingList.error) {
        response.error = true
        response.msg = waitingList.msg
      } else {
        var booking = waitingList.data[0]
        var bookingId = booking.id
        var cellId = booking.cellId
        var blockList = booking.blockList === null ? [] : booking.blockList
        var assignedList = booking.assignedList === null ? [] : booking.assignedList
        var rideType = booking.rideId
        var source = [booking.lat + ',' + booking.lng]
        var neighbouringS2CellID = await common.getNeighborsUsingS2Key(booking.lat, booking.lng)
        var neighbouringCellID = neighbouringS2CellID.key
        neighbouringCellID.push(cellId)
        var mergeProviderBlockList = blockList.concat(assignedList)
        let providerBlockList = (List) => List.filter((key, value) => List.indexOf(key) === value)
        bookingService.changeBookingStatus(bookingId, bookingProcess)

        providerList = await providerService.getActiveProviderByCellId(source, neighbouringCellID, rideType, activeProviderStatus, weights, providerBlockList(mergeProviderBlockList))
        if (providerList.error) {
          content.data = 'booking_cancelled'
          content.title = 'Booking Cancelled'
          content.body = 'Sorry we dont have service at your location. Please try after some time'
          userDeviceInfo = await userService.getUserDeviceToken(waitingList.data[0].userId)
          pushNotification.sendPushNotificationByDeviceType(userDeviceInfo.data, content)
          bookingService.changeBookingStatus(bookingId, bookingCancel)
          providerService.releaseProviderService(assignedList)
          response.error = true
          response.msg = providerList.msg
        } else {
          var providerId = providerList.data[0].ProviderId
          providerInfo = await providerService.getProviderInfo(providerId)
          if (!providerInfo.error) {
            providerDetails = providerInfo.data
          }
        }
        var assign = await bookingService.updateProviderInBooking(bookingId, providerId, providerDetails)
        content.data = 'incoming_booking'
        content.title = 'Booking Alert'
        content.body = 'You have new booking request'
        content.orderId = JSON.stringify(bookingId)
        var providerToken = await providerService.getProivderMessageToken(providerId)
        pushNotification.sendPushNotificationByDeviceType(providerToken.data, content, 'default')
        providerService.providerLocationStatusUpdate(providerId, blockProviderStatus)
        bookingService.changeBookingStatus(bookingId, bookingAssigned)
        var providerUnblockList = assignedList.indexOf(providerId)
        if (providerUnblockList > -1) {
          assignedList.splice(providerList, 1)
        }
        providerService.releaseProviderService(assignedList)
        response.error = false
        response.msg = assign.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.deliveryBookingHandler = async (callback) => {
    var response = {}
    try {
      var content = {}
      const bookingProcess = 'processing'
      const bookingAssigned = 'assigned'
      const blockProviderStatus = 'blocked'
      const activeProviderStatus = 'active'
      const bookingUnassigned = 'unassigned'
      const type = ['delivery']
      var status = ['waiting', 'unassigned']
      var providerList
      var providerId
      var providerInfo
      var providerDetails = null
      const weights = [
        {
          key: 'distance',
          value: -5
        },
        {
          key: 'duration',
          value: -4
        },
        {
          key: 'review',
          value: 7
        },
        {
          key: 'tripCount',
          value: -3
        }
      ]
      var waitingList = await bookingService.getBookingWaitlist(type, status)
      if (waitingList.error) {
        response.error = true
        response.msg = waitingList.msg
      } else {
        var booking = waitingList.data[0]
        var bookingId = booking.id
        var cellId = booking.cellId
        var blockList = booking.blockList === null ? [] : booking.blockList
        var assignedList = booking.assignedList === null ? [] : booking.assignedList
        var source = [booking.lat + ',' + booking.lng]
        var neighbouringS2CellID = await common.getNeighborsUsingS2Key(booking.lat, booking.lng)
        var neighbouringCellID = neighbouringS2CellID.key
        neighbouringCellID.push(cellId)
        var mergeProviderBlockList = blockList.concat(assignedList)
        let providerBlockList = (List) => List.filter((key, value) => List.indexOf(key) === value)
        bookingService.changeBookingStatus(bookingId, bookingProcess)

        providerList = await providerService.getActiveDeliveryProviderByCellId(source, neighbouringCellID, activeProviderStatus, weights, providerBlockList(mergeProviderBlockList))
        if (providerList.error) {
          bookingService.changeBookingStatus(bookingId, bookingUnassigned)
          providerService.releaseProviderService(assignedList)
          response.error = true
          response.msg = providerList.msg
        } else {
          providerId = providerList.data[0].ProviderId
          providerInfo = await providerService.getProviderInfo(providerId)
          if (!providerInfo.error) {
            providerDetails = providerInfo.data
          }
        }
        var assign = await bookingService.updateProviderInBooking(bookingId, providerId, providerDetails)
        content.data = 'incoming_booking'
        content.title = 'Booking Alert'
        content.body = 'You have new booking request'
        content.orderId = JSON.stringify(bookingId)
        var providerToken = await providerService.getProivderMessageToken(providerId)
        pushNotification.sendPushNotificationByDeviceType(providerToken.data, content, 'default')
        providerService.providerLocationStatusUpdate(providerId, blockProviderStatus)
        bookingService.changeBookingStatus(bookingId, bookingAssigned)
        var providerUnblockList = assignedList.indexOf(providerId)
        if (providerUnblockList > -1) {
          assignedList.splice(providerList, 1)
        }
        providerService.releaseProviderService(assignedList)
        response.error = false
        response.msg = assign.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.reassignBookingCtrl = async (callback) => {
    var reassignWaitingTime
    var userType = 'provider'
    var condition = ['WAITING_TIME']
    var bookingConfig = await appConfigService.getBookingAppConfig(userType, condition)
    if (bookingConfig.error) {
      reassignWaitingTime = process.env.REASSIGN_THRESHOLD
    } else {
      reassignWaitingTime = bookingConfig.data.WAITING_TIME
    }
    var booking = await bookingService.reassignBookingService(reassignWaitingTime)
    callback(booking)
  }

  this.providerOngoingBookingCtrl = async (req, callback) => {
    var response = {}
    var data = req
    var type = data.auth.Type
    var bookingStatus = ['assigned', 'accepted', 'pickedup', 'arrived', 'dropped']
    try {
      var booking = await bookingService.getProviderBooking(data.auth.Id, bookingStatus, type)
      if (booking.error || (booking.data.type === 'services' && booking.data.status === 'accepted')) {
        response.error = true
        response.msg = 'NO_BOOKING'
      } else {
        this.formdatedata = typeof this.formdatedata === 'undefined' ? null : this.formdatedata
        var bookingInfo = booking.data
        var status = bookingInfo.status
        var userId = bookingInfo.userId
        var userInfo = await userService.getUserBookingInfo(userId)
        if (bookingStatus.includes(status)) {
          if (userInfo.error) {
            bookingInfo.userInfo = null
          } else {
            delete bookingInfo.userId
            if (bookingInfo.paymentMode === 'wallet' || booking.data.paymentMode === 'card') {
              bookingInfo.estimation = '0.00'
            }
            if (bookingInfo.type === 'delivery' && ['assigned', 'accepted', 'pickedup'].includes(bookingInfo.status)) {
              var outletInfo = await bookingService.getOutletInfo(bookingInfo.outletId)
              bookingInfo.displayName = outletInfo.error ? userInfo.data.firstName + ' ' + userInfo.data.lastName : outletInfo.data.name
              userInfo.data.mobile = outletInfo.error ? userInfo.data.mobile : outletInfo.data.contactNumber
            } else {
              bookingInfo.displayName = userInfo.data.firstName + ' ' + userInfo.data.lastName
            }
            if (bookingInfo.type === 'services') {
              var serviceType = await bookingService.getServiceTypeInfo(bookingInfo.serviceCategoryId)
              bookingInfo.serviceType = serviceType.error ? null : serviceType.data.Name
            }
            bookingInfo.userInfo = userInfo.data
          }
        } else {
          bookingInfo.userInfo = userInfo.error ? null : userInfo.data
        }
        var bookResponse = bookingInfo
        response.error = false
        response.msg = booking.msg
        response.data = bookResponse
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
