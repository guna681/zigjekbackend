module.exports = function () {
  require('dotenv').config({ path: './../.env' })
  const Common = require('../Utils/common')
  const GeoHelper = require('../thirdParty/geoHelper')
  const ProviderRespository = require('../repository/ProviderRespository')
  const WalletRepository = require('../repository/WalletRepository')
  const ProviderVehicleRepository = require('../repository/ProviderVehicleRepository')

  var common = new Common()
  var geoHelper = new GeoHelper()
  var providerRespository = new ProviderRespository()
  var walletRepository = new WalletRepository()
  var providerVehicleRepository = new ProviderVehicleRepository()

  this.providerAuthService = async (providerId, callback) => {
    var response = {}
    try {
      var providerInfo = await providerRespository.fetchProviderDetailsById(providerId)
      if (providerInfo.error) {
        response.error = true
        response.msg = 'UNAUTHORIZED'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = providerInfo.result[0]
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'UNAUTHORIZED'
      callback(err)
    }
  }
  this.checkProviderExsist = async (data, callback) => {
    var response = {}
    try {
      var condition = {}
      condition.Mobile = data.number
      condition.ExtCode = data.ext
      var provider = await providerRespository.fetchProvider(condition)

      var providerOtp = {}
      providerOtp.Mobile = data.number
      providerOtp.ExtCode = data.ext

      if (provider.error) {
        providerOtp.Type = 'register'
        providerRespository.delProviderOtp(providerOtp)
        providerOtp.OTP = common.generateOTP()

        response.error = true
        response.msg = 'NOTEXIST: $[1],mobile number'
      } else {
        var lang = {}
        var language = provider.result[0].Language
        lang.language = language
        providerOtp.Type = 'login'
        providerRespository.delProviderOtp(providerOtp)
        providerOtp.OTP = common.generateOTP()
        response.error = false
        response.msg = 'EXIST: $[1],mobile number'
        response.data = lang
      }
      providerRespository.addProviderOtp(providerOtp)
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.providerOtpResend = async (data, callback) => {
    var response = {}
    try {
      var providerData = {}
      var condition = {}
      providerData.Mobile = data.mobile
      providerData.ExtCode = data.countryCode
      condition.Type = data.type
      condition.Status = 'pending'

      var otp = await providerRespository.getProviderOtpState(providerData, condition)

      if (otp.error) {
        response.error = true
        response.msg = 'NOTEXIST: $[1],mobile number'
      } else {
        response.error = false
        response.msg = 'OTP_SENT'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.providerOtpVerify = async (data, callback) => {
    var response = {}
    try {
      var providerData = {}
      providerData.ExtCode = data.countryCode
      providerData.Mobile = data.mobile
      providerData.Type = data.type
      providerData.OTP = data.otp
      providerData.Status = 'pending'

      var otp = await providerRespository.updateProviderOtpState(providerData, 'verified')

      if (otp.error) {
        response.error = true
        response.msg = 'OTP'
      } else {
        if (data.type === 'login') {
          var providerInfo = {}
          providerInfo.Mobile = data.mobile
          providerInfo.ExtCode = data.countryCode
          var provider = await providerRespository.fetchProvider(providerInfo)

          if (provider.error) {
            response.error = true
            response.msg = 'NOTEXIST: $[1],mobile number'
          } else {
            var providerDetails = provider.result[0]
            var auth = {}
            auth.firstName = providerDetails.FirstName
            auth.lastName = providerDetails.LastName
            auth.mobile = providerDetails.Mobile
            auth.countryCode = providerDetails.ExtCode
            auth.image = providerDetails.Image
            auth.rating = providerDetails.Rating
            auth.token = await common.generateToken({ Id: providerDetails.Id }, process.env.JWT_SECRET)
            var updateLangName = {}
            var providerId = providerDetails.Id
            updateLangName.where = {
              Id: providerId
            }
            updateLangName.update = {
              Language: data.languageName
            }
            providerRespository.providerUpdateLang(updateLangName)

            response.data = auth
            response.error = false
            response.msg = 'OTP'
          }
        } else {
          response.error = false
          response.msg = 'OTP'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.createProvider = async (data, callback) => {
    var response = {}
    try {
      var providerData = {}
      providerData.Mobile = data.mobile
      providerData.ExtCode = data.countryCode

      var condition = {}
      condition.Type = 'register'
      condition.Status = 'verified'

      var otpstatus = await providerRespository.getProviderOtpState(providerData, condition)

      providerData.FirstName = data.firstName
      providerData.LastName = data.lastName
      providerData.Email = data.email
      providerData.DeviceId = data.uuid
      providerData.CountryId = data.countryId
      providerData.Status = 'verified'
      providerData.IsMobileVerified = '1'
      providerData.IsEmailVerified = '0'
      providerData.IsActive = 'no'
      providerData.LoginType = data.loginType
      providerData.SocialToken = data.socialToken === undefined ? null : data.socialToken
      providerData.Language = data.languageName
      providerData.Password = data.password ? await common.hashPassword(data.password, 11) : null

      if (otpstatus.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
      } else {
        var provider = await providerRespository.addProvider(providerData)
        if (provider.error) {
          response.error = true
          response.msg = 'EXIST: $[1],mobile number or email'
        } else {
          var auth = {}
          auth.firstName = providerData.FirstName
          auth.lastName = providerData.LastName
          auth.mobile = providerData.Mobile
          auth.countryCode = providerData.ExtCode
          auth.image = null
          auth.rating = providerData.Rating
          auth.token = await common.generateToken({ Id: provider.result }, process.env.JWT_SECRET)
          response.error = false
          response.data = auth
          response.msg = 'INSERTED'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.providerPwdVerify = async (data, callback) => {
    var response = {}
    try {
      var mobile = {}
      mobile.Mobile = data.mobile
      mobile.ExtCode = data.countryCode
      var providerDetails = await providerRespository.fetchProvider(mobile)
      var provider = providerDetails.result[0]

      var compare = await common.comparePassword(data.password, provider.Password)

      if (compare) {
        var auth = {}
        auth.Id = provider.Id

        var providerData = {}
        providerData.firstName = provider.FirstName
        providerData.lastName = provider.LastName
        providerData.image = provider.Image
        providerData.mobile = provider.Mobile
        providerData.rating = provider.Rating
        providerData.token = await common.generateToken(auth, process.env.JWT_SECRET)

        response.error = false
        response.data = providerData
        response.msg = 'PASSWORD'
      } else {
        response.error = true
        response.msg = 'PASSWORD'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.providerForgotOtp = async (data, callback) => {
    var response = {}
    try {
      var userData = {}
      userData.Mobile = data.mobile
      userData.ExtCode = data.countryCode
      var userInfo = await providerRespository.fetchProvider(userData)
      if (userInfo.error) {
        response.error = true
        response.msg = 'EXIST: $[1],mobile number or email'
      } else {
        var otpDetails = {}
        otpDetails.Mobile = userData.Mobile
        otpDetails.ExtCode = userData.ExtCode

        providerRespository.delProviderOtp(otpDetails)

        otpDetails.OTP = common.generateOTP()
        otpDetails.Type = 'resetPwd'
        var otpState = await providerRespository.addProviderOtp(otpDetails)
        if (otpState.error) {
          response.error = true
          response.msg = 'EXIST: $[1],mobile number or email'
        } else {
          response.error = false
          response.msg = 'OTP_SENT'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.resetProviderPwd = async (data, callback) => {
    var response = {}
    try {
      var otp = {}
      otp.Mobile = data.mobile
      otp.ExtCode = data.countryCode
      otp.OTP = data.otp
      otp.Type = 'resetPwd'
      var condition = {}
      condition.Status = 'verified'
      var otpState = await providerRespository.getProviderOtpState(otp, condition)

      if (otpState.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
      } else {
        var mobile = {}
        mobile.Mobile = data.mobile
        mobile.ExtCode = data.countryCode
        await providerRespository.delProviderOtp(otp)
        mobile.Password = await common.hashPassword(data.password, 11)
        var updateUser = await providerRespository.updateProviderDetails(mobile)
        if (updateUser.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],password'
        } else {
          var userDetails = await providerRespository.fetchProvider(mobile)
          var userInfo = userDetails.result[0]
          var user = {}
          user.firstName = userInfo.FirstName
          user.lastName = userInfo.LastName
          user.image = userInfo.Image
          user.mobile = userInfo.Mobile
          user.rating = userInfo.Rating

          var device = {}
          device.Id = userDetails.Id
          user.token = await common.generateToken(device, process.env.JWT_SECRET)

          response.error = false
          response.msg = 'UPDATE'
          response.data = user
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.providerLocationUpdateService = async (data, callback) => {
    var response = {}
    try {
      var coordinates = {}
      coordinates.Latitude = data.latitude
      coordinates.Longitude = data.longitude
      coordinates.Bearing = data.bearing
      var cellId = await common.getCellIdFromCoordinates(data.latitude, data.longitude)
      coordinates.S2CellId = cellId.id
      var providerId = data.auth.Id
      var providerlocation = await providerRespository.updateProviderLocationById(coordinates, providerId)

      if (providerlocation.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1],location'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.providerDeviceUpdateService = async (data, callback) => {
    var response = {}
    try {
      var device = {}
      device.GCMId = data.fcmToken
      device.MobileModel = data.model
      device.MobileBrand = data.brand
      device.OS = data.os
      device.OSVersion = data.osVersion
      device.AppVersion = data.appVersion

      var token = await providerRespository.updateProivderFCMToken(device, data.auth.Id)
      if (token.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1]'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderDetails = async (data, callback) => {
    var response = {}
    try {
      var provider = {}
      var providerDetails = {}
      var providerId = data.auth.Id
      provider.Id = providerId
      var providerInfo = await providerRespository.fetchProvider(provider)

      if (providerInfo.error) {
        response.error = true
        response.msg = 'UNAUTHORIZED'
      } else {
        providerDetails.firstName = providerInfo.result[0].FirstName
        providerDetails.lastName = providerInfo.result[0].LastName
        providerDetails.mobile = providerInfo.result[0].Mobile
        providerDetails.countryCode = providerInfo.result[0].ExtCode
        providerDetails.image = providerInfo.result[0].Image
        if (providerInfo.result[0].Password) {
          providerDetails.passwordLength = 8
          providerDetails.password = '********'
        }
        providerDetails.email = providerInfo.result[0].Email
        response.error = false
        response.result = providerDetails
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      response.error = true
      response.result = null
      response.msg = 'OOPS'
      callback(response)
    }
  }

  this.updateProviderProfile = async (data, callback) => {
    var response = {}
    try {
      var condition = data.fieldName
      var value = data.data
      var providerId = {}
      providerId.Id = data.auth.Id
      var error = ''
      var errorMsg = ''
      var userDetails = await providerRespository.fetchProvider(providerId)
      switch (condition) {
        case 'firstName':
          condition = 'FirstName'
          if (value === userDetails.result[0].FirstName) {
            error = true
            errorMsg = 'EXIST: $[1],Firstname'
          } else {
            error = false
          }
          break

        case 'lastName':
          condition = 'LastName'
          if (value === userDetails.result[0].LastName) {
            error = true
            errorMsg = 'EXIST: $[1],Lastname'
          } else {
            error = false
          }
          break

        case 'email':
          condition = 'Email'
          if (value === userDetails.result[0].Email) {
            error = true
            errorMsg = 'EXIST: $[1], Email'
          } else {
            error = false
          }
          break

        case 'password':
          condition = 'Password'
          var param = JSON.parse(value)

          try {
            var oldpassword = await common.comparePassword(param[0], userDetails.result[0].Password)
            var newpassword = await common.comparePassword(param[1], userDetails.result[0].Password)

            if (oldpassword === false) {
              error = true
              errorMsg = 'PASSWORD'
            } else if (newpassword === true) {
              error = true
              errorMsg = 'PASSWORD_EXISTS'
            } else if (oldpassword === true && newpassword === false) {
              value = await common.hashPassword(param[1], 11)
              error = false
            }
          } catch (err) {
            error = true
            errorMsg = 'PASSWORD'
          }
          break

        case 'image':
          condition = 'Image'
          if (value.length === 0) {
            error = true
            errorMsg = 'INVALID: $[1],Image URL'
          } else {
            error = false
          }
          break
        default:
          condition = 'invalid'
          error = true
          errorMsg = 'OOPS'
          break
      }
      providerId[condition] = value
      if (error) {
        response.error = true
        response.msg = errorMsg
      } else {
        var updateInfo = await providerRespository.updateProviderDetailsUsingId(providerId)
        if (updateInfo.error) {
          response.error = true
          response.msg = 'EXIST: $[1],' + condition
        } else {
          response.error = false
          response.msg = 'UPDATE'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.providerFileUploadService = async (data, callback) => {
    var response = {}
    try {
      var dir = 'provider'
      var file = await common.fileUpload(data, dir)
      if (file.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1],file'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = { imageUrl: file.msg }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.matchUserProvider = (data, callback) => {
    var response = {}
    try {
      var provider = []
      var condition = {}
      var weight = [
        {
          key: 'distance',
          value: -2
        },
        {
          key: 'time',
          value: -3
        },
        {
          key: 'review',
          value: 3
        },
        {
          key: 'tripCount',
          value: -1
        }
      ]
      weight.forEach(value => {
        condition[value.key] = value.value
      })
      data.forEach(element => {
        var providerGeoData = common.weightCalculator(element, condition)
        provider.push(providerGeoData)
      })

      if (provider.length > 0) {
        response.error = false
        response.msg = 'VALID'
        response.data = provider
      } else {
        response.error = true
        response.msg = 'NO_PROVIDER'
        response.data = provider
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.providerStatusUpdate = async (data, rideSharing, rideTypeIds, callback) => {
    var response = {}
    rideSharing = rideSharing.error === false ? 'yes' : 'no'
    try {
      var providerId = {}
      providerId.Id = data.auth.Id
      var provider = await providerRespository.fetchProvider(providerId)
      var status
      if (provider.error) {
        response.error = true
        response.msg = 'NO_PROVIDER'
      } else {
        var state = provider.result[0].IsActive
        if (state === 'yes') {
          providerId.IsActive = 'no'
          status = await providerRespository.updateProviderDetailsUsingId(providerId)
          if (status.error) {
            response.error = true
            response.msg = 'OOPS'
          } else {
            await providerRespository.deleteProviderLocationUpdate(data.auth.Id)
            response.error = false
            response.msg = 'STATUS_TOGGLE: $[1], Offline'
            response.data = { status: 'offline' }
          }
        } else if (state === 'no') {
          providerId.IsActive = 'yes'
          status = await providerRespository.updateProviderDetailsUsingId(providerId)
          providerRespository.addProviderActiveLocation(data.auth.Id, rideSharing, rideTypeIds, 'active')
          if (status.error) {
            response.error = true
            response.msg = 'OOPS'
          } else {
            response.error = false
            response.msg = 'STATUS_TOGGLE: $[1], Online'
            response.data = { status: 'online' }
          }
        } else {
          response.error = true
          response.msg = 'NO_PROVIDER'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getActiveProviderByCellId = (target, cellId, rideType, providerStatus, weights, blockList) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        // condition.RideTypeId = rideType
        condition.Status = providerStatus
        var provider = await providerRespository.fetchProviderByCellId(condition, cellId, blockList, rideType)

        if (provider.error) {
          response.error = true
          response.msg = 'NO_PROVIDER_AVAILABLE'
        } else {
          var origin = target
          var destination = provider.result.map(element => {
            return element.Latitude + ',' + element.Longitude
          })

          var matrix = await geoHelper.getProviderGeoMatrix(origin, destination)

          var data = provider.result.map((elements, index) => {
            elements['distance'] = matrix.result[index].distance
            elements['duration'] = matrix.result[index].duration
            return common.weightCalculator(elements, weights)
          })

          data.sort((a, b) => a.total - b.total)

          response.error = false
          response.data = data
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

  this.providerLocationStatusUpdate = async (providerId, status) => {
    var response = {}
    try {
      var provider = {}
      provider.ProviderId = providerId
      provider.Status = status
      var location = await providerRespository.updateProviderLocationStatus(provider)
      if (location.error) {
        response.error = true
        response.msg = 'OOPS'
      } else {
        response.error = false
        response.msg = 'VALID'
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
    }
  }

  this.getProivderMessageToken = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var provider = {}
        provider.Id = providerId
        var providerInfo = await providerRespository.fetchProvider(provider)
        if (providerInfo.error) {
          response.error = true
          response.msg = 'NO_PROVIDER'
        } else {
          var deviceToken = {}
          deviceToken.token = providerInfo.result[0].GCMId
          deviceToken.deviceType = providerInfo.result[0].OS.toLowerCase()
          response.error = false
          response.data = deviceToken
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

  this.providerDashboardService = async (data, callback) => {
    var response = {}
    try {
      var dashboard = {
        'earnings': [
          {
            'title': 'Today',
            'sub_title_1': 'Trips',
            'sub_title_2': 'Earnings',
            'value_1': '0',
            'value_2': '0',
            'key': 'today'
          },
          {
            'title': 'Week',
            'sub_title_1': 'Trips',
            'sub_title_2': 'Earnings',
            'value_1': '0',
            'value_2': '0',
            'key': 'week'
          },
          {
            'title': 'Month',
            'sub_title_1': 'Trips',
            'sub_title_2': 'Earnings',
            'value_1': '0',
            'value_2': '0',
            'key': 'month'
          },
          {
            'title': 'Lifetime',
            'sub_title_1': 'Trips',
            'sub_title_2': 'Earnings',
            'value_1': '0',
            'value_2': '0',
            'key': 'total'
          }
        ],
        'cardetails': {
          'carName': 'Test Car',
          'carType': 'All',
          'carImage': 'https://www.cartoq.com/wp-content/uploads/2018/07/Baleno_2.jpg'
        },
        'activeVehicle': null
      }
      var provider = {}
      provider.Id = data.auth.Id
      var providerInfo = await providerRespository.fetchProvider(provider)
      if (providerInfo.error) {
        response.error = true
        response.msg = 'OOPS'
      } else {
        dashboard.isOnline = providerInfo.result[0].IsActive
        dashboard.rating = providerInfo.result[0].Rating
        response.data = dashboard
        response.error = false
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.getproviderCancelPolicyList = async (data, callback) => {
    var type = { UserType: 'provider' }
    var response = {}
    var canceldata = []
    try {
      var cancelDetails = await providerRespository.fetchProviderCancelPolicyList(type)
      if (cancelDetails.error) {
        response.error = true
        response.msg = 'NO_DATA'
      } else {
        cancelDetails.result.filter((x) => {
          canceldata.push({ Id: x.Id, Description: x.Description })
        })
        canceldata.push({ Description: 'Others' })
        response.error = false
        response.result = canceldata
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderStaticPageList = async (data, callback) => {
    var response = {}
    var staticdata = []
    var staticgetdata = {}
    try {
      if (data.id) {
        var type = { Id: data.id }
        var staticGetDetails = await providerRespository.fetchProviderStaticPageView(type)
        if (staticGetDetails.error) {
          response.error = true
          response.result = null
          response.msg = 'UNAUTHORIZED'
        } else {
          staticGetDetails.result.filter((x) => {
            staticgetdata.content = x.HtmlContent
          })
          response.error = false
          response.result = staticgetdata
          response.msg = 'VALID'
        }
      } else {
        var staticDetails = await providerRespository.fetchProviderStaticPageList()
        if (staticDetails.error) {
          response.error = true
          response.result = null
          response.msg = 'UNAUTHORIZED'
        } else {
          staticDetails.result.filter((x) => {
            staticdata.push({ Id: x.Id, PageName: x.PageName })
          })
          response.error = false
          response.result = staticdata
          response.msg = 'VALID'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderInfo = (providerId) => {
    var response = {}

    return new Promise(async function (resolve) {
      try {
        var provider = {}
        provider.Id = providerId
        var providerInfo = await providerRespository.fetchProvider(provider)
        if (providerInfo.error) {
          response.error = true
          response.msg = 'NO_PROVIDER'
        } else {
          var providerDetails = providerInfo.result.map(element => {
            var providers = {}
            providers['firstName'] = element.FirstName
            providers['lastName'] = element.LastName
            providers['image'] = element.Image
            providers['mobile'] = element.Mobile
            providers['countryCode'] = element.ExtCode
            providers['rating'] = element.Rating
            providers['vehicleName'] = element.VehicleBrand === null ? 'Test Vehicle' : element.VehicleBrand
            providers['vehicleModel'] = element.VehicleModel === null ? 'Test Model' : element.VehicleModel
            providers['vehicleNo'] = element.VehicleNumber === null ? 'TE 5T 7ES7' : element.VehicleNumber
            providers['tripCount'] = element.TripCount === null ? '0' : element.TripCount.toString()
            return providers
          })

          response.error = false
          response.msg = 'VALID'
          response.data = providerDetails[0]
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderDeviceToken = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var provider = {}
        provider.Id = providerId
        var providerInfo = await providerRespository.fetchProvider(provider)
        if (providerInfo.error) {
          response.error = true
          response.msg = 'INVALID_PROVIDER'
        } else {
          var providerDetails = providerInfo.result.map(element => {
            var providers = {}
            providers['token'] = element.GCMId
            providers['deviceType'] = element.OS
            return providers
          })
          response.error = false
          response.msg = 'VALID'
          response.data = providerDetails[0]
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.providerRatingUpdate = (providerId, Average) => {
    providerRespository.updateProviderRating(providerId, Average)
  }

  this.getproviderRatingUpdate = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var data = {}
        data.Id = providerId
        var provider = await providerRespository.fetchProvider(providerId)
        if (provider.error) {
          var rating = provider.result[0].Rating
          response.rating = rating
        } else {
          response.rating = '0.0'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.updateProviderActiveVehicleDetails = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var vehicleId = data.Id
        var providerId = data.ActiveVehicleId
        var vehicleInfo = await providerVehicleRepository.fetchProviderVehicleDetails(providerId, vehicleId)
        if (vehicleInfo.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],vehicle'
        } else {
          var vehicleDetails = {}
          var vehicleData = vehicleInfo.data
          vehicleDetails.Id = providerId
          vehicleDetails.VehicleBrand = vehicleData.VehicleBrandName
          vehicleDetails.VehicleModel = vehicleData.VehicleModelName
          vehicleDetails.VehicleNumber = vehicleData.VehicleNumber
          providerRespository.updateVehicleDetails(vehicleDetails)
          response.error = false
          response.msg = 'UPDATE'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.changeProviderActiveVehicle = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var vehicleInfo = {}
        vehicleInfo.Id = data.Id
        vehicleInfo.ActiveVehicleId = data.activeVehicleId
        vehicleInfo.VehicleBrand = data.vehicleBrand
        vehicleInfo.VehicleModel = data.vehicleModel
        vehicleInfo.VehicleNumber = data.vehicleNumber
        var providerVehicle = await providerRespository.updateVehicleDetails(vehicleInfo)
        if (providerVehicle.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],vehicle'
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

  this.providerDocumentListingService = async (data, callback) => {
    var response = {}
    try {
      var docType = data.docType
      var providerId = data.auth.Id
      switch (docType) {
        case 'provider':
          docType = 'provider'
          break
        case 'vehicle':
          docType = 'vehicle'
          break
        case 'bank':
          docType = 'bank'
      }
      var recentUploads = await providerRespository.fetchProviderDocumentExist(providerId)
      if (recentUploads.error) {
        recentUploads.result = []
      }
      var document = await providerRespository.fetchProviderDocList(docType)
      if (document.error) {
        response.error = true
        response.msg = 'NO_DATA'
      } else {
        var documentList = document.result.map(element => {
          var doc = {}
          doc['id'] = element.Id
          doc['name'] = element.Name
          doc['fieldName'] = element.FieldName
          doc['isMandatory'] = element.IsRequired ? 'yes' : 'no'
          doc['docType'] = element.DocType
          var compareDoc = recentUploads.result.find((doc) => {
            return doc.DocTypeId === element.Id
          })
          doc['isApproved'] = compareDoc ? compareDoc.Status : 'new'
          doc['type'] = element.Type
          return doc
        })
        response.error = false
        response.msg = 'VALID'
        response.data = documentList
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      console.log(err)
      callback(response)
    }
  }

  this.providerDocumentUpdateService = async (data, callback) => {
    var response = {}
    try {
      var providerDocument = {}
      providerDocument.DocTypeId = data.docType
      providerDocument.ProviderId = data.auth.Id
      providerDocument.File = data.path
      providerDocument.Status = 'pending'

      var document = await providerRespository.updateProviderDocument(providerDocument)
      if (document.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1],document'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.providersSocialTokenchecksService = async (data, callback) => {
    var response = {}
    try {
      var senddata = {
        LoginType: data.loginType,
        SocialToken: data.socialToken
      }
      var provider = await providerRespository.fetchProvider(senddata)
      if (provider.error) {
        response.error = true
        response.msg = 'NOTEXIST: $[1],provider'
      } else {
        var providerDetails = provider.result[0]
        var auth = {}
        auth.firstName = providerDetails.FirstName
        auth.lastName = providerDetails.LastName
        auth.mobile = providerDetails.Mobile
        auth.countryCode = providerDetails.ExtCode
        auth.image = providerDetails.Image
        auth.rating = providerDetails.Rating
        auth.token = await common.generateToken({ Id: providerDetails.Id }, process.env.JWT_SECRET)
        response.data = auth
        response.error = false
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }
  this.getProivderPaymentCharge = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var providerInfo = await providerRespository.fetchProviderDetailsById(providerId)
        if (providerInfo.error) {
          response.error = true
          response.msg = 'NO_PROVIDER'
        } else {
          response.error = false
          response.data = providerInfo.result[0]
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
  this.updateProviderStripeAccountID = async (data, providerid) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var updatedata = { Id: providerid, StripeAccountID: data }
        var updateproviderDetails = await providerRespository.updateProviderDetailsUsingId(updatedata)
        if (updateproviderDetails.error) {
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
  this.providerUpdateLanguageService = async (data, callback) => {
    var response = {}
    try {
      var providerId = data.auth.Id
      var providerLang = {
        where: {
          Id: providerId
        },
        update: {
          Language: data.languageName
        }
      }
      var langDetails = await providerRespository.providerUpdateLang(providerLang)
      if (langDetails.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1],Language'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.createWithDrawalRequest = async (data, callback) => {
    var response = {}
    try {
      var providerId = data.auth.Id
      var walletInfo = {}
      walletInfo.UserTypeId = providerId
      walletInfo.UserType = 'provider'

      var walletBalance = await walletRepository.fetchWalletInfo(walletInfo)
      if (walletBalance.error) {
        response.error = true
        response.msg = 'WITHDRAWAL_FAIL'
      } else {
        var balance = walletBalance.result.Balance
        if (parseInt(balance) >= parseInt(data.amount)) {
          var providerInfo = {}
          providerInfo.Amount = data.amount
          providerInfo.ProviderId = providerId
          var withdrawal = await walletRepository.insertWithdrawalRequest(providerInfo)
          if (withdrawal.error) {
            response.error = true
            response.msg = 'WITHDRAWAL_FAIL'
          } else {
            var debitWallet = {}
            debitWallet.UserTypeId = providerId
            debitWallet.UserType = 'provider'
            debitWallet.Amount = data.amount
            walletRepository.debitWallet(debitWallet)
            response.error = false
            response.msg = 'WITHDRAWAL_SUCCESS'
            response.data = withdrawal.result
          }
        } else {
          response.error = true
          response.msg = 'LOW_WALLET_BALANCE'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.getProviderBookingStacksService = async (data, callback) => {
    var response = {}
    var resultData = {}
    try {
      var providerId = data.auth.Id
      var year = data.year
      var providerdata = {
        UserTypeId: providerId,
        UserType: 'provider'
      }
      var providerInfoData = await walletRepository.fetchWalletInfo(providerdata)
      var providerBookingInfo = await providerRespository.getProviderBookingStacksData(providerId, year)

      if (providerInfoData.error && providerBookingInfo.error) {
        response.error = true
        response.msg = 'FAILED'
      } else {
        var balance = providerInfoData.result.Balance
        var tripdata = []
        var tripCount = 0
        var tripEarnings = 0.0
        providerBookingInfo.data.map((x) => {
          tripCount += parseInt(x.count)
          tripEarnings += parseFloat(x.total)
          tripdata.push({
            month: x.month,
            count: x.count,
            earnings: x.total
          })
        })
        resultData.tripCount = tripCount
        resultData.tripEarnings = tripEarnings.toFixed(2)
        resultData.tripEarningTxt = '$ ' + resultData.tripEarnings
        resultData.remainingBalance = balance
        resultData.remainingBalanceTxt = balance >= 0 ? '$ ' + balance : '- $ ' + Math.abs(balance)
        resultData.tripMonths = tripdata
        response.error = false
        response.msg = 'VALID'
        response.data = resultData
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.updateProviderTripCountService = async (data) => {
    var response = {}
    return new Promise(function (resolve) {
      try {
        var providerId = data
        providerRespository.updateTripCount(providerId)
        response.error = false
        response.msg = 'VALID'
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.releaseProviderService = async (providerIds) => {
    var response = {}
    return new Promise(function (resolve) {
      try {
        let status = 'active'
        providerRespository.updateBulkdProviderLocationState(providerIds, status)
        response.error = false
        response.msg = 'VALID'
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.createProviderPaymentService = async (data, callback) => {
    var response = {}
    try {
      var providerInfo = JSON.parse(data.data)
      var value = Object.keys(providerInfo).map(element => {
        return { PaymentField: element, Value: providerInfo[element], ProviderId: data.auth.Id }
      })

      var updateInfo = await providerRespository.insertFinancialInfo(value)

      if (updateInfo.error) {
        response.error = true
        response.msg = 'OOPS'
      } else {
        response.error = false
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
