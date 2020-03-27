module.exports = function () {
  const LocalizationService = require('../../services/Admin/LocalizationService')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var localizationService = new LocalizationService();
  var common = new Common();

  this.adminCountryInsertCtrl = (req, callback) => {
    var response = {}
    localizationService.adminCountryInsertService(req, (result) => {
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
  this.adminStateInsertCtrl = (req, callback) => {
    var response = {}
    localizationService.adminStateInsertService(req, (result) => {
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
  this.adminCityInsertCtrl = (req, callback) => {
    var response = {}
    localizationService.adminCityInsertService(req, (result) => {
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
  this.adminCountrySelectCtrl = (req, callback) => {
    var response = {}
    localizationService.adminCountrySelectService(req, (result) => {
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
  this.adminGetCountryViewCtrl = (req, callback) => {
    var response = {}
    localizationService.adminGetCountryViewService(req, (result) => {
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
  this.adminCountryViewSelectCtrl = (callback) => {
    var response = {}
    localizationService.adminCountryViewSelectService((result) => {
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
  this.adminStatePageSelectCtrl = (req, callback) => {
    var response = {}
    localizationService.statePageSelectViewService(req, (result) => {
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
  this.adminStateListCtrl = (data, callback) => {
    var response = {}
    localizationService.adminStateListService(data, (result) => {
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
  this.adminStateSelectCtrl = (req, callback) => {
    var response = {}
    localizationService.adminStateSelectService(req, (result) => {
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
 
  this.adminGetStateViewCtrl = (req, callback) => {
    var response = {}
    localizationService.adminGetStateViewService(req, (result) => {
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
  this.adminCitySelectCtrl = (callback) => {
    var response = {}
    localizationService.adminCitySelectService((result) => {
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
  this.adminCityViewCtrl = (data, callback) => {
    var response = {}
    localizationService.adminCityViewService(data, (result) => {
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
  this.adminGetCityViewCtrl = (req, callback) => {
    var response = {}
    localizationService.adminGetCityViewService(req, (result) => {
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
  this.adminCountryUpdateCtrl = (req, callback) => {
    var response = {}
    localizationService.adminCountryUpdateService(req, (result) => {
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
  this.adminStateUpdateCtrl = (req, callback) => {
    var response = {}
    localizationService.adminStateUpdateService(req, (result) => {
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
  this.adminCityUpdateCtrl = (req, callback) => {
    var response = {}
    localizationService.adminCityUpdateService(req, (result) => {
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
  this.adminCountryDeleteCtrl = (req, callback) => {
    var response = {}
    localizationService.adminCountryDeleteService(req, (result) => {
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
  this.adminStateDeleteCtrl = (req, callback) => {
    var response = {}
    localizationService.adminStateDeleteService(req, (result) => {
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
  this.adminCityDeleteCtrl = (req, callback) => {
    var response = {}
    localizationService.adminCityDeleteService(req, (result) => {
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

  this.langViewCtrl = (callback) => {
    var response = {}
    localizationService.langViewService((result) => {
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
}
