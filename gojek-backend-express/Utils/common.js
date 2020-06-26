module.exports = function () {
  const bcrypt = require('bcryptjs')
  const multer = require('multer')
  const uuid = require('uuid/v4')
  const jwt = require('jsonwebtoken')
  require('dotenv').config({ path: './../.env' })
  const s2 = require('s2-geometry').S2
  const moment = require('moment')
  const authy = require('authy')(process.env.TWILIO_KEY)
  const fs = require('fs')
  const needle = require('needle')
  const multiStringReplace = require('multi-string-replace')
  const privateKey = fs.readFileSync('./../gojek-backend-laravel/storage/oauth-private.key')
  const publicKey = fs.readFileSync('./../gojek-backend-laravel/storage/oauth-public.key')

  this.generateOTP = function () {
    var val = Math.floor(1000 + Math.random() * 9000)
    val = 1234 // Test
    return val
  }

  this.hashPassword = function (password, saltRounds) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          err = false
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  }

  this.comparePassword = function (password, hash) {
    return new Promise(function (resolve) {
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          err = false
          resolve(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  this.generateToken = function (data, secret) {
    return new Promise(function (resolve) {
      jwt.sign(data, privateKey, { algorithm: 'RS256' }, (err, token) => {
        if (err) {
          resolve(err)
        } else {
          resolve(token)
        }
      })
    })
  }

  this.generateAccessToken = function (data) {
    return new Promise(function (resolve) {
      needle.post(process.env.PASSPORT_URL + 'oauth/token', data,
        function (error, response) {
          if (error) {
            resolve(error)
          } else {
            resolve(response.body.access_token)
          }
        })
    })
  }

  this.createAccessToken = function (data) {
    return new Promise(function (resolve) {
      needle.post(process.env.PASSPORT_URL + 'api/createUserToken', data,
        function (error, response) {
          if (error) {
            resolve(error)
          } else {
            var result = JSON.parse(response.body)
            resolve(result.data)
          }
        })
    })
  }

  this.getPayloadFromToken = function (token) {
    var data = {}
    return new Promise(function (resolve) {
      token = token.replace('Bearer ', '')
      jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, payload) => {
        if (err) {
          data.error = true
          resolve(data)
        } else {
          data.error = false
          data.data = payload
          resolve(data)
        }
      })
    })
  }

  this.getAdminAuthToken = function (token) {
    var data = {}
    return new Promise(function (resolve) {
      jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, payload) => {
        if (err) {
          data.error = true
          data.data = null
          resolve(data)
        } else {
          data.error = false
          data.data = payload
          resolve(data)
        }
      })
    })
  }

  this.sendOtpMobile = function (mobileNumber, countryCode) {
    var response = {}
    return new Promise(function (resolve) {
      try {
        // authy.phones().verification_start(mobileNumber, countryCode, { via: 'sms', locale: 'en' }, function (err, res) {
        //   if (res) {
        response.error = false
        // response.data = res
        //   } else {
        //     response.error = true
        //     response.data = null
        //     response.msg = err.message
        //   }
        //   resolve(response)
        // })
      } catch (err) {
        err.error = true
        err.msg = 'FAILED'
        resolve(err)
      }
    })
  }

  this.otpVerify = function (mobileNumber, countryCode, otp) {
    var response = {}
    return new Promise(function (resolve) {
      try {
        authy.phones().verification_check(mobileNumber, countryCode, otp, function (err, res) {
          if (res) {
            response.error = false
            response.data = res
          } else {
            response.error = true
            response.data = null
            response.msg = err.message
          }
          resolve(response)
        })
      } catch (err) {
        err.error = true
        err.msg = 'FAILED'
        resolve(err)
      }
    })
  }

  this.getCellIdFromCoordinates = function (lat, lon) {
    return new Promise(function (resolve) {
      try {
        var latitude = parseFloat(lat).toFixed(6)
        var longitude = parseFloat(lon).toFixed(6)
        var response = {}
        response.key = s2.latLngToKey(latitude, longitude, process.env.S2_LEVEL)
        response.id = s2.keyToId(response.key)
        if (response.key || response.id) {
          response.error = false
          resolve(response)
        } else {
          response.error = true
          resolve(response)
        }
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.fileUpload = function (image, dir) {
    return new Promise(function (resolve) {
      try {
        var data = {}
        var uid = uuid()
        var storage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, process.env.IMAGE_PATH + dir)
            // cb(null, process.env.BASE_URL + req.body['user'])
          },
          filename: (req, file, cb) => {
            cb(null, uid + '.' + file.originalname.split('.')[1])
          }
        })
        var upload = multer({ storage: storage }).single('file')
        upload(image, null, function (err) {
          if (typeof image.file === 'undefined' || err) {
            data.error = true
            data.msg = err
          } else {
            data.error = false
            data.msg = process.env.HOST + ':' + process.env.PORT + '/' + image.file.path.replace('public/', '')
            data.imageName = image.file.originalname
          }
          resolve(data)
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.imageUpload = function (image, res) {
    return new Promise(function (resolve) {
      try {
        var data = {}
        var uid = uuid()
        var storage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, process.env.IMAGE_PATH + req.body['user'].split('|')[0])
          },
          filename: (req, file, cb) => {
            if (req.body['user'].split('|')[1] !== 'Replace') {
              cb(null, uid + '.' + file.originalname.split('.').reverse()[0])
            } else {
              cb(null, req.body['user'].split('|')[2])
            }
          }
        })
        var upload = multer({ storage: storage }).single('file')
        upload(image, res, function (err) {
          if (err) {
            data.error = true
            data.msg = err
          } else {
            data.error = false
            data.msg = process.env.HOST + ':' + process.env.PORT + '/' + image.file.path.replace('public/', '')
            data.imageName = image.file.originalname
          }
          resolve(data)
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getFareEstimation = function (baseCharge, minCharge, distance) {
    var distanceToKM = parseFloat(distance / 1000)
    var fareRate = parseFloat(minCharge * distanceToKM)
    var charge = parseFloat(baseCharge) + parseFloat(fareRate)
    return Number(charge.toFixed(2))
  }

  this.weightCalculator = function (data, weight) {
    var config = {}
    weight.forEach(element => {
      config[element.key] = element.value
    })
    var key = Object.keys(config)
    var total = 0
    key.filter(element => {
      if (data[element] && config[element]) {
        total += data[element] * config[element]
      } else {
        total += 0
      }
    })
    data['total'] = total
    return data
  }

  this.timeStampFormatter = function (timestamp) {
    var dateFormat = 'YYYY-MM-DD HH:mm:ss'
    var date = moment(timestamp).format(dateFormat)
    return date
  }

  this.dateFormatter = function (timestamp) {
    var dateFormat = 'DD-MM-YYYY'
    var date = moment(timestamp).format(dateFormat)
    return date
  }

  this.timeStampHelper = function (timestamp, value, valueType) {
    var dateFormat = 'YYYY-MM-DD HH:mm:ss'
    var date = moment(timestamp).add(value, valueType).format(dateFormat)
    return date
  }

  this.timeStampCalculator = function (timeStamp1, timeStamp2) {
    var date1 = new Date(timeStamp1)
    var date2 = new Date(timeStamp2)

    var res = Math.abs(date1 - date2)
    return res % 60
  }
  this.secureChangerList = function (Email, Mobile) {
    var mobile = ''
    var email = ''
    var output = {}
    for (var i = 0; i < Mobile.length; i++) {
      if (i > (Mobile.length - 5)) {
        mobile += '*'
      } else {
        mobile += Mobile[i]
      }
    }
    var splitmail = Email.split('@')[0]
    if (splitmail.length < 2) {
      email += splitmail.replace(splitmail[0], '*')
    } else if (splitmail.length < 3) {
      email += splitmail[0].concat('*')
    } else {
      for (var ei = 0; ei < splitmail.length; ei++) {
        if ((ei < 1) || ((splitmail.length - 1) <= ei)) {
          email += splitmail[ei]
        } else {
          email += '*'
        }
      }
    }
    email = email.concat('@', Email.split('@')[1])
    output['email'] = email
    output['mobile'] = mobile
    return output
  }

  this.multipleStringReplace = function (string, replacementList) {
    return new Promise(function (resolve) {
      var mst = multiStringReplace(string, replacementList)
      resolve(mst)
    })
  }
  this.bookingTripStarCounting = function (rating) {
    return new Promise(function (resolve) {
      var ratingstring = ''
      switch (rating) {
        case '1':
          ratingstring += '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
        case '2':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
        case '3':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
        case '4':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
          break
        case '5':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
          break
        default:
          ratingstring += '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
      }
      resolve(ratingstring)
    })
  }

  this.getNeighborsUsingS2Key = function (lat, lng) {
    return new Promise(function (resolve) {
      try {
        var response = {}
        var neighborsResult = []
        var neighbors = s2.latLngToNeighborKeys(lat, lng, process.env.S2_LEVEL)
        if (neighbors.length > 0) {
          neighbors.filter((x) => {
            var c = s2.keyToId(x)
            neighborsResult.push(c)
          })
          response.error = false
          response.key = neighborsResult
          resolve(response)
        } else {
          response.error = true
          resolve(response)
        }
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }
}
