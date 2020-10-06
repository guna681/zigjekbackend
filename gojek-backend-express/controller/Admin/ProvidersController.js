module.exports = function () {
  const ProviderSerice = require('../../services/Admin/ProvidersService')
  require('dotenv').config({ path: './../.env' })

  var providerService = new ProviderSerice()

  this.providerListPageViewCtrl = (req, callback) => {
    var response = {}
    providerService.providersListPageViewService(req, (result) => {
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
  this.providerListViewCtrl = (data, callback) => {
    var response = {}
    providerService.providersListViewService(data, (result) => {
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
  this.getProviderCtrl = (req, callback) => {
    var response = {}
    providerService.getProviderViewService(req, (result) => {
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
  this.getProviderDocCtrl = (req, callback) => {
    var response = {}
    providerService.getProviderDocViewService(req, (result) => {
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
  this.providerDocEditCtrl = (req, callback) => {
    var response = {}
    providerService.providerDocEditService(req, (result) => {
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
  this.providerEditCtrl = (req, callback) => {
    var response = {}
    providerService.providerEditService(req, (result) => {
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
  this.providersPushNotificationPageViewCtrl = (req, callback) => {
    var response = {}
    providerService.providersPushNotificationPageViewService(req, (result) => {
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
  this.providerPushNotificationSearchDataViewCtrl = (req, callback) => {
    var response = {}
    providerService.providerPushNotificationSearchDataViewService(req, (result) => {
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
  this.providersPushNotificationSendCtrl = (req, callback) => {
    var response = {}
    providerService.providersPushNotificationSendService(req, (result) => {
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
  this.getProviderDetailsListViewCtrl = (req, callback) => {
    var response = {}
    providerService.getProviderDetailsListViewService(req, (result) => {
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
  this.getProviderVehicleListViewCtrl = (req, callback) => {
    var response = {}
    providerService.getProviderVehicleListViewService(req, (result) => {
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
  this.providerVehicleEditCtrl = (req, callback) => {
    var response = {}
    providerService.providerVehicleEditService(req, (result) => {
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
  this.providerVehicleDocumentsEditCtrl = (req, callback) => {
    var response = {}
    providerService.providerVehicleDocumentsEditService(req, (result) => {
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
  this.getProviderVehicleDocumentsDetailsListViewCtrl = (req, callback) => {
    var response = {}
    providerService.getProviderVehicleDocumentsDetailsListViewService(req, (result) => {
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
<<<<<<< HEAD

    this.disableProviderCtrl = (req, callback) => {
    var response = {}
    providerService.disableProviderService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
=======
  
  this.providerBlockStatusUpdate=(req,callback)=>{
    var response={}
    providerService.providerBlockStatusUpdate(req,(result)=>{
      if(result.error){
        response.error=true
        response.msg=result.msg
      } else{
        response.error=false
        response.msg=result.msg
>>>>>>> main/master
      }
      callback(response)
    })
  }
<<<<<<< HEAD

  this.deleteProviderCtrl = (req, callback) => {
    var response = {}
    providerService.deleteProviderService(req, (result) => {
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

=======
>>>>>>> main/master
}
