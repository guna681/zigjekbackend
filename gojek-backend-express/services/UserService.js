module.exports = function () {
  const UserRepository = require('../repository/UserRepository')
  const Common = require('../Utils/common')
  const Mailer = require('../Utils/mailer')

  var common = new Common()
  var userRepository = new UserRepository()
  var mailer = new Mailer()

  this.userAuthService = async (userId, callback) => {
    var response = {}

    try {
      var userInfo = await userRepository.fetchUserDetailsById(userId)
      if (userInfo.error) {
        response.error = true
        response.msg = 'UNAUTHORIZED'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = userInfo.result[0]
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.checkUserExists = async (mobile, callback) => {
    var response = {}
    try {
      var check = {}
      check.Mobile = mobile.number
      check.Ext = mobile.ext
      await userRepository.delOtp(check)
      check.OTP = common.generateOTP()
      var user = await userRepository.validateUser(mobile)
      if (user.error) {
        check.Type = 'register'
        await userRepository.addOtp(check)
        response.error = true
        response.msg = 'NOTEXIST: $[1],mobile number'
      } else {
        var data = {}
        var language = user.result[0].Language === null ? 'default' : user.result[0].Language
        data.language = language
        check.Type = 'login'
        await userRepository.addOtp(check)
        response.error = false
        response.msg = 'EXIST: $[1],mobile number'
        response.data = data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.createUser = async (data, callback) => {
    var response = {}
    try {
      var user = {}
      user.FirstName = data.firstName
      user.LastName = data.lastName
      user.Mobile = data.mobile
      user.Email = data.email
      user.CountryId = data.countryId
      user.LoginType = 1
      user.ExtCode = data.countryCode
      user.LoginType = data.loginType
      user.SocialToken = data.socialToken
      user.Language = data.languageName
      user.Password = data.password ? await common.hashPassword(data.password, 11) : null
      user.Status = 'verified'

      var details = {}
      details.Mobile = data.mobile
      details.Type = 'register'
      details.Status = 'verified'

      const deviceId = data.uuid

      var verify = await userRepository.fetchOtp(details)

      if (verify.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
      } else {
        var addUser = await userRepository.addUser(user)
        if (addUser.error) {
          response.error = true
          response.msg = 'EXIST: $[1],mobile number or email'
        } else {
          var device = {}
          device.UserId = addUser.result
          device.DeviceId = deviceId
          var deviceKey = await userRepository.fetchUserDevice(deviceId)
          var deviceInfoId = ''

          if (deviceKey.error) {
            var addDevice = await userRepository.addUserDevice(device)
            deviceInfoId = addDevice.result
          } else {
            await userRepository.updateUserDevice(device)
            deviceInfoId = deviceKey.result[0].Id
          }

          var auth = {}
          auth.Id = addUser.result
          auth.Device = deviceInfoId
          var userDetails = {}
          userDetails.firstName = data.firstName
          userDetails.lastName = data.lastName
          userDetails.mobile = data.mobile
          userDetails.image = null
          userDetails.rating = '0.0'
          userDetails.token = await common.generateToken(auth, process.env.JWT_SECRET)
          // this.Mailer(data.email, 'Welcome Mail', 'Its good to have you onboard')

          response.error = false
          response.msg = 'INSERTED'
          response.data = userDetails
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.resendOtp = async (data, callback) => {
    var response = {}
    try {
      var sendOtp = await this.fetchOtp(data)
      if (sendOtp.error) {
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
      callback(response)
    }
  }

  this.verifyOTP = async (data, callback) => {
    var response = {}
    try {
      var otpState = {}
      otpState.Mobile = data.mobile
      otpState.Otp = data.otp
      otpState.Type = data.type
      otpState.Ext = data.countryCode
      otpState.Status = 'pending'

      var deviceId = data.uuid
      var otp = await userRepository.validateOtp(otpState)
      if (otp.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
      } else {
        var status = await userRepository.updateOtpStatus(otpState, 'verified')
        if (status.error) {
          response.error = true
          response.msg = 'OTP_VERIFY'
        } else {
          if (data.type === 'login') {
            var mobile = {}
            mobile.Mobile = data.mobile
            mobile.ExtCode = data.countryCode
            var userInfo = await userRepository.fetchUserDetails(mobile)
            var rider = {}
            rider.firstName = userInfo.result[0].FirstName
            rider.lastName = userInfo.result[0].LastName
            rider.mobile = userInfo.result[0].Mobile
            rider.image = userInfo.result[0].Image
            rider.rating = userInfo.result[0].Rating

            var deviceDetails = {}
            deviceDetails.UserId = userInfo.result[0].Id
            deviceDetails.DeviceId = deviceId
            var updateLangName = {}
            var UserId = userInfo.result[0].Id
            updateLangName.Language = data.languageName
            var updateDeviceList = await userRepository.updateUserDevice(deviceDetails)
            await userRepository.updateUserProfileUsingId(updateLangName, UserId)

            if (updateDeviceList.error) {
              await userRepository.addUserDevice(deviceDetails)
            }
            var auth = {}
            auth.Id = userInfo.result[0].Id

            var device = await userRepository.fetchUserDevice(deviceId)
            auth.Device = device.error ? null : device.result[0].Id
            rider.token = await common.generateToken(auth, process.env.JWT_SECRET)

            response.error = false
            response.msg = 'OTP'
            response.data = rider
          } else {
            response.error = false
            response.msg = 'OTP'
          }
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.verifyPwd = async (data, callback) => {
    var response = {}
    try {
      var mobile = {}
      mobile.Mobile = data.mobile
      mobile.ExtCode = data.countryCode
      var userDetails = await userRepository.fetchUserDetails(mobile)

      var compare = await common.comparePassword(data.password, userDetails.result[0].Password)

      if (compare) {
        var device = {}
        device.UserId = userDetails.result[0].Id
        device.DeviceId = data.uuid

        var userDevice = await userRepository.fetchUserDevice(data.uuid)
        if (userDevice.error) {
          await userRepository.addUserDevice(device)
        } else {
          await userRepository.updateUserDevice(device)
        }
        var user = {}
        user.firstName = userDetails.result[0].FirstName
        user.lastName = userDetails.result[0].LastName
        user.image = userDetails.result[0].Image
        user.mobile = userDetails.result[0].Mobile
        user.rating = userDetails.result[0].Rating
        var passportData = {
          client_id: process.env.PASSPORT_CLIENT_ID,
          client_secret: process.env.PASSPORT_CLIENT_SECRET,
          grant_type: process.env.PASSPORT_GRANT_TYPE,
          username: user.mobile,
          password: data.password,
          scope: process.env.PASSPORT_SCOPE
        }
        user.token = await common.generateAccessToken(passportData)

        response.error = false
        response.msg = 'PASSWORD'
        response.data = user
      } else {
        response.error = true
        response.msg = 'PASSWORD'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.generateForgotOtp = async (data, callback) => {
    var response = {}
    try {
      var mobile = {}
      mobile.Mobile = data.mobile
      mobile.ExtCode = data.countryCode
      var checkUserExists = await userRepository.fetchUserDetails(mobile)
      if (checkUserExists) {
        var otpDetails = {}
        otpDetails.Mobile = data.mobile
        otpDetails.Ext = data.countryCode

        await userRepository.delOtp(otpDetails)

        otpDetails.OTP = common.generateOTP()
        otpDetails.Type = 'resetPwd'
        var otpState = await userRepository.addOtp(otpDetails)

        if (otpState) {
          response.error = true
          response.msg = 'OTP_FAIL'
        } else {
          response.error = false
          response.msg = 'OTP'
        }
      } else {
        response.error = true
        response.msg = 'NOTEXIST: $[1],mobile number'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.resetPwd = async (data, callback) => {
    var response = {}
    try {
      var otp = {}
      otp.Mobile = data.mobile
      otp.Ext = data.countryCode
      otp.OTP = data.otp
      otp.Type = 'resetPwd'
      var status = 'verified'
      var otpState = await userRepository.updateOtpStatus(otp, status)

      if (otpState.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
      } else {
        var mobile = {}
        mobile.Mobile = data.mobile
        mobile.ExtCode = data.countryCode
        await userRepository.delOtp(otp)
        mobile.Password = await common.hashPassword(data.password, 11)

        var updateUser = await userRepository.updateUserDetails(mobile)

        if (updateUser.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],password'
        } else {
          var userDetails = await userRepository.fetchUserDetails(mobile)
          var user = {}
          user.firstName = userDetails.FirstName
          user.lastName = userDetails.LastName
          user.image = userDetails.Image
          user.mobile = userDetails.Mobile
          user.rating = userDetails.Rating

          var device = {}
          device.Id = userDetails.Id
          device.Device = await userRepository.fetchUserDevice(data.uuid)

          user.token = await common.generateToken(device, process.env.JWT_SECRET)

          mailer.Mailer(userDetails.result[0].Email, 'Reset Password', 'Its seems you have reseted your password')

          response.error = false
          response.msg = 'VALID'
          response.data = user
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getUserDetails = async (data, callback) => {
    var userId = data.auth.Id
    var response = {}
    var user = {}

    try {
      var userDetails = await userRepository.fetchUserDetailsById(userId)
      if (userDetails.error) {
        response.error = true
        response.msg = 'UNAUTHORIZED'
      } else {
        user.firstName = userDetails.result[0].FirstName
        user.lastName = userDetails.result[0].LastName
        user.mobile = userDetails.result[0].Mobile
        user.countryCode = userDetails.result[0].ExtCode
        user.image = userDetails.result[0].Image
        if (userDetails.result[0].Password) {
          user.passwordLength = 8
          user.password = '********'
        }
        user.email = userDetails.result[0].Email
        response.error = false
        response.result = user
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

  this.updateUserProfile = async (data, callback) => {
    var response = {}
    try {
      var condition = data.fieldName
      var value = data.data
      var userId = data.auth.Id
      var error = ''
      var errorMsg = ''
      var userDetails = await userRepository.fetchUserDetailsById(userId)
      switch (condition) {
        case 'firstName':
          condition = 'FirstName'
          if (value === userDetails.result[0].FirstName) {
            error = true
            errorMsg = 'EXIST: $[1],Firstname'
          } else {
            error = false
            errorMsg = 'PROFILE_UPDATE: $[1], Firstname'
          }
          break

        case 'lastName':
          condition = 'LastName'
          if (value === userDetails.result[0].LastName) {
            error = true
            errorMsg = 'EXIST: $[1],Lastname'
          } else {
            error = false
            errorMsg = 'PROFILE_UPDATE: $[1], Lastname'
          }
          break

        case 'email':
          condition = 'Email'
          if (value === userDetails.result[0].Email) {
            error = true
            errorMsg = 'EXIST: $[1], Email'
          } else {
            error = false
            errorMsg = 'PROFILE_UPDATE: $[1], Email'
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
              errorMsg = 'PROFILE_UPDATE: $[1], Password'
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
            errorMsg = 'PROFILE_UPDATE: $[1],Image'
          }
          break
        default:
          condition = 'invalid'
          error = true
          errorMsg = 'OOPS'
          break
      }
      var query = {}
      query[condition] = value

      if (error) {
        response.error = true
        response.msg = errorMsg
      } else {
        var updateInfo = await userRepository.updateUserProfileUsingId(query, userId)
        if (updateInfo.error) {
          response.error = true
          response.msg = 'EXIST: $[1],' + condition
        } else {
          response.error = false
          response.msg = errorMsg
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.userFileUploadService = async (data, callback) => {
    var response = {}
    try {
      var dir = 'user'
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

  this.userDeviceUpdateService = async (data, callback) => {
    var response = {}
    try {
      var device = {}
      device.GCMId = data.fcmToken
      device.Model = data.model
      device.Brand = data.brand
      device.OS = data.os
      device.OSVersion = data.osVersion
      device.AppVersion = data.appVersion

      var userDeviceInfo = {}
      userDeviceInfo.UserId = data.auth.Id
      userDeviceInfo.DeviceId = data.uuid

      var token = await userRepository.updateUserFCMToken(device, userDeviceInfo)
      if (token.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1], FCM token'
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

  this.getuserCancelPolicyList = async (callback) => {
    var response = {}
    try {
      var canceldata = []
      var type = { UserType: 'user' }
      var cancelDetails = await userRepository.fetchUserCancelPolicyList(type)
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
      callback(response)
    }
  }
  this.getUserStaticPageList = async (data, callback) => {
    var response = {}
    var staticdata = []
    var staticgetdata = {}
    try {
      if (data.id) {
        var type = { Id: data.id }
        var staticGetDetails = await userRepository.fetchUserStaticPageView(type)
        if (staticGetDetails.error) {
          response.error = true
          response.result = null
          response.msg = 'NO_DATA'
        } else {
          staticGetDetails.result.filter((x) => {
            staticgetdata.content = x.HtmlContent
          })
          response.error = false
          response.result = staticgetdata
          response.msg = 'VALID'
        }
      } else {
        var staticDetails = await userRepository.fetchUserStaticPageList()
        if (staticDetails.error) {
          response.error = true
          response.result = null
          response.msg = 'NO_DATA'
        } else {
          staticDetails.result.filter((x) => {
            staticdata.push({ id: x.Id, pageName: x.PageName })
          })
          response.error = false
          response.result = staticdata
          response.msg = 'VALID'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.result = null
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getUserBookingInfo = async (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var user = {}
        var userDetails = await userRepository.fetchUserDetailsById(userId)
        if (userDetails.error) {
          response.error = true
        } else {
          user.firstName = userDetails.result[0].FirstName
          user.lastName = userDetails.result[0].LastName
          user.mobile = userDetails.result[0].Mobile
          user.countryCode = userDetails.result[0].ExtCode
          user.image = userDetails.result[0].Image
          user.rating = userDetails.result[0].Rating
          response.error = false
          response.data = user
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getUserDeviceToken = (deviceId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var device = {}
        device.UserId = deviceId
        var deviceInfo = await userRepository.fetchUserDeviceInfoUsingId(device)
        if (deviceInfo.error) {
          response.error = true
          response.msg = 'NO_DEVICE'
        } else {
          var data = deviceInfo.result

          var deviceToken = data.map(element => {
            var data = {}
            data.token = element.GCMId
            data.deviceType = element.OS
            return data
          })
          response.error = false
          response.msg = 'VALID'
          response.data = deviceToken[0]
        }
        resolve(response)
      } catch (err) {
        err.error = false
        resolve(err)
      }
    })
  }

  this.userRatingUpdate = (userId, Average) => {
    userRepository.updateUserRating(userId, Average)
  }

  this.getUserRating = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var user = await userRepository.fetchUserDetailsById(userId)
        var data = {}
        if (user.error) {
          response.error = true
        } else {
          data.rating = user.result[0].Rating
          response.error = false
          response.data = data
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }
  this.generateEphemeralKeysService = async (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var user = {}
        var userDetails = await userRepository.fetchUserDetailsById(userId)
        if (userDetails.error) {
          response.error = true
        } else {
          user.stripeCustomerId = userDetails.result[0].StripeCustomerID
          response.error = false
          response.data = user
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }
  this.updateUserStripeCustomerID = async (data, userid) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var updateuserDetails = await userRepository.updateUserProfileUsingId(data, userid)
        if (updateuserDetails.error) {
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
  this.customerPaymentChargeService = async (userId, type) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var user = {}
        var userDetails = await userRepository.fetchUserDetailsById(userId)
        if (userDetails.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          user.stripeCustomerId = userDetails.result[0].StripeCustomerID
          user.email = userDetails.result[0].Email
          response.error = false
          response.msg = 'VALID'
          response.data = user
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
  this.usersSocialTokenchecksService = async (data, callback) => {
    var response = {}
    try {
      var senddata = {
        LoginType: data.loginType,
        SocialToken: data.socialToken
      }
      var userDetails = await userRepository.usersSocialTokenchecks(senddata)
      if (userDetails.error === false) {
        var device = {}
        device.UserId = userDetails.result[0].Id
        device.DeviceId = data.uuid

        var auth = {}
        auth.Id = userDetails.result[0].Id
        var userDevice = await userRepository.fetchUserDevice(data.uuid)
        if (userDevice.error) {
          var newUserDevice = await userRepository.addUserDevice(device)
          auth.Device = newUserDevice.result
        } else {
          await userRepository.updateUserDevice(device)
          var newDevice = await userRepository.fetchUserDevice(data.uuid)
          auth.Device = newDevice.result[0].Id
        }
        var user = {}
        user.firstName = userDetails.result[0].FirstName
        user.lastName = userDetails.result[0].LastName
        user.image = userDetails.result[0].Image
        user.mobile = userDetails.result[0].Mobile
        user.rating = userDetails.result[0].Rating
        user.token = await common.generateToken(auth, process.env.JWT_SECRET)
        response.error = false
        response.msg = 'VALID'
        response.data = user
      } else {
        response.error = true
        response.msg = 'NOTEXIST: $[1],user'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }
  this.userUpdateLanguageService = async (data, callback) => {
    var response = {}
    try {
      var userId = data.auth.Id
      var userLang = {
        where: {
          Id: userId
        },
        update: {
          Language: data.languageName
        }
      }
      var langDetails = await userRepository.updateLang(userLang)
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
      callback(err)
    }
  }
}
