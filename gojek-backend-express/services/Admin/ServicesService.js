module.exports = function () {
  const ServicesRepository = require('../../repository/Admin/ServicesRepository')
  require('dotenv').config({ path: './../.env' })
  const Common = require('../../Utils/common')

  var servicesRepository = new ServicesRepository()
  var common = new Common()

  this.servicesTitleService = async (callback) => {
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
    var uresult = []
    try {
      var subCategorycount = await servicesRepository.categoryCount(data)
      var appsliderData = await servicesRepository.serviceCategoryView(data)
      if (appsliderData.error === false) {
        uresult.push({
          SubCategoryList: appsliderData.result,
          Count: subCategorycount.result[0].count
        })
        response.error = false
        response.data = uresult
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
        TitleId: data.titleId,
        Name: data.name,
        Type: data.type,
        Icon: data.icon,
        HasSubCategory: data.hasSubCategory,
        IsFixedPricing: data.isFixedPricing,
        PricePerHour: data.pricePerHour,
        DisplayType: data.displayType,
        DisplayDescription: data.displayDescription
      }
      const serviceCategory = 'ServiceCategory'
      var categorydata = {
        table: serviceCategory,
        data: resData
      }
      var appsliderData = await servicesRepository.categoryAdd(categorydata)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
        if (data.type == 'SERVICE') {
          var bannerImages = JSON.parse(data.bannerImage)
          var description  = JSON.parse(data.description)
          if (bannerImages !== '') {
            bannerImages.map(async element => {
              var bannerData = {
                CategoryId: appsliderData.data[0],
                SubCategoryId: data.subCategoryId,
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
                SubCategoryId: data.subCategoryId,
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
            var promotionTitlesData = await servicesRepository.promotionTitleAdd(promotionTitleData)
          }
          var promotionImage  = JSON.parse(data.promotionImage)
          if (promotionImage !== '') {
            promotionImage.map(async element => {
              var promotionImageData = {
                CategoryId: appsliderData.data[0],
                SubCategoryId: data.subCategoryId,
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
        TitleId: data.titleId,
        Name: data.name,
        Type: data.type,
        Icon: data.icon,
        Status: '1',
        HasSubCategory: data.hasSubCategory,
        IsFixedPricing: data.isFixedPricing,
        PricePerHour: data.pricePerHour,
        DisplayType: data.displayType,
        DisplayDescription: data.displayDescription
      }
      var categorydata = {
        table: { serviceCategory: 'ServiceCategory' },
        data: resData,
        where: { Id: data.id }
      }
      var appsliderData = await servicesRepository.categoryEdit(categorydata)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
        if (data.type == 'SERVICE') {
          var bannerImages = JSON.parse(data.bannerImage)
          var description  = JSON.parse(data.description)
          if (bannerImages !== '') {
            bannerImages.map(async element => {
              
              if (element.isDeleted == '1') {
                const serviceCategoryBanner = 'ServiceCategoryBanner'
                var bannerImageEdit = {
                  table: serviceCategoryBanner,
                  // data: bannerData,
                  where: { Id: element.Id }
                }
                var bannerImagesData = await servicesRepository.categoryDelete(bannerImageEdit)
              } else if (!element.Id) {
                var bannerData = {
                  CategoryId: data.id,
                  SubCategoryId: data.subCategoryId,
                  Path: element.bannerImage,
                  Type: element.Type
                }
                var bannerImagesData = await servicesRepository.categoryBannerAdd(bannerData)
              } else {
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
              }
            })
          }
          if (description !== '') {
            description.map(async element => {

              if (element.isDeleted == '1') {
                const serviceCategoryExtras = 'ServiceCategoryExtras'
                var descriptionEdit = {
                  table: serviceCategoryExtras,
                  // data: bannerData,
                  where: { Id: element.Id }
                }
                var descriptionResult = await servicesRepository.categoryDelete(descriptionEdit)
              } else if (!element.Id) {
                var descriptionData = {
                  CategoryId: data.id,
                  SubCategoryId: data.subCategoryId,
                  Icon: element.Icon,
                  Text: element.Text
                }
                var bannerImagesData = await servicesRepository.serviceCategoryExtrasAdd(descriptionData)
              } else {
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
              }
            })
          }
          if (data.promotionTitle) {
            var promotionTitleData = {
              Title: data.promotionTitle
            }
            var categoryData = {
              CategoryId: data.id
            }
            var promotionTitleEdit = {
              table: { serviceCategoryTitle: 'ServiceCategoryTitle' },
              data: promotionTitleData,
              where: categoryData
            }
            var promotionTitlesData = await servicesRepository.categoryEdit(promotionTitleEdit)
          }
          var promotionImage  = JSON.parse(data.promotionImage)
          if (promotionImage !== '') {
            promotionImage.map(async element => {
            
              if (element.isDeleted == '1') {
                const serviceCategorySlide = 'ServiceCategorySlide'
                var promotionImageEdit = {
                  table: serviceCategorySlide,
                  // data: bannerData,
                  where: { Id: element.Id }
                }
                var bannerImagesData = await servicesRepository.categoryDelete(promotionImageEdit)
              } else if (!element.Id) {
                var bannerImagesData = {
                  CategoryId: data.id,
                  SubCategoryId: data.subCategoryId,
                  Image: element.Image,
                  Text: element.Text
                }
                var bannerImagesResult = await servicesRepository.promotionImageAdd(bannerImagesData)
              } else {
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
              }
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

  this.addSubCategoryService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        CategoryId: data.categoryId,
        Name: data.name,
        Image: data.image,
        IsFixedPricing: data.isFixedPricing,
        PricePerHour: data.pricePerHour,
        ServicesDisplayStyle: data.servicesDisplayStyle
      }
      const serviceSubCategory = 'ServiceSubCategory'
      var subCategoryData = {
        table: serviceSubCategory,
        data: resData
      }
      var appsliderData = await servicesRepository.categoryAdd(subCategoryData)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
        if (data.type == 'SERVICE') {
          var bannerImages = JSON.parse(data.bannerImage)
          var description  = JSON.parse(data.description)
          if (bannerImages !== '') {
            bannerImages.map(async element => {
              var bannerData = {
                CategoryId: data.categoryId,
                SubCategoryId: appsliderData.data[0],
                Path: element.bannerImage,
                Type: element.Type
              }
              var bannerImagesData = await servicesRepository.categoryBannerAdd(bannerData)
            })
          }
          if (description !== '') {
            description.map(async element => {
              var bannerData = {
                CategoryId: data.categoryId,
                SubCategoryId: appsliderData.data[0],
                Icon: element.Icon,
                Text: element.Text
              }
              var serviceCategoryExtrasData = await servicesRepository.serviceCategoryExtrasAdd(bannerData)
            })
          }
          if (data.promotionTitle) {
            var promotionTitleData = {
              CategoryId: data.categoryId,
              SubCategoryId: appsliderData.data[0],
              Title: data.promotionTitle
            }
            var promotionTitlesData = await servicesRepository.promotionTitleAdd(promotionTitleData)
          }
          var promotionImage  = JSON.parse(data.promotionImage)
          if (promotionImage !== '') {
            promotionImage.map(async element => {
              var promotionImageData = {
                CategoryId: data.categoryId,
                SubCategoryId: appsliderData.data[0],
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

  this.subCategoryService = async (data, callback) => {
    var response = {}
    try {
      var uresult = []
      var table = { serviceSubCategory: 'ServiceSubCategory' }
      var subCategorycount = await servicesRepository.subCategoryCount(data, table)
      var appsliderData = await servicesRepository.subCategoryView(data)
      if (appsliderData.error === false) {
        uresult.push({
          SubCategoryList: appsliderData.result,
          Count: subCategorycount.result[0].count
        })
        response.error = false
        response.data = uresult
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
  this.categoryListService = async (callback) => {
    var response = {}
    try {
      var appsliderData = await servicesRepository.CategoryListView()
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
  // sub Category view
  this.subCategoryViewService = async (data, callback) => {
    var response = {}
    try {
      var categorydata = {
        table: { serviceSubCategory: 'ServiceSubCategory' },
        where: { Id: data.subCategoryId }
      }
      var subCategoryViewData = await servicesRepository.categoryView(categorydata)
      var bannerImagesData = {
        table: { serviceCategoryBanner: 'ServiceCategoryBanner' },
        where: { SubCategoryId: data.subCategoryId }
      }
      var bannerImagesViewData = await servicesRepository.CategoryBannerView(bannerImagesData)
      var descriptionImagesData = {
        table: { serviceCategoryExtras: 'ServiceCategoryExtras' },
        where: { SubCategoryId: data.subCategoryId }
      }
      var descriptionImagesViewData = await servicesRepository.categoryView(descriptionImagesData)

      var promotionImageData = {
        table: { serviceCategorySlide: 'ServiceCategorySlide' },
        where: { SubCategoryId: data.subCategoryId }
      }
      var promotionImageViewData = await servicesRepository.categoryView(promotionImageData)

      var promotionTitleData = {
        table: { serviceCategoryTitle: 'ServiceCategoryTitle' },
        where: { SubCategoryId: data.subCategoryId }
      }
      var promotionTitleViewData = await servicesRepository.categoryView(promotionTitleData)
      if (subCategoryViewData.error === false) {
        var result = []
        result.push({ subCategory: subCategoryViewData.data }, { bannerImage: bannerImagesViewData.data },
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

  this.editSubCategoryService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        CategoryId: data.categoryId,
        Name: data.name,
        Image: data.image,
        Status: '1',
        IsFixedPricing: data.isFixedPricing,
        PricePerHour: data.pricePerHour,
        ServicesDisplayStyle: data.servicesDisplayStyle
      }
      var categorydata = {
        table: { serviceSubCategory: 'ServiceSubCategory' },
        data: resData,
        where: { Id: data.subCategoryId }
      }
      var appsliderData = await servicesRepository.categoryEdit(categorydata)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
        response.msg = 'VALID'
        // if (data.type == 'SERVICE') {
        var bannerImages = JSON.parse(data.bannerImage)
        var description = JSON.parse(data.description)
        if (bannerImages !== '') {
          bannerImages.map(async element => {
            if (element.isDeleted == '1') {
              const serviceCategoryBanner = 'ServiceCategoryBanner'
              var bannerImageEdit = {
                table: serviceCategoryBanner,
                // data: bannerData,
                where: { Id: element.Id }
              }
              var bannerImagesData = await servicesRepository.categoryDelete(bannerImageEdit)
            } else if (!element.Id) {
              var bannerData = {
                CategoryId: data.categoryId,
                SubCategoryId: data.subCategoryId,
                Path: element.bannerImage,
                Type: element.Type
              }
              var bannerImagesData = await servicesRepository.categoryBannerAdd(bannerData)
            } else {
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
            }
          })
        }
        if (description !== '') {
          description.map(async element => {
            if (element.isDeleted == '1') {
              const serviceCategoryExtras = 'ServiceCategoryExtras'
              var descriptionEdit = {
                table: serviceCategoryExtras,
                // data: bannerData,
                where: { Id: element.Id }
              }
              var descriptionResult = await servicesRepository.categoryDelete(descriptionEdit)
            } else if (!element.Id) {
              var descriptionData = {
                CategoryId: data.categoryId,
                SubCategoryId: data.subCategoryId,
                Icon: element.Icon,
                Text: element.Text
              }
              var bannerImagesData = await servicesRepository.serviceCategoryExtrasAdd(descriptionData)
            } else {
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
            }
          })
        }
        if (data.promotionTitle) {
          var promotionTitleData = {
            Title: data.promotionTitle
          }
          var promotionTitleEdit = {
            table: { serviceCategoryTitle: 'ServiceCategoryTitle' },
            data: promotionTitleData,
            where: { subCategoryId: data.subCategoryId }
          }
          var promotionTitlesData = servicesRepository.categoryEdit(promotionTitleEdit)
        }
        var promotionImage  = JSON.parse(data.promotionImage)
        if (promotionImage !== '') {
          promotionImage.map(async element => {
          
            if (element.isDeleted == '1') {
              const serviceCategorySlide = 'ServiceCategorySlide'
              var promotionImageEdit = {
                table: serviceCategorySlide,
                // data: bannerData,
                where: { Id: element.Id }
              }
              var bannerImagesData = await servicesRepository.categoryDelete(promotionImageEdit)
            } else if (!element.Id) {
              var bannerImagesData = {
                CategoryId: data.categoryId,
                SubCategoryId: data.subCategoryId,
                Image: element.Image,
                Text: element.Text
              }
              var bannerImagesResult = await servicesRepository.promotionImageAdd(bannerImagesData)
            } else {
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
            }
          })
        }
        // }
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

  this.addServicesService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        categoryId: data.categoryId,
        SubCategoryId: data.subCategoryId,
        SubTitle: data.subTitle,
        Name: data.name,
        Image: null,
        Price: data.price,
        IsFixedPrice: data.isFixedPrice,
        PricePerHour: data.pricePerHour,
        Status: data.status,
        Limit: '5',
        SlashPrice: data.slashPrice,
        CurrencyType: '$',
        Commission: data.commission,
        Description: data.description,
        Duration: data.duration
      }
      var appsliderData = await servicesRepository.addServices(resData)
      if (appsliderData.error === false) {
        var image  = JSON.parse(data.image)
        if (image !== '') {
          image.map(async element => {
            var bannerData = {
              ServiceId: appsliderData['data'],
              Path: element.Image,
              Type: element.Type
            }
            var bannerImagesData = await servicesRepository.servicesImageAdd(bannerData)
          })
        }
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

  this.editServicesService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        categoryId: data.categoryId,
        SubCategoryId: data.subCategoryId,
        SubTitle: data.subTitle,
        Name: data.name,
        // Image: data.image,
        Price: data.price,
        IsFixedPrice: data.isFixedPrice,
        PricePerHour: data.pricePerHour,
        Status: data.status,
        SlashPrice: data.slashPrice,
        Commission: data.commission,
        Description: data.description,
        Duration: data.duration
      }
      var servicesdata = {
        table: { service: 'Service' },
        data: resData,
        where: { Id: data.id }
      }
      var appsliderData = await servicesRepository.categoryEdit(servicesdata)
      if (appsliderData.error === false) {
        var image = JSON.parse(data.image)
        if (image !== '') {
          image.map(async element => {
            if (element.isDeleted == '1') {
              const serviceImage = 'ServiceImage'
              var bannerImageEdit = {
                table: serviceImage,
                where: { Id: element.Id }
              }
              var imagesData = await servicesRepository.categoryDelete(bannerImageEdit)
            } else if (!element.Id) {
              var servicesImagesData = {
                ServiceId: data.id,
                Path: element.Image,
                Type: element.Type
              }
              var bannerImagesData = await servicesRepository.servicesImageAdd(servicesImagesData)
            } else {
              var images = {
                Path: element.Image,
                Type: element.Type
              }
              var ImageEdit = {
                table: { serviceImage: 'ServiceImage' },
                data: images,
                where: { Id: element.Id }
              }
              var imageseditData = await servicesRepository.categoryEdit(ImageEdit)
            }
          })
        }
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

  this.servicesViewService = async (data, callback) => {
    var response = {}
    try {
      var categorydata = {
        table: { service: 'Service' },
        where: { Id: data.servicesId }
      }
      var servicesViewData = await servicesRepository.categoryView(categorydata)
      if (servicesViewData.error === false) {
        response.error = false
        response.data = servicesViewData.data
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

  this.servicesListService = async (data, callback) => {
    var response = {}
    try {
      var uresult = []
      var table = { service: 'Service' }
      var servicescount = await servicesRepository.subCategoryCount(data, table)
      var servicesListData = await servicesRepository.servicesListView(data, table)
      if (servicesListData.error === false) {
        uresult.push({
          SubCategoryList: servicesListData.result,
          Count: servicescount.result[0].count
        })
        response.error = false
        response.data = uresult
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

  this.subCategoryListService = async (data, callback) => {
    var response = {}
    try {
      var categorydata = {
        table: { serviceSubCategory: 'ServiceSubCategory' },
        where: { CategoryId: data.categoryId }
      }
      var servicesViewData = await servicesRepository.categoryView(categorydata)
      if (servicesViewData.error === false) {
        response.error = false
        response.data = servicesViewData.data
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
