module.exports = function () {
  const VehicleRepository = require('../../repository/Admin/VehicleRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var vehicleRepository = new VehicleRepository();
  var common = new Common();

  this.vehicleBrandAddService = async (data, callback) => {
    var response = {}
    try {
      var vehicledata = {
        BrandName: data.BrandName,
        CountryId: data.CountryId
      }
      var vehicleBrandIData = await vehicleRepository.vehicleBrandAdd(vehicledata)
      if (vehicleBrandIData.error === false) {
        response.error = false
        response.data = vehicleBrandIData.data[0]
        response.msg = 'VALID'
      } else if (vehicleBrandIData.errno === 1062) {
        response.error = true
        response.msg = 'EXIST: $[1],Brand Name'
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
  this.vehicleBrandViewService = async (callback) => {
    var response = {}
    try {
      // var data = []
      var vehicleBrandSData = await vehicleRepository.vehicleBrandView()
      if (vehicleBrandSData.error === false) {
        response.error = false
        response.data = vehicleBrandSData.data
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
  this.vehicleBrandPageViewService = async (data, callback) => {
    var response = {}
    try {
      var result = []
      var resdata = []
      var vehiclebrandcount = await vehicleRepository.vehicleBrandPageViewListcount()
      var vehicleBrandPSelectSData = await vehicleRepository.vehicleBrandPageView(data)
      if (vehicleBrandPSelectSData.error === false && vehiclebrandcount.error === false) {
        vehicleBrandPSelectSData.data.map(async (i, iindex) => {
          var d = []
          var countryid = i.CountryId.toString()
          var vehicleBrandCountryname = await vehicleRepository.getVehicleBrandCountrySelectView(countryid)
          vehicleBrandCountryname.data.map((j, jindex) => {
            d.push(j.CountryName)
          })
          resdata.push({
            Id: i.Id,
            BrandName: i.BrandName,
            CountryName: d
          })
          if (--vehicleBrandPSelectSData.data.length === 0) {
            result.push({
              data: resdata.sort(function (a, b) {
                return a.Id - b.Id
              }),
              Count: vehiclebrandcount.data[0].count
            })
            response.error = false
            response.data = result
            response.msg = 'VALID'
            callback(response)
          }
        })
      } else {
        response.error = true
        response.msg = 'FAILED'
        callback(response)
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.getVehicleBrandViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGBrandData = await vehicleRepository.getVehicleBrandView(data)
      if (adminGBrandData.error === false) {
        response.error = false
        response.data = adminGBrandData.data[0]
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
  this.vehicleBrandEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        BrandName: data.BrandName,
        CountryId: data.CountryId
      }
      result.where = { Id: data.Id }
      var vehicleBrandUData = await vehicleRepository.vehicleBrandEdit(result)
      if (vehicleBrandUData.error === false) {
        response.error = false
        response.data = vehicleBrandUData.data
        response.msg = 'VALID'
      } else if (vehicleBrandUData.errno === 1062) {
        response.error = true
        response.msg = 'EXIST: $[1],Brand Name'
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
  this.vehicleModelAddService = async (data, callback) => {
    var response = {}
    try {
      var vehicledata = {
        VehicleBrandId: data.VehicleBrandId,
        ModelName: data.ModelName,
        VehicleType: data.VehicleType,
        PowerBy: data.PowerBy
      }
      var vehicleModelIData = await vehicleRepository.vehicleModelAdd(vehicledata)
      if (vehicleModelIData.error === false) {
        response.error = false
        response.data = vehicleModelIData.data[0]
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
  this.vehicleModelPageViewService = async (data, callback) => {
    var response = {}
    try {
      var result = []
      var vehiclemodelcount = await vehicleRepository.vehicleModelPageViewListcount()
      var vehicleModelPSelectSData = await vehicleRepository.vehicleModelPageView(data)
      if (vehicleModelPSelectSData.error === false && vehiclemodelcount.error === false) {
        result.push({
          data: vehicleModelPSelectSData.data.sort(function (a, b) {
            return a.Id - b.Id
          }),
          Count: vehiclemodelcount.data[0].count
        })
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
  this.vehicleModelViewService = async (callback) => {
    var response = {}
    try {
      var vehicleModelSData = await vehicleRepository.vehicleModelView()
      if (vehicleModelSData.error === false) {
        response.error = false
        response.data = vehicleModelSData.data
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
  this.getVehicleModelViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGModelData = await vehicleRepository.getVehicleModelView(data)
      if (adminGModelData.error === false) {
        response.error = false
        response.data = adminGModelData.data[0]
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
  this.vehicleModelEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        VehicleBrandId: data.VehicleBrandId,
        ModelName: data.ModelName,
        VehicleType: data.VehicleType,
        PowerBy: data.PowerBy
      }
      result.where = { Id: data.Id }
      var vehicleModelUData = await vehicleRepository.vehicleModelEdit(result)
      if (vehicleModelUData.error === false) {
        response.error = false
        response.data = vehicleModelUData.data
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
