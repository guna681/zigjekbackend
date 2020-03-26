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
              category.push(list)
            }
          })
          title.data = category
          services.push(title)
        })

        response.error = false
        response.msg = 'VALID'
        response.data = services
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }
}
