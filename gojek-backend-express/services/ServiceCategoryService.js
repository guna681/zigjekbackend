module.exports = function () {
  const ServiceRepository = require('../repository/ServiceRepository.js')

  var serviceRepository = new ServiceRepository()

  this.getServiceListing = async (callback) => {
    var response = {}
    try {
      var serviceTitle = await serviceRepository.fetchServiceTitle()
      if (serviceTitle.error) {
        response.error = true
        response.msg = 'OOPS'
      } else {
        var services = []
        var serviceCategory = await serviceRepository.fetchServiceCategory()
        var appsliderPSelectSData = await serviceRepository.bannerAdsPageView()
        serviceTitle.result.map(element => {
          if (element.Id == 4) {
            var title = {}
            var category = []
            title.title = element.Title
            title.color = element.Color
            serviceCategory.result.filter(categories => {
              var list = {}
              if (element.Id) {
                list.id = categories.Id
                list.name = categories.Name
                list.icon = categories.Icon
                list.type = categories.Type
                list.hasSubCategory = categories.HasSubCategory
                list.isFixedPricing = categories.IsFixedPricing
                category.push(list)
              }
            })
            title.data = category
            services.push(title)
          }
        })

        var data = {}
        data.banner = appsliderPSelectSData.data
        // data.banner5 = [
        //   {
        //     image: 'http://134.209.147.250:3000/images/banner/banner1.png',
        //     type: 'CATEGORY',
        //     categoryId: '1',
        //     webUrl: null,
        //     description: 'Zig Taxi'
        //   },
        //   {
        //     image: 'http://134.209.147.250:3000/images/banner/banner2.png',
        //     type: 'WEB',
        //     categoryId: null,
        //     webUrl: 'https://www.google.com',
        //     description: 'Eatoo'
        //   }
        // ]
        data.serviceList = services

        response.error = false
        response.msg = 'VALID'
        response.data = data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.getServiceSubCategoryListing = async (req, callback) => {
    var response = {}
    try {
      var data = { CategoryId: req.categoryId }
      var service = {}
      service.viewType = 'list'
      var subCategoryList = await serviceRepository.fetchServiceSubCategory(data)
      service.subCategoryList = subCategoryList.error ? [] : subCategoryList.result
      subCategoryList.result.map(element => {
        element.description = [{ text: 'Expert Cleaning Service' }]
      })
      response.error = false
      response.msg = 'VALID'
      response.data = service
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }
  this.getServiceGroupListing = async (req, callback) => {
    var response = {}
    try {
      var data = { CategoryId: req.categoryId }
      var service = {}
      service.viewType = 'list'
      var groupList = await serviceRepository.fetchServiceGroup(data)
      var categoryBanner = await serviceRepository.fetchServiceCategoryBanner(data)
      var categoryExtras = await serviceRepository.fetchServiceCategoryExtras(data)
      var categorySlide = await serviceRepository.fetchServiceCategorySlide(data)
      service.groupList = groupList.error ? [] : groupList.result
      service.groupTitle = 'What do you want help with ?'
      service.categoryBanner = categoryBanner.error ? [] : categoryBanner.result
      service.categoryExtras = categoryExtras.error ? [] : categoryExtras.result
      service.categorySlide = categorySlide.error ? [] : categorySlide.result
      service.categorySlideTitle = 'See how its get done'
      service.rating = [{ rating: '4.0', totalReview: '100' }]
      service.ratingTitle = 'What user are saying about us'
      response.error = false
      response.msg = 'VALID'
      response.data = service
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.getServiceListingInGroup = async (req, callback) => {
    var response = {}
    try {
      var data
      var serviceId
      var serviceIds
      if (req.groupId) {
        data = { GroupId: req.groupId }
        serviceId = await serviceRepository.fetchGroupService(data)
        serviceIds = serviceId.error ? [] : serviceId.result
        var serviceList = await serviceRepository.fetchServiceListingUsingIds(serviceIds)
      } else if (req.subCategoryId) {
        data = { SubCategoryId: req.subCategoryId }
        serviceList = await serviceRepository.fetchServiceListing(data)
        serviceIds = serviceList.error ? [] : serviceList.result.map((element) => { return element.id })
      }
      if (serviceIds == undefined) {
        response.error = true
        response.msg = 'NO_DATA'
      } else {
        var serviceImage = await serviceRepository.fetchServiceImages(serviceIds)
        if (serviceList.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          var service = serviceList.result.map((element) => { element.serviceImage = serviceImage.result.filter((element1) => element.id === element1.serviceId); return element })
          response.error = false
          response.msg = 'VALID'
          response.data = service
        }
      }
      callback(response)
    } catch (err) {
      response.error = true
      response.msg = 'OOPS'
      callback(response)
    }
  }

  this.getServiceSubCategoryLandingService = async (req, callback) => {
    var response = {}
    try {
      var data = { SubCategoryId: req.subCategoryId }
      var service = {}
      service.viewType = 'list'
      // var serviceList = await serviceRepository.fetchServiceListing(data)
      var categoryBanner = await serviceRepository.fetchServiceCategoryBanner(data)
      var categoryExtras = await serviceRepository.fetchServiceCategoryExtras(data)
      var categorySlide = await serviceRepository.fetchServiceCategorySlide(data)
      var servideTitle = await serviceRepository.subCategoryServiceTitle(data)
      var subCategoryData = await serviceRepository.subCategoryServiceView(req.subCategoryId)
      var ratingData = await serviceRepository.rating(data)
      service.serviceList = []
      service.groupTitle = servideTitle.result[0].Title
      service.categoryBanner = categoryBanner.error ? [] : categoryBanner.result
      service.categoryExtras = categoryExtras.error ? [] : categoryExtras.result
      service.categorySlide = categorySlide.error ? [] : categorySlide.result
      service.categorySlideTitle = subCategoryData.result[0].CategorySlideTitle
      service.rating = [{ rating: Math.round(ratingData.data[0].totalRating) + '/5', totalReview: ratingData.data[0].totalReview }]
      service.ratingTitle = 'What user are saying about us'
      response.error = false
      response.msg = 'VALID'
      response.data = service
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }
}
