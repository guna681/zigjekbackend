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
        serviceTitle.result.map(element => {
          var title = {}
          var category = []
          title.title = element.Title
          title.color = element.Color
          serviceCategory.result.filter(categories => {
            var list = {}
            if (element.Id === categories.TitleId) {
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
        })

        var data = {}
        data.banner = [
          {
            image: 'http://134.209.147.250:3000/images/banner/banner1.png',
            type: 'CATEGORY',
            categoryId: '1',
            webUrl: null,
            description: 'Zig Taxi'
          },
          {
            image: 'http://134.209.147.250:3000/images/banner/banner2.png',
            type: 'WEB',
            categoryId: null,
            webUrl: 'https://www.google.com',
            description: 'Eatoo'
          }
        ]
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
      var subCategoryList = await serviceRepository.fetchServiceSubCategory(data)
      var categoryBanner = await serviceRepository.fetchServiceCategoryBanner(data)
      var categoryExtras = await serviceRepository.fetchServiceCategoryExtras(data)
      var categorySlide = await serviceRepository.fetchServiceCategorySlide(data)
      service.subCategoryList = subCategoryList.error ? [] : subCategoryList.result
      service.categoryBanner = categoryBanner.error ? [] : categoryBanner.result
      service.categoryExtras = categoryExtras.error ? [] : categoryExtras.result
      service.categorySlide = categorySlide.error ? [] : categorySlide.result
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
      var groupList = await serviceRepository.fetchServiceGroup(data)
      var categoryBanner = await serviceRepository.fetchServiceCategoryBanner(data)
      var categoryExtras = await serviceRepository.fetchServiceCategoryExtras(data)
      var categorySlide = await serviceRepository.fetchServiceCategorySlide(data)
      service.groupList = groupList.error ? [] : groupList.result
      service.categoryBanner = categoryBanner.error ? [] : categoryBanner.result
      service.categoryExtras = categoryExtras.error ? [] : categoryExtras.result
      service.categorySlide = categorySlide.error ? [] : categorySlide.result
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
