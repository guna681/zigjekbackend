module.exports = function (app, validator) {
  const basePath = '/api/admin'
  const ErrorHandler = require('../Utils/error')
  const Common = require('../Utils/common')
  require('dotenv').config({ path: './../.env' })
  const AdminAppConfigCtrl = require('../controller/Admin/AdminAppConfigCtrl')
  const AdminAuthController = require('../controller/Admin/AdminAuthController')
  const LocalizationController = require('../controller/Admin/LocalizationController')
  const DoctypeController = require('../controller/Admin/DoctypeController')
  const EmailTemplateController = require('../controller/Admin/EmailTemplateController')
  const ProvidersController = require('../controller/Admin/ProvidersController')
  const ServiceTypeController = require('../controller/Admin/ServiceTypeController')
  const UsersController = require('../controller/Admin/UsersController')
  const VehicleController = require('../controller/Admin/VehicleController')
  const AppSliderController = require('../controller/Admin/AppSliderController')
  const FileUploadCtrl = require('../controller/Admin/FileUploadCtrl')
  const BookingController = require('../controller/Admin/BookingController')
  const SearchController = require('../controller/Admin/SearchController')
  const DashboardController = require('../controller/Admin/DashboardController')
  const PromoCodesCtrl = require('../controller/Admin/PromoCodesCtrl')
  const ReviewManagementCtrl = require('../controller/Admin/ReviewManagementCtrl')
  const BannerAdsCtrl = require('../controller/Admin/BannerAdsCtrl')
  const PeekChargesCtrl = require('../controller/Admin/peekChargesCtrl')
  const WalletController = require('../controller/Admin/WalletController')
  const ServicesController = require('../controller/Admin/ServicesController')

  var adminAppConfigCtrl = new AdminAppConfigCtrl()
  var adminAuthController = new AdminAuthController()
  var localizationController = new LocalizationController()
  var doctypeController = new DoctypeController()
  var emailTemplateController = new EmailTemplateController()
  var providersController = new ProvidersController()
  var serviceTypeController = new ServiceTypeController()
  var usersController = new UsersController()
  var vehicleController = new VehicleController()
  var appSliderController = new AppSliderController()
  var fileUploadCtrl = new FileUploadCtrl()
  var bookingController = new BookingController()
  var searchController = new SearchController()
  var dashboardController = new DashboardController()
  var promoCodesCtrl = new PromoCodesCtrl()
  var reviewManagementCtrl = new ReviewManagementCtrl()
  var bannerAdsCtrl = new BannerAdsCtrl()
  var peekChargesCtrl = new PeekChargesCtrl()
  var walletController = new WalletController()
  var errorHandler = new ErrorHandler()
  var servicesController = new ServicesController()

  // admin login route
  app.post(`${basePath}/login`, [
    validator.check('Email').isEmail()
      .withMessage('INVALID: $[1],Email Id'),
    validator.check('Password').isLength({ min: 8, max: 15 })
      .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
  ], (req, res) => {
    const error = validator.validation(req)
    const lang = req.headers.lang
    var body = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      adminAuthController.adminPassValidate(body, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Insert Country
  app.post(`${basePath}/countryAdd`, [
    validator.check('CountryName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CountryName'),
    validator.check('ShortCode').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('CurrenyName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrenyName'),
    validator.check('CurrencyShortCode').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrencyShortCode'),
    validator.check('CurrencySymbol').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrencySymbol'),
    validator.check('CurrenyValue').isNumeric().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrenyValue'),
    validator.check('CountryFlagImage'),
    validator.check('IsActive').isLength({ min: 1, max: 255 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCountryInsertCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Insert State
  app.post(`${basePath}/stateAdd`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('INVALID:$[1],CountryId'),
    validator.check('ShortCode').isLength({ min: 2, max: 255 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('StateName').isLength({ min: 2, max: 255 }).trim()
      .withMessage('INVALID:$[1],StateName'),
    validator.check('IsActive').isAlpha().isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminStateInsertCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Insert City
  app.post(`${basePath}/cityAdd`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('INVALID:$[1],CountryId'),
    validator.check('StateId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('INVALID:$[1],StateId'),
    validator.check('CityName').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CityName')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCityInsertCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin page Select Country
  app.get(`${basePath}/countryPageView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCountrySelectCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Dashboard List View
  app.get(`${basePath}/dashboardListView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      dashboardController.admindashboardListViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select Country
  app.get(`${basePath}/countryView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCountryViewSelectCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select Country
  app.get(`${basePath}/getCountryView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminGetCountryViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/stateView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminStateSelectCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // Admin List Select State
  app.get(`${basePath}/stateListView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminStateListCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/stateView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminStatePageSelectCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/getStateView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminGetStateViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select City
  app.get(`${basePath}/cityView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCitySelectCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select City
  app.get(`${basePath}/cityView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCityViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/getCityView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminGetCityViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Update Country
  app.post(`${basePath}/countryEdit`, [
    validator.check('CountryName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],CountryName'),
    validator.check('ShortCode').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('CurrenyName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrenyName'),
    validator.check('CurrencyShortCode').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrencyShortCode'),
    validator.check('CurrencySymbol').isString()
      .withMessage('INVALID: $[1],CurrencySymbol')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1],CurrencySymbol')
      .trim().withMessage('INVALID: $[1],CurrencySymbol'),
    validator.check('CurrenyValue').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC:$[1],CurrenyValue'),
    validator.check('CountryFlagImage')
      .withMessage('INVALID:$[1],CountryFlagImage'),
    validator.check('IsDefault').withMessage('INVALID:$[1],IsDefault'),
    validator.check('IsActive').isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCountryUpdateCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Update State
  app.post(`${basePath}/stateEdit`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],CountryId'),
    validator.check('ShortCode').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('StateName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],StateName'),
    validator.check('IsActive').isAlpha().isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminStateUpdateCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Update City
  app.post(`${basePath}/cityEdit`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],CountryId'),
    validator.check('StateId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],StateId'),
    validator.check('CityName').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],CityName'),
    validator.check('IsActive').isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCityUpdateCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Delete Country
  app.post(`${basePath}/countryDelete`, [
    validator.check('Id').isNumeric()
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCountryDeleteCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Delete State
  app.post(`${basePath}/stateDelete`, [
    validator.check('Id').isNumeric()
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminStateDeleteCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Delete City
  app.post(`${basePath}/cityDelete`, [
    validator.check('Id').isNumeric()
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.adminCityDeleteCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin AppConfig UpDate
  app.post(`${basePath}/appConfigEdit`, [
    validator.check('Id').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],Id'),
    validator.check('Value').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],Value')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      adminAppConfigCtrl.appConfigEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // App Config Page Select
  app.get(`${basePath}/appConfigListView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      adminAppConfigCtrl.appConfigViewPageCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Insert
  app.post(`${basePath}/docTypeAdd`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],Name'),
    validator.check('Type').isIn(['FILE', 'TEXT']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID:$[1],Type'),
    validator.check('FieldName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],FieldName'),
    validator.check('ApplicableTo').isLength({ min: 1, max: 50 }).isIn(['provider', 'bank', 'vehicle'])
      .withMessage('INVALID:$[1],ApplicableTo'),
    validator.check('IsRequired').isNumeric().isLength({ min: 1, max: 1 })
      .withMessage('NUMERIC:$[1],IsRequired'),
    validator.check('DocType').isLength({ min: 1, max: 50 }).isIn(['card', 'text', 'photo', 'doc'])
      .withMessage('INVALID:$[1],DocType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      doctypeController.adminDocTypeInsertCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Select
  app.get(`${basePath}/docTypeView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      doctypeController.adminDocTypeSelectCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Page Select
  app.get(`${basePath}/docTypeView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      doctypeController.admindocTypeViewPageCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/getDoctypeView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      doctypeController.adminGetDoctypeViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Update
  app.post(`${basePath}/docTypeEdit`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],Name'),
    validator.check('Type').isIn(['FILE', 'TEXT']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID:$[1],Type'),
    validator.check('FieldName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],FieldName'),
    validator.check('ApplicableTo').isLength({ min: 1, max: 45 }).isIn(['provider', 'bank', 'vehicle'])
      .withMessage('INVALID:$[1],ApplicableTo'),
    validator.check('IsRequired').isNumeric().isLength({ min: 1, max: 1 })
      .withMessage('NUMERIC:$[1],IsRequired'),
    validator.check('DocType').isAlpha().isLength({ min: 1, max: 50 }).isIn(['card', 'text', 'photo', 'doc'])
      .withMessage('INVALID:$[1],DocType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      doctypeController.adminDocTypeUpdateCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Delete
  app.post(`${basePath}/docTypeDelete`, [
    validator.check('Id').isNumeric()
      .isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      doctypeController.adminDocTypeDeleteCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand Insert
  app.post(`${basePath}/vehicleBrandAdd`, [
    validator.check('BrandName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],BrandName'),
    validator.check('CountryId').trim()
      .withMessage('INVALID:$[1],CountryId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      vehicleController.vehicleBrandAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand View
  app.get(`${basePath}/vehicleBrandView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      vehicleController.vehicleBrandViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand page View
  app.get(`${basePath}/vehicleBrandView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      vehicleController.vehicleBrandPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin vehiclebrand Select State
  app.get(`${basePath}/getVehicleBrandView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      vehicleController.getVehicleBrandViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand Update
  app.post(`${basePath}/vehicleBrandEdit`, app.adminauth, [
    validator.check('BrandName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],BrandName'),
    validator.check('CountryId').trim()
      .withMessage('INVALID:$[1],CountryId')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      vehicleController.vehicleBrandEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Model Insert
  app.post(`${basePath}/vehicleModelAdd`, [
    validator.check('VehicleBrandId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],VehicleBrandId'),
    validator.check('ModelName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],ModelName'),
    validator.check('VehicleType').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],VehicleType'),
    validator.check('PowerBy').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PowerBy')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      vehicleController.vehicleModelAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Model View
  app.get(`${basePath}/vehicleModelView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      vehicleController.vehicleModelViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Model page View
  app.get(`${basePath}/vehicleModelView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      vehicleController.vehicleModelPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin vehiclemodel Select State
  app.get(`${basePath}/getVehicleModelView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      vehicleController.getVehicleModelViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Model Update
  app.post(`${basePath}/vehicleModelEdit`, [
    validator.check('VehicleBrandId').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],VehicleBrandId'),
    validator.check('ModelName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],ModelName'),
    validator.check('VehicleType').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],VehicleType'),
    validator.check('PowerBy').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PowerBy')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      vehicleController.vehicleModelEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Language
  // Admin Language View
  app.get(`${basePath}/languageView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      localizationController.langViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Insert
  app.post(`${basePath}/rideTypeAdd`, [
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('Description').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('CountryId').trim().withMessage('INVALID: $[1],CountryId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.rideTypeAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type View
  app.get(`${basePath}/rideTypeView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.rideTypeViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Edit
  app.post(`${basePath}/rideTypeEdit`, [
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('Description').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('CountryId').withMessage('INVALID: $[1],CountryId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.rideTypeEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Language Insert
  app.post(`${basePath}/rideTypeLanguageAdd`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('RideTypeId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],RideTypeId'),
    validator.check('LanguageId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],LanguageId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if ((Array.isArray(data.Name) === true) && (Array.isArray(data.LanguageId) === true)) {
      if (error.array().length) {
        errorHandler.requestHandler(error.array(), true, lang, (message) => {
          message.data = error.array()
          return res.send(message)
        })
      } else {
        serviceTypeController.rideTypeLanguageAddCtrl(data, (result) => {
          errorHandler.ctrlHandler([result], result.error, lang, (message) => {
            return res.send(message)
          })
        })
      }
    } else {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    }
  })
  // Admin Ride Type Language View
  app.get(`${basePath}/rideTypeLanguageView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.rideTypeLanguageViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Language Edit
  app.post(`${basePath}/rideTypeLanguageEdit`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('RideTypeId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],RideTypeId'),
    validator.check('LanguageId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],LanguageId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.rideTypeLanguageEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicle Type Insert
  app.post(`${basePath}/rideVehicleTypeAdd`, [
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('IconPassive').isLength({ min: 1 })
      .withMessage('INVALID: $[1],IconPassive'),
    validator.check('IconActive').isLength({ min: 1 })
      .withMessage('INVALID: $[1],IconActive'),
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],CountryId'),
    validator.check('StateIds')
      .withMessage('INVALID: $[1],StateIds'),
    validator.check('CityIds')
      .withMessage('INVALID: $[1],CityIds'),
    validator.check('BaseCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],BaseCharge'),
    validator.check('MinCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],MinCharge'),
    validator.check('CurrencyType').isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],CurrencyType'),
    validator.check('CommissionPercentage').isNumeric().isLength({ min: 1 }).trim()
      .withMessage('NUMERIC: $[1],CommissionPercentage'),
    validator.check('WaitingCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],WaitingCharge'),
    validator.check('Capacity').isNumeric().isLength({ min: 1, max: 1 }).trim()
      .withMessage('NUMERIC: $[1],Capacity'),
    validator.check('ShortDesc').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],ShortDesc'),
    validator.check('LongDesc').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],LongDesc'),
    validator.check('IsActive').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsActive'),
    validator.check('IsPoolEnabled').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsPoolEnabled')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.rideVehicleTypeAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicle Type View
  app.get(`${basePath}/rideVehicleTypeView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.rideVehicleTypeViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicle Type Update
  app.post(`${basePath}/rideVehicleTypeEdit`, [
    validator.check('Id').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],Id'),
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('IconPassive').isLength({ min: 1, max: 1000 })
      .withMessage('INVALID: $[1],IconPassive'),
    validator.check('IconActive').isLength({ min: 1, max: 1000 })
      .withMessage('INVALID: $[1],IconActive'),
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],CountryId'),
    validator.check('StateIds')
      .withMessage('INVALID: $[1],StateIds'),
    validator.check('CityIds')
      .withMessage('INVALID: $[1],CityIds'),
    validator.check('BaseCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],BaseCharge'),
    validator.check('MinCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],MinCharge'),
    validator.check('CurrencyType').isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],CurrencyType'),
    validator.check('CommissionPercentage').isNumeric().isLength({ min: 1 }).trim()
      .withMessage('NUMERIC: $[1],CommissionPercentage'),
    validator.check('WaitingCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],WaitingCharge'),
    validator.check('Capacity').isNumeric().isLength({ min: 1, max: 1 }).trim()
      .withMessage('NUMERIC: $[1],Capacity'),
    validator.check('ShortDesc').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],ShortDesc'),
    validator.check('LongDesc').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],LongDesc'),
    validator.check('IsActive').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsActive'),
    validator.check('IsPoolEnabled').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsPoolEnabled')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.rideVehicleTypeEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicleType Status Update
  app.post(`${basePath}/rideVehicleTypeStatusEdit`, [
    validator.check('Id').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],Id'),
    validator.check('IsActive').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.rideVehicleTypeStatusEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select ridevehicletype pages
  app.get(`${basePath}/getRideVehicleTypepagesView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.getRideVehicleTypePagesViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Email Template Add
  app.post(`${basePath}/emailTemplateAdd`, [
    validator.check('KeyWord').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],KeyWord'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('Template').trim().withMessage('INVALID: $[1],Template')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      emailTemplateController.emailTemplateAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Email Template View
  app.get(`${basePath}/emailTemplateView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      emailTemplateController.emailTemplateViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select EmailTemplate
  app.get(`${basePath}/emailTemplatePagesListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      emailTemplateController.emailTemplateSelectCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select emailtemplate pages
  app.get(`${basePath}/getEmailTemplatepagesView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      emailTemplateController.getEmailTemplatePagesViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Email Template Update
  app.post(`${basePath}/emailTemplateEdit`, [
    validator.check('KeyWord').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],KeyWord'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('Template').trim().withMessage('INVALID: $[1],Template')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      emailTemplateController.emailTemplateEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Users View
  app.get(`${basePath}/usersListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      usersController.usersListViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Users View
  app.get(`${basePath}/providerListPageView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providerListPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select CancellationPolicyView
  app.post(`${basePath}/providerEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var id = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providerEditCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select CancellationPolicyView
  app.post(`${basePath}/providerDocEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var id = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providerDocEditCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // // Admin Providers View
  // app.get(`${basePath}/providerListView/:page`, app.adminauth, (req, res) => {
  //   const lang = req.headers.lang
  //   const error = validator.validation(req)
  //   var limit = 10
  //   var page = { page: req.params.page, limit: limit }
  //   if (error.array().length) {
  //     errorHandler.requestHandler(error.array(), true, lang, (message) => {
  //       return res.send(message)
  //     })
  //   } else {
  //     providersController.providerListPageViewCtrl(page, (result) => {
  //       errorHandler.ctrlHandler([result], result.error, lang, (message) => {
  //         return res.send(message)
  //       })
  //     })
  //   }
  // })
  // Admin Email Template Update
  app.post(`${basePath}/providerListView`, [
    validator.check('page').isLength({ min: 1, max: 50 })
      .withMessage('INVALID: $[1],page'),
    validator.check('type').isIn(['services', 'taxi']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],type')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      providersController.providerListPageViewCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider list view
  app.get(`${basePath}/getProviderView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.getProviderCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider list view
  app.get(`${basePath}/getProviderDocView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.getProviderDocCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin static Pages Add
  app.post(`${basePath}/staticPagesAdd`, [
    validator.check('PageName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PageName'),
    validator.check('Url').isLength({ min: 1, max: 255 }).optional()
      .withMessage('INVALID: $[1],Url'),
    validator.check('HtmlContent').optional().withMessage('INVALID: $[1],HtmlContent'),
    validator.check('Type').isLength({ min: 1, max: 255 }).optional()
      .withMessage('INVALID: $[1],Type'),
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.staticPagesAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Static Pages View
  app.get(`${basePath}/staticPagesListView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.staticPagesListViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select staticpages
  app.get(`${basePath}/staticPagesListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.staticPagesSelectCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select staticpages
  app.get(`${basePath}/getStaticpagesView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.getStaticPagesViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin static Pages Update
  app.post(`${basePath}/staticPagesEdit`, [
    validator.check('PageName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PageName'),
    validator.check('Url').isLength({ min: 1, max: 255 }).optional()
      .withMessage('INVALID: $[1],Url'),
    validator.check('HtmlContent').optional().withMessage('INVALID: $[1],HtmlContent'),
     validator.check('Type').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Type'),
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.staticPagesEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellation Policy Add
  app.post(`${basePath}/cancellationPolicyAdd`, [
    validator.check('Description').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('UserType').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],UserType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.cancellationPolicyAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellation policy View
  app.get(`${basePath}/cancellationPolicyView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.cancellationPolicyViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellationPolicy Page View
  app.post(`${basePath}/cancellationPolicyView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.cancellationPolicyPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select CancellationPolicyView
  app.get(`${basePath}/getCancellationPolicyView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      serviceTypeController.getCancellationPolicyViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellation Policy Update
  app.post(`${basePath}/cancellationPolicyEdit`, [
    validator.check('Description').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('UserType').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],UserType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      serviceTypeController.cancellationPolicyEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // app Slider Add
  app.post(`${basePath}/appSliderAdd`, [
    validator.check('Title').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Title'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Image').isLength({ min: 1, max: 255 }).optional()
      .withMessage('INVALID: $[1],Image'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      appSliderController.appSliderAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select Bookings
  app.post(`${basePath}/bookingsListView/:page`, [
    validator.check('type').isIn(['services', 'taxi']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],type')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    data.page = req.params.page
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      bookingController.bookingsListSelectCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select bookings list view
  app.get(`${basePath}/getBookingsView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      bookingController.getBookingsViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider update location list view
  app.get(`${basePath}/getProviderLocationBookingsView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      bookingController.getProviderLocationBookingsViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // appSlider Page View
  app.get(`${basePath}/appSliderView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      appSliderController.appSliderPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select appSlider
  app.get(`${basePath}/getappSliderView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      appSliderController.getappSliderViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // appSlider Update
  app.post(`${basePath}/appSliderEdit`, [
    validator.check('Title').trim().isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Image').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],file'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      appSliderController.appSliderEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // users push notification view Page View
  app.get(`${basePath}/usersPushNotificationView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      usersController.usersPushNotificationPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // users push notification search data view View
  app.get(`${basePath}/usersPushNotificationSearchView/:name`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var name = { name: req.params.name, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      usersController.usersPushNotificationSearchDataViewCtrl(name, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // providers push notification Page View
  app.get(`${basePath}/providersPushNotificationView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providersPushNotificationPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // provider push notification search data view View
  app.get(`${basePath}/providerPushNotificationSearchView/:name`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var name = { name: req.params.name, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providerPushNotificationSearchDataViewCtrl(name, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // user PushNotification Send
  app.post(`${basePath}/userPushNotificationSend`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      usersController.usersPushNotificationSendCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // provider PushNotification Send
  app.post(`${basePath}/providerPushNotificationSend`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providersPushNotificationSendCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // app Slider Add
  app.post(`${basePath}/fileUpload`, async function (req, res) {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = { req: req, res: res }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      fileUploadCtrl.fileUploadCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Booking Clear Api
  app.post(`${basePath}/bookingAllDelete`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      bookingController.bookingAllDeleteCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // common search Page View
  app.get(`${basePath}/commonSearchViewPage/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var data = JSON.parse(req.params.page)
    var page = { typename: data.typename, search: data.search, page: data.page, limit: limit, type: data.type, IsDeliveryOpt: data.IsDeliveryOpt }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      searchController.commonSearchViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // get users and providers list in html content
  app.get(`${basePath}/getUsersProviderList`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.query
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      usersController.getUsersProviderListCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message.data)
        })
      })
    }
  })
  // Admin panel get provider list provider vehicle
  app.get(`${basePath}/getProviderDetailsListView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.getProviderDetailsListViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin panel get provider list provider vehicle documents
  app.get(`${basePath}/getProviderVehicleDocumentsDetailsListView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.getProviderVehicleDocumentsDetailsListViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get providers vehicle list
  app.get(`${basePath}/getProviderVehicleListView/:id`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.getProviderVehicleListViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message.data)
        })
      })
    }
  })
  // Admin Select provider vehicle edit
  app.post(`${basePath}/providerVehicleEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providerVehicleEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // Admin Select provider vehicle documents edit
  app.post(`${basePath}/providerVehicleDocumentsEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providerVehicleDocumentsEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // provider Account creation
  app.post(`${basePath}/providerAccountCreation`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      providersController.providerAccountCreationCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin app slider delete
  app.post(`${basePath}/appSliderDelete`, [
    validator.check('id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      appSliderController.appSliderDeleteCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // admin promocodes add
  app.post(`${basePath}/promoCodesAdd`, [
    validator.check('Name').trim().isLength({ min: 1, max: 250 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('Coupon').trim().isLength({ min: 1, max: 30 })
      .withMessage('INVALID: $[1],Coupon'),
    validator.check('Discount').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Discount'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('MinValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MinValueToRedeem'),
    validator.check('MaxValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MaxValueToRedeem'),
    validator.check('Threshold').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Threshold'),
    validator.check('Type').isIn(['percent', 'value']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('RedeemableType').isIn(['once', 'multiple']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],RedeemableType'),
    validator.check('ValidFrom').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidFrom'),
    validator.check('ValidTo').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidTo'),
    validator.check('Status').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      promoCodesCtrl.promoCodesAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get providers vehicle list
  app.get(`${basePath}/getPromoCodesListView`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      promoCodesCtrl.getPromoCodesListViewCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get providers vehicle list
  app.get(`${basePath}/getPromoCodesEditListView/:id`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      promoCodesCtrl.getPromoCodesEditListViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider vehicle edit
  app.post(`${basePath}/promoCodesEdit`, [
    validator.check('Id').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Id'),
    validator.check('Name').trim().isLength({ min: 1, max: 250 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('Coupon').trim().isLength({ min: 1, max: 20 })
      .withMessage('INVALID: $[1],Coupon'),
    validator.check('Discount').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Discount'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('MinValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MinValueToRedeem'),
    validator.check('MaxValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MaxValueToRedeem'),
    validator.check('Threshold').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Threshold'),
    validator.check('Type').isIn(['percent', 'value']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('RedeemableType').isIn(['once', 'multiple']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],RedeemableType'),
    validator.check('ValidFrom').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidFrom'),
    validator.check('ValidTo').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidTo'),
    validator.check('Status').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      promoCodesCtrl.promoCodesEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin promo
  app.post(`${basePath}/promocodesStatusUpdate`, [
    validator.check('Id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],id'),
    validator.check('Status').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      promoCodesCtrl.promoCodesStatusUpdateCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin page Select review management
  app.post(`${basePath}/getUserProviderReviewManagement/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    var body = req.body
    page.type = body.type
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      reviewManagementCtrl.admingetUserProviderReviewManagementCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // banner ads Add
  app.post(`${basePath}/bannerAdsAdd`, [
    validator.check('Title').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Title'),
    // validator.check('Description').trim().isLength({ min: 1, max: 255 })
    //   .withMessage('INVALID: $[1],Description'),
    validator.check('Image_path').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Image_path').optional().withMessage('INVALID: $[1],Image_path'),
    // validator.check('Url').isLength({ min: 1, max: 10 })
    //   .withMessage('INVALID: $[1],Url'),
    validator.check('Status').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      bannerAdsCtrl.bannerAdsAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // banner ads Page View
  app.get(`${basePath}/bannerAdsView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      bannerAdsCtrl.bannerAdsPageViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select banner ads
  app.get(`${basePath}/getbannerAdsView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      bannerAdsCtrl.getbannerAdsViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // banner ads Update
  app.post(`${basePath}/bannerAdsEdit`, [
    validator.check('Title').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Title'),
    // validator.check('Description').trim().isLength({ min: 1, max: 255 })
    //   .withMessage('INVALID: $[1],Description'),
    validator.check('Image_path').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Image_path').optional().withMessage('INVALID: $[1],Image_path'),
    // validator.check('Url').isLength({ min: 1, max: 10 })
    //   .withMessage('INVALID: $[1],Url'),
    validator.check('Status').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      bannerAdsCtrl.bannerAdsEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin banner ads status update
  app.post(`${basePath}/bannerAdsStatusUpdate`, [
    validator.check('Id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],id'),
    validator.check('Status').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      bannerAdsCtrl.bannerAdsStatusUpdateCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select peek charges
  app.get(`${basePath}/getPeekChargesListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      peekChargesCtrl.getPeekChargesPageViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // admin promocodes add
  app.post(`${basePath}/peekChargesAdd`, [
    validator.check('type').isIn(['day', 'week']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('name').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('daydata').optional()
      .withMessage('INVALID: $[1],daydata'),
    validator.check('weekdata').optional()
      .withMessage('INVALID: $[1],weekdata'),
    validator.check('starttime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],starttime'),
    validator.check('endtime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],endtime'),
    validator.check('fare').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],fare'),
    validator.check('minamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Min Amount'),
    validator.check('maxamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Max Amount')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      peekChargesCtrl.peekChargesAddCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get peek charges list
  app.get(`${basePath}/getPeekChargesEditListView/:id`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      peekChargesCtrl.getPeekChargesEditListViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select peek charges edit
  app.post(`${basePath}/peekChargesEdit`, [
    validator.check('Id').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Id'),
    validator.check('type').isIn(['day', 'week']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('name').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('daydata').optional()
      .withMessage('INVALID: $[1],daydata'),
    validator.check('weekdata').optional()
      .withMessage('INVALID: $[1],weekdata'),
    validator.check('starttime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],starttime'),
    validator.check('endtime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],endtime'),
    validator.check('fare').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],fare'),
    validator.check('minamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Min Amount'),
    validator.check('maxamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Max Amount')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      peekChargesCtrl.peekChargesEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select withdrawl requests
  app.get(`${basePath}/getWithdrawlListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      walletController.getWithdrawlListViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin with drawl request status update
  app.post(`${basePath}/withDrawlRequestStatusUpdate`, [
    validator.check('Id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Id'),
    validator.check('Status').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      walletController.withDrawlRequestStatusUpdateCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // services Page View
  app.get(`${basePath}/servicesTitleListView`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.servicesTitleListViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // services  Update
  app.post(`${basePath}/servicesTitleEdit`, [
    validator.check('Title').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Title'),
    validator.check('Color').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Status').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Status'),
    validator.check('Id').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      servicesController.servicesTitleEditCtrl(data, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // get servicesTitle list
  app.get(`${basePath}/servicesTitleView/:id`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.servicesTitleViewCtrl(id, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // services List View
  app.post(`${basePath}/servicesListing`, [
    validator.check('providerId').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],providerId')], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.servicesListingCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  app.post(`${basePath}/s2CellId`, [
    validator.check('latitude').isNumeric().trim()
      .withMessage('INVALID: $[1], latitude'),
    validator.check('longitude').isNumeric().trim()
      .withMessage('INVALID: $[1], longitude')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.getS2CellGeomentryCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // ServiceCategory  View
  app.post(`${basePath}/serviceCategoryListView/:page`, [
    // validator.check('titleId').isNumeric().trim()
    //   .withMessage('INVALID: $[1], titleId')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit, titleId: req.body.titleId }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.serviceCategoryListViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // add category
  app.post(`${basePath}/addCategory`, [
    validator.check('titleId').isNumeric().trim()
      .withMessage('INVALID: $[1], titleId'),
    validator.check('name').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], name'),
    validator.check('type').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], type'),
    validator.check('hasSubCategory').isNumeric().trim()
      .withMessage('INVALID: $[1], hasSubCategory'),
    validator.check('isFixedPricing').isNumeric().trim()
      .withMessage('INVALID: $[1], isFixedPricing'),
    validator.check('icon').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], icon')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.addCategoryCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // edit category
  app.post(`${basePath}/EditCategory`, [
    validator.check('titleId').isNumeric().trim()
      .withMessage('INVALID: $[1], titleId'),
    validator.check('name').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], name'),
    validator.check('type').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], type'),
    validator.check('hasSubCategory').isNumeric().trim()
      .withMessage('INVALID: $[1], hasSubCategory'),
    validator.check('isFixedPricing').isNumeric().trim()
      .withMessage('INVALID: $[1], isFixedPricing'),
    validator.check('icon').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], icon')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.EditCategoryCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // ServiceCategory  View
  app.post(`${basePath}/categoryView`, [
    validator.check('id').isNumeric().trim()
      .withMessage('INVALID: $[1], titleId')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.categoryViewCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // add SubCategory
  app.post(`${basePath}/addSubCategory`, [
    validator.check('categoryId').isNumeric().trim()
      .withMessage('INVALID: $[1], categoryId'),
    validator.check('name').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], name'),
    validator.check('image').isLength({ min: 1, max: 500 }).trim()
      .withMessage('INVALID: $[1], image'),
    validator.check('isFixedPricing').isNumeric().trim()
      .withMessage('INVALID: $[1], isFixedPricing')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.addSubCategoryCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  app.get(`${basePath}/serviceSubCategoryListView/:page`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.serviceSubCategoryListViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  app.get(`${basePath}/categoryList`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.categoryListCtrl((result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // SubCategory  View
  app.post(`${basePath}/subCategoryView`, [
    validator.check('subCategoryId').isNumeric().trim()
      .withMessage('INVALID: $[1], subCategoryId')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.subCategoryViewCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // Edit SubCategory
  app.post(`${basePath}/editSubCategory`, [
    validator.check('subCategoryId').isNumeric().trim()
      .withMessage('INVALID: $[1], subCategoryId'),
    validator.check('categoryId').isNumeric().trim()
      .withMessage('INVALID: $[1], categoryId'),
    validator.check('name').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], name'),
    validator.check('image').isLength({ min: 1, max: 500 }).trim()
      .withMessage('INVALID: $[1], image'),
    validator.check('isFixedPricing').isNumeric().trim()
      .withMessage('INVALID: $[1], isFixedPricing'),
    validator.check('servicesDisplayStyle').isNumeric().trim()
      .withMessage('INVALID: $[1], servicesDisplayStyle')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.editSubCategoryCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // services add
  app.post(`${basePath}/addServices`, [
    validator.check('categoryId').isNumeric().trim()
      .withMessage('INVALID: $[1], categoryId'),
    validator.check('subCategoryId').isNumeric().optional()
      .withMessage('INVALID: $[1], subCategoryId'),
    validator.check('subTitle').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], subTitle'),
    validator.check('name').isLength({ min: 1, max: 500 }).trim()
      .withMessage('INVALID: $[1], name'),
    // validator.check('image').isLength({ min: 1, max: 500 }).trim()
    //   .withMessage('INVALID: $[1], image'),
    validator.check('price').isNumeric().trim()
      .withMessage('INVALID: $[1], price'),
    validator.check('isFixedPrice').isNumeric().trim()
      .withMessage('INVALID: $[1], isFixedPrice'),
    validator.check('pricePerHour').isNumeric().optional()
      .withMessage('INVALID: $[1], pricePerHour'),
    validator.check('status').isNumeric().trim()
      .withMessage('INVALID: $[1], status'),
    validator.check('slashPrice').isNumeric().trim()
      .withMessage('INVALID: $[1], slashPrice'),
    validator.check('duration').isLength({ min: 1, max: 20 }).trim()
      .withMessage('INVALID: $[1], duration')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.addServicesCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // services edit
  app.post(`${basePath}/editServices`, [
    validator.check('id').isNumeric().trim()
      .withMessage('INVALID: $[1], id'),
    validator.check('categoryId').isNumeric().trim()
      .withMessage('INVALID: $[1], categoryId'),
    validator.check('subCategoryId').isNumeric().optional()
      .withMessage('INVALID: $[1], subCategoryId'),
    validator.check('subTitle').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1], subTitle'),
    validator.check('name').isLength({ min: 1, max: 500 }).trim()
      .withMessage('INVALID: $[1], name'),
    // validator.check('image').isLength({ min: 1, max: 500 }).trim()
    //   .withMessage('INVALID: $[1], image'),
    validator.check('price').isNumeric().trim()
      .withMessage('INVALID: $[1], price'),
    validator.check('isFixedPrice').isNumeric().trim()
      .withMessage('INVALID: $[1], isFixedPrice'),
    validator.check('pricePerHour').isNumeric().optional()
      .withMessage('INVALID: $[1], pricePerHour'),
    validator.check('status').isNumeric().trim()
      .withMessage('INVALID: $[1], status'),
    validator.check('slashPrice').isNumeric().trim()
      .withMessage('INVALID: $[1], slashPrice'),
    validator.check('duration').isLength({ min: 1, max: 20 }).trim()
      .withMessage('INVALID: $[1], duration')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.editServicesCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // services  View
  app.post(`${basePath}/servicesView`, [
    validator.check('servicesId').isNumeric().trim()
      .withMessage('INVALID: $[1], servicesId')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.servicesViewCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  app.get(`${basePath}/servicesList/:page`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      errorHandler.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.servicesListViewCtrl(page, (result) => {
        errorHandler.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // services  View
  app.post(`${basePath}/subCategoryList`, [
    validator.check('categoryId').isNumeric().trim()
      .withMessage('INVALID: $[1], servicesId')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.subCategoryListCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // services  View
  app.post(`${basePath}/updateStatus`, [
    validator.check('id').isNumeric().trim()
      .withMessage('INVALID: $[1], id'),
    validator.check('tableName').isLength({ min: 3, max: 50 }).trim()
      .withMessage('INVALID: $[1], tableName'),
    validator.check('status').isNumeric().trim()
      .withMessage('INVALID: $[1], status')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      servicesController.updateStatusCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  //Provider Enable and Disable
  app.post(`${basePath}/ProviderBlockStatus`,app.adminauth,(req,res)=>{
    const lang=req.headers.lang
    const error=validator.validation(req)
    var id=req.body
    if(error.array().length){
      errorHandler.requestHandler(error.array(),true,lang,(message)=>{
        return res.send(message)
      })
    } else{
      providersController.providerBlockStatusUpdate(id,(result)=>{
        errorHandler.ctrlHandler([result],result.error,lang,(message)=>{
          return res.send(message)
        })
      })
    }
  })

}
