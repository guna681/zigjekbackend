module.exports = function () {
  const TrackingRepository = require('../repository/TrackingRepository')
  const Common = require('../Utils/common')

  var trackingRepository = new TrackingRepository()
  var common = new Common()

  this.fetchProivderLocation = async (data, callback) => {
    var response = {}
    try {
      var condition = {}
      var result = {}
      condition.S2CellId = await common.getCellIdFromCoordinates(data.lat, data.lon)
      var neighbourCellId = await common.getNeighborsUsingS2Key(data.lat, data.lon)
      var neighbourCellIds = neighbourCellId.key
      neighbourCellIds.push(condition.S2CellId.id)
      var providerList = await trackingRepository.fetchProviderLocationByS2(neighbourCellIds, 'active')

      result.providerLocation = providerList.result

      if (providerList.error) {
        response.error = true
        response.data = result
        response.msg = 'NO_PROVIDER'
      } else {
        response.error = false
        response.data = result
        response.msg = 'PROVIDER_AVAILABLE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.automation = async (data, callback) => {
    await trackingRepository.stimulateProviderLocation()
  }

  this.getRandProviderLocation = async (data, callback) => {
    var response = {}
    try {
      var input = {}
      var result = {}
      var activeProvider = []
      input.S2CellId = 1
      var list = await trackingRepository.getActiveProvider(input)
      if (list.error) {
        response.error = true
        response.msg = 'SERVICE_NOT_AVAILABLE'
      } else {
        list.result.forEach((element) => {
          activeProvider.push(element.ProviderId)
        })
        var provider = await trackingRepository.getProviderLocation(input)
        result.providerLocation = provider.result
        result.active = activeProvider
        response.error = false
        response.msg = 'PROVIDER_AVAILABLE'
        response.data = result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }
}
