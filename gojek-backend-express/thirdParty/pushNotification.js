module.exports = function () {
  require('dotenv').config({ path: './../.env' })
  var admin = require('firebase-admin')

  var serviceAccount = require('../keyFile/firebase-admin-sdk.json')

  if (!admin.apps.length) {
    console.log('firebase admin initialized')
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://gettaxi-user-bde6a.firebaseio.com'
    })
  }

  this.sendPushNotificationByDeviceType = (deviceInfo, content, sound, type = 'taxi') => {
    // var orderId = ''
    // var type = ''
    // if (content.type === undefined) {
    //   type = ''
    // } else {
    //   type = content.type
    // }
    // if (content.orderId === undefined) {
    //   orderId = ''
    // } else {
    //   orderId = content.orderId
    // }
    var response = {}
    return new Promise(function (resolve) {
      try {
        var messages
        sound = typeof sound === 'undefined' ? 'default' : sound
        if (deviceInfo.deviceType.toLowerCase() === 'android') {
          messages = {
            'token': deviceInfo.token,
            'data': {
              'title': content.title,
              'body': content.body,
              'data': content.data,
              'type': type
              // 'orderId': orderId
            },
            'android': {
              'priority': 'high'
            },
            'apns': {
              'headers': {
                'apns-priority': '10'
              },
              'payload': {
                'aps': {
                  'category': 'NEW_MESSAGE_CATEGORY',
                  'sound': 'default'
                }
              }
            }
          }
        } else {
          messages = {
            'token': deviceInfo.token,
            'notification': {
              'title': content.title,
              'body': content.body,
              'type': type
              // 'orderId': orderId
            },
            'data': {
              'title': content.title,
              'body': content.body,
              'data': content.data
              // 'type': type,
              // 'orderId': orderId
            },
            'android': {
              'priority': 'high'
            },
            'apns': {
              'headers': {
                'apns-priority': '5'
              },
              'payload': {
                'aps': {
                  'category': 'NEW_MESSAGE_CATEGORY',
                  'sound': sound
                }
              }
            }
          }
        }
        admin.messaging().send(messages)
          .then((result) => {
            console.log('FCM Success', result)
            response.error = false
            resolve(messages)
          })
          .catch((err) => {
            console.log('FCM Error', err)
            err.error = true
            resolve(err)
          })
      } catch (err) {
        console.log('FCM Error', err)
        err.error = false
        resolve(err)
      }
    })
  }
  this.sendBulkPushNotification = (deviceInfo, content) => {
    var response = {}
    var messages = {
      'tokens': deviceInfo,
      'notification': {
        'title': content.title,
        'body': content.body
      },
      'data': {
        'title': content.title,
        'body': content.body,
        'data': content.data
      },
      'android': {
      },
      'apns': {
        'headers': {
        },
        'payload': {
          'aps': {
            'category': 'NEW_MESSAGE_CATEGORY',
            'sound': 'default'
          }
        }
      }
    }
    return new Promise(function (resolve) {
      try {
        admin.messaging().sendMulticast(messages)
          .then((result) => {
            response.error = false
            response.data = result
            console.log('Successfully sent message:', JSON.stringify(result))
            resolve(response)
          })
          .catch((err) => {
            err.error = true
            console.log('Error sending message:', err)
            resolve(err)
          })
      } catch (err) {
        err.error = false
        resolve(err)
      }
    })
  }

  this.sendBulkNotificationToProvider = (deviceInfo, content, sound) => {
    var response = {}
    return new Promise(function (resolve) {
      try {
        var messages
        sound = typeof sound === 'undefined' ? 'default' : sound
        messages = {
          'registrationToken': deviceInfo,
          'notification': {
            'title': content.title,
            'body': content.body
          },
          'data': {
            'title': content.title,
            'body': content.body,
            'data': content.data
          },
          'android': {
            'priority': 'high'
          },
          'apns': {
            'headers': {
              'apns-priority': '5'
            },
            'payload': {
              'aps': {
                'category': 'NEW_MESSAGE_CATEGORY',
                'sound': sound
              }
            }
          }
        }
        admin.messaging().sendToDevice(messages)
          .then((result) => {
            console.log('FCM Success', result)
            response.error = false
          })
          .catch((err) => {
            console.log('FCM Error', err)
            err.error = true
            resolve(err)
          })
      } catch (err) {
        console.log('FCM Error', err)
        err.error = false
        resolve(err)
      }
    })
  }
}
