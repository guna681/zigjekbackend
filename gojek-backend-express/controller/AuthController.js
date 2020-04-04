module.exports = function () {
  const UserService = require('../services/UserService')
  const ProviderService = require('../services/ProviderService')

  var userService = new UserService()
  var providerService = new ProviderService()

  this.apiServicesAuthCtrl = (request) => {
    return new Promise(function (resolve) {
      try {
        var headers = request.headers
        var role = headers.role
        var Id
        if (role === 'user') {
          Id = request.params.auth.sub
          userService.userAuthService(Id, (result) => {
            var response = {}
            if (result.error) {
              response.error = true
              response.msg = result.msg
            } else {
              response.error = false
              response.msg = result.msg
              response.data = result.data
            }
            resolve(response)
          })
        } else if (role === 'provider') {
          Id = request.params.auth.Id
          providerService.providerAuthService(Id, (result) => {
            var response = {}
            if (result.error) {
              response.error = true
              response.msg = result.msg
            } else {
              response.error = false
              response.msg = result.msg
              response.data = result.data
            }
            resolve(response)
          })
        } else {
          var response = {}
          response.error = true
          response.msg = 'UNAUTHORIZED'
          resolve(response)
        }
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
