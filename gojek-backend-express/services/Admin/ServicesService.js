module.exports = function () {
  const ServicesRepository = require('../../repository/Admin/ServicesRepository')
  require('dotenv').config({ path: './../.env' })
  const Common = require('../../Utils/common')

  var servicesRepository = new ServicesRepository()
  var common = new Common()

  this.servicesViewService = async (callback) => {
    var response = {}
    try {
      var appsliderData = await servicesRepository.servicesView()
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.servicesTitleEditService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        Title: data.Title,
        Color: data.Color,
        Status: data.Status
      }
      var appsliderdata = {
        data: resData,
        where: { Id: data.Id }
      }
      var appsliderData = await servicesRepository.servicesTitleEdit(appsliderdata)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.servicesTitleViewService = async (data, callback) => {
    var response = {}
    try {
      var appsliderData = await servicesRepository.servicesTitleView(data)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.servicesListingService = async (data, callback) => {
    var response = {}
    try {
      var serviceCategoryData = await servicesRepository.ProviderserviceCategory(data)
      var serviceSubCategoryData = await servicesRepository.ProviderserviceSubCategory(data)
      if (serviceCategoryData.error === false) {
        var res = {}
        res.serviceCategory = serviceCategoryData.data
        res.serviceSubCategory = serviceSubCategoryData.data
        response.error = false
        response.data = res
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getS2CellGeomentryService = async (req, callback) => {
    var response = {}
    try {
      var lat = req.latitude
      var long = req.longitude
      var getS2CellInfo = await common.getCellIdFromCoordinates(lat, long)
      if (getS2CellInfo.error) {
        response.error = getS2CellInfo.error
        response.msg = getS2CellInfo.msg
      } else {
        response.error = getS2CellInfo.error
        response.msg = 'VALID'
        response.data = { key: getS2CellInfo.key, id: getS2CellInfo.id }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.serviceCategoryService = async (data, callback) => {
    var response = {}
    try {
      var appsliderData = await servicesRepository.serviceCategoryView(data)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.result
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.addCategoryService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        TitleId: data.TitleId,
        Name: data.Name,
        Type: data.Type,
        Icon: data.Icon,
        HasSubCategory: data.HasSubCategory,
        IsFixedPricing: data.IsFixedPricing,
        PricePerHour: data.PricePerHour
      }

      var appsliderData = await servicesRepository.categoryAdd(resData)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
        if (data.Type == 'SERVICE') {
          var bannerImages = JSON.parse(data.bannerImage)
          var description  = JSON.parse(data.description)
          if (bannerImages !== '') {
            bannerImages.map(async element => {
              var bannerData = {
                CategoryId: appsliderData.data[0],
                SubCategoryId: data.SubCategoryId,
                Path: element.bannerImage,
                Type: element.Type
              }
              var bannerImagesData = await servicesRepository.categoryBannerAdd(bannerData)
            })
          }
          if (description !== '') {
            description.map(async element => {
              var bannerData = {
                CategoryId: appsliderData.data[0],
                SubCategoryId: data.SubCategoryId,
                Icon: element.Icon,
                Text: element.Text
              }
              var serviceCategoryExtrasData = await servicesRepository.serviceCategoryExtrasAdd(bannerData)
            })
          }
          if (data.promotionTitle) {
            var promotionTitleData = {
              CategoryId: appsliderData.data[0],
              Title: data.promotionTitle
            }
            var promotionTitlesData = servicesRepository.promotionTitleAdd(promotionTitleData)
          }
          var promotionImage  = JSON.parse(data.promotionImage)
          if (promotionImage !== '') {
            promotionImage.map(async element => {
              var promotionImageData = {
                CategoryId: appsliderData.data[0],
                SubCategoryId: data.SubCategoryId,
                Image: element.Image,
                Text: element.Text
              }
              var promotionData = await servicesRepository.promotionImageAdd(promotionImageData)
            })
          }
        }
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.EditCategoryService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        TitleId: data.TitleId,
        Name: data.Name,
        Type: data.Type,
        Icon: data.Icon,
        Status: '1',
        HasSubCategory: data.HasSubCategory,
        IsFixedPricing: data.IsFixedPricing,
        PricePerHour: data.PricePerHour
      }
      var categorydata = {
        table: { serviceCategory: 'ServiceCategory' },
        data: resData,
        where: { Id: data.Id }
      }
      var appsliderData = await servicesRepository.categoryEdit(categorydata)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
        if (data.Type == 'SERVICE') {
          var bannerImages = JSON.parse(data.bannerImage)
          var description  = JSON.parse(data.description)
          if (bannerImages !== '') {
            bannerImages.map(async element => {
              var bannerData = {
                Path: element.bannerImage,
                Type: element.Type
              }
              var bannerImageEdit = {
                table: { serviceCategoryBanner: 'ServiceCategoryBanner' },
                data: bannerData,
                where: { Id: element.Id }
              }
              var bannerImagesData = await servicesRepository.categoryEdit(bannerImageEdit)
            })
          }
          if (description !== '') {
            description.map(async element => {
              var descriptionData = {
                Icon: element.Icon,
                Text: element.Text
              }
              var descriptionEdit = {
                table: { serviceCategoryExtras: 'ServiceCategoryExtras' },
                data: descriptionData,
                where: { Id: element.Id }
              }
              var serviceCategoryExtrasData = await servicesRepository.categoryEdit(descriptionEdit)
            })
          }
          if (data.promotionTitle) {
            var promotionTitleData = {
              Title: data.promotionTitle
            }
            var promotionTitleEdit = {
              table: { serviceCategoryTitle: 'ServiceCategoryTitle' },
              data: promotionTitleData,
              where: { Id: data.promotionTitleId }
            }
            var promotionTitlesData = servicesRepository.categoryEdit(promotionTitleEdit)
          }
          var promotionImage  = JSON.parse(data.promotionImage)
          if (promotionImage !== '') {
            promotionImage.map(async element => {
              var promotionImageData = {
                Image: element.Image,
                Text: element.Text
              }
              var promotionImageEdit = {
                table: { serviceCategorySlide: 'ServiceCategorySlide' },
                data: promotionImageData,
                where: { Id: element.Id }
              }
              var promotionImages = await servicesRepository.categoryEdit(promotionImageEdit)
            })
          }
        }
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.categoryViewService = async (data, callback) => {
    var response = {}
    try {
      var categorydata = {
        table: { serviceCategory: 'ServiceCategory' },
        where: { Id: data.id }
      }
      var categoryViewData = await servicesRepository.categoryView(categorydata)
      var bannerImagesData = {
        table: { serviceCategoryBanner: 'ServiceCategoryBanner' },
        where: { CategoryId: data.id }
      }
      var bannerImagesViewData = await servicesRepository.CategoryBannerView(bannerImagesData)
      var descriptionImagesData = {
        table: { serviceCategoryExtras: 'ServiceCategoryExtras' },
        where: { CategoryId: data.id }
      }
      var descriptionImagesViewData = await servicesRepository.categoryView(descriptionImagesData)

      var promotionImageData = {
        table: { serviceCategorySlide: 'ServiceCategorySlide' },
        where: { CategoryId: data.id }
      }
      var promotionImageViewData = await servicesRepository.categoryView(promotionImageData)

      var promotionTitleData = {
        table: { serviceCategoryTitle: 'ServiceCategoryTitle' },
        where: { CategoryId: data.id }
      }
      var promotionTitleViewData = await servicesRepository.categoryView(promotionTitleData)
      if (categoryViewData.error === false) {
        var result = []
        result.push({ category: categoryViewData.data }, { bannerImage: bannerImagesViewData.data },
          { description: descriptionImagesViewData.data }, { promotionImage: promotionImageViewData.data },
          { promotionTitle: promotionTitleViewData.data })
        response.error = false
        response.data = result
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
