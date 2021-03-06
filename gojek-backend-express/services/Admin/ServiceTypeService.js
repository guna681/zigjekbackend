module.exports = function () {
  const ServiceTypeRepository = require('../../repository/Admin/ServiceTypeRepository')
  require('dotenv').config({ path: './../.env' })

  var serviceTypeRepository = new ServiceTypeRepository()

  this.rideTypeAddService = async (data, callback) => {
    var response = {}
    try {
      var ridedata = {
        Name: data.Name,
        Description: data.Description,
        CountryId: data.CountryId
      }
      var rideTypeIData = await serviceTypeRepository.rideTypeAdd(ridedata)
      if (rideTypeIData.error === false) {
        response.error = false
        response.data = rideTypeIData.data[0]
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
  this.rideTypeViewService = async (callback) => {
    var response = {}
    try {
      var data = []
      var rideTypeSData = await serviceTypeRepository.rideTypeView()
      if (rideTypeSData.error === false) {
        // rideTypeSData.data.forEach((i, iindex) => {
        //   var d = []
        //   rideTypeSData.data[iindex].CountryId.forEach((j, jindex) => {
        //     d.push(j.CountryName)
        //   })
        //   data.push({
        //     Id: i.Id,
        //     Name: i.Name,
        //     Description: i.Description,
        //     CountryName: d
        //   })
        // })

        response.error = false
        response.data = rideTypeSData.data
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
  this.rideTypeEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Name: data.Name,
        CountryId: data.CountryId,
        Description: data.Description
      }
      result.where = { Id: data.Id }
      var rideTypeUData = await serviceTypeRepository.rideTypeEdit(result)
      if (rideTypeUData.error === false) {
        response.error = false
        response.data = rideTypeUData.data
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
  this.rideTypeLanguageAddService = async (data, callback) => {
    var response = {}
    try {
      var ridedata = {
        LanguageId: data.LanguageId,
        Name: data.Name,
        RideTypeId: data.RideTypeId
      }
      var result = []
      if (ridedata.LanguageId.length === ridedata.Name.length) {
        ridedata.LanguageId.forEach((i, index) => {
          result.push({
            LanguageId: i,
            Name: ridedata.Name[index],
            RideTypeId: ridedata.RideTypeId
          })
        })
        var rideTypeLanguageIData = await serviceTypeRepository.rideTypeLanguageAdd(result)
        if (rideTypeLanguageIData.error === false) {
          response.error = false
          response.data = rideTypeLanguageIData.data[0]
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED'
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
  this.rideTypeLanguageViewService = async (callback) => {
    var response = {}
    try {
      var rideTypeLanguageSData = await serviceTypeRepository.rideTypeLanguageView()
      if (rideTypeLanguageSData.error === false) {
        response.error = false
        response.data = rideTypeLanguageSData.data[0]
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
  this.rideTypeLanguageEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Name: data.Name,
        LanguageId: data.LanguageId,
        RideTypeId: data.RideTypeId
      }
      result.where = { Id: data.Id }
      var rideTypeLanguageUData = await this.rideTypeLanguageEdit(result)
      if (rideTypeLanguageUData.error === false) {
        response.error = false
        response.data = rideTypeLanguageUData.data
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
  this.rideVehicleTypeAddService = async (data, callback) => {
    var response = {}
    try {
      var ridedata = {
        Name: data.Name,
        IconPassive: data.IconPassive,
        IconActive: data.IconActive,
        CountryId: data.CountryId,
        StateIds: data.StateIds,
        CityIds: data.CityIds,
        BaseCharge: data.BaseCharge,
        MinCharge: data.MinCharge,
        CurrencyType: data.CurrencyType,
        CommissionPercentage: data.CommissionPercentage,
        WaitingCharge: data.WaitingCharge,
        Capacity: data.Capacity,
        ShortDesc: data.ShortDesc,
        LongDesc: data.LongDesc,
        IsActive: data.IsActive,
        IsPoolEnabled: data.IsPoolEnabled
      }
      var rideVehicleTypeIData = await serviceTypeRepository.rideVehicleTypeAdd(ridedata)
      if (rideVehicleTypeIData.error === false) {
        response.error = false
        response.data = rideVehicleTypeIData.data[0]
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
  this.citySelectViewService = async (data, callback) => {
    var response = {}
    try {
      var CitySelectSData = await this.citySelectView(data)
      if (CitySelectSData.error === false) {
        response.error = false
        response.data = CitySelectSData.data[0]
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

  this.stateSelectViewService = async (data, callback) => {
    var response = {}
    try {
      var stateSelectSData = await this.stateSelectView(data)
      if (stateSelectSData.error === false) {
        response.error = false
        response.data = stateSelectSData.data[0]
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
  this.rideVehicleTypeViewService = async (req, callback) => {
    var response = {}
    try {
      var output = {}
      var ridevehiclecount = await serviceTypeRepository.rideVehicleViewCount()
      var rideVehicleTypeSData = await serviceTypeRepository.rideVehicleTypeView(req)
      if (rideVehicleTypeSData.error) {
        response.error = true
        response.msg = 'FAILED'
      } else {
        var data = rideVehicleTypeSData.data.map((element) => {
          var result = {}
          result.Id = element.Id
          result.CountryId = element.CountryId
          result.CountryName = element.CountryName
          result.RideTypeId = element.RideTypeId
          result.Name = element.Name
          result.IconPassive = element.IconPassive
          result.IconActive = element.IconActive
          result.BaseCharge = element.BaseCharge
          result.MinCharge = element.MinCharge
          result.CurrencyType = element.CurrencyType
          result.CommissionPercentage = element.CommissionPercentage
          result.WaitingCharge = element.WaitingCharge
          result.Capacity = element.Capacity
          result.ShortDesc = element.ShortDesc
          result.IsActive = element.IsActive
          result.LongDesc = element.LongDesc
          result.IsPoolEnabled = element.IsPoolEnabled
          result.StateName = []
          result.CityName = []
          return result
        })
        output.data = data
        output.Count = ridevehiclecount
        response.error = false
        response.data = output
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.rideVehicleTypeEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        RideTypeId: data.RideTypeId,
        Name: data.Name,
        IconPassive: data.IconPassive,
        IconActive: data.IconActive,
        CountryId: data.CountryId,
        StateIds: data.StateIds,
        CityIds: data.CityIds,
        BaseCharge: data.BaseCharge,
        MinCharge: data.MinCharge,
        CurrencyType: data.CurrencyType,
        CommissionPercentage: data.CommissionPercentage,
        WaitingCharge: data.WaitingCharge,
        Capacity: data.Capacity,
        ShortDesc: data.ShortDesc,
        LongDesc: data.LongDesc,
        IsActive: data.IsActive,
        IsPoolEnabled: data.IsPoolEnabled
      }
      result.where = { Id: data.Id }
      var rideVehicleTypeUData = await serviceTypeRepository.rideVehicleTypeEdit(result)
      if (rideVehicleTypeUData.error === false) {
        response.error = false
        response.data = rideVehicleTypeUData.data
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
  this.rideVehicleTypeStatusEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        IsActive: data.IsActive
      }
      result.where = { Id: data.Id }
      var rideVehicleTypeStatusUData = await serviceTypeRepository.rideVehicleTypeStatusEdit(result)
      if (rideVehicleTypeStatusUData.error === false) {
        response.error = false
        response.data = rideVehicleTypeStatusUData.data
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
  this.getRideVehicleTypePagesViewService = async (req, callback) => {
    var response = {}
    try {
      var rideVehicleTypeSData = await serviceTypeRepository.getrideVehicleTypeView(req)
      if (rideVehicleTypeSData.error === false) {
        response.error = false
        response.data = rideVehicleTypeSData.data[0]
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
  this.staticPagesAddService = async (data, callback) => {
    var response = {}
    try {
      var staticdata = {
        PageName: data.PageName,
        Url: data.Url,
        HtmlContent: data.HtmlContent,
        Type: data.Type
      }
      var staticPagesIData = await serviceTypeRepository.staticPagesAdd(staticdata)
      if (staticPagesIData.error === false) {
        response.error = false
        response.data = staticPagesIData.data[0]
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
  this.staticPagesListViewService = async (callback) => {
    var response = {}
    try {
      var staticPagesSData = await serviceTypeRepository.staticPagesListView()
      if (staticPagesSData.error === false) {
        response.error = false
        response.data = staticPagesSData.data
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
  this.staticPagesSelectService = async (data, callback) => {
    var response = {}
    try {
      var staticcount = await serviceTypeRepository.staticPagesSelectViewCount()
      var staticData = await serviceTypeRepository.staticPagesSelectView(data)
      var result = []

      if (staticData.error === false && staticcount.error === false) {
        result.push({
          data: staticData.data,
          Count: staticcount.data[0].count
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
  this.getStaticPagesViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCancelData = await serviceTypeRepository.getStaticPagesView(data)
      if (adminGCancelData.error === false) {
        response.error = false
        response.data = adminGCancelData.data[0]
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
  this.staticPagesEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        PageName: data.PageName,
        Url: data.Url,
        HtmlContent: data.HtmlContent
      }
      result.where = { Id: data.Id }
      var staticPagesUData = await serviceTypeRepository.staticPagesEdit(result)
      if (staticPagesUData.error === false) {
        response.error = false
        response.data = staticPagesUData.data
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
  this.cancellationPolicyAddService = async (data, callback) => {
    var response = {}
    try {
      var cdata = {
        Description: data.Description,
        UserType: data.UserType
      }
      var cancellationPolicyIData = await serviceTypeRepository.cancellationPolicyAdd(cdata)
      if (cancellationPolicyIData.error === false) {
        response.error = false
        response.data = cancellationPolicyIData.data[0]
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
  this.cancellationPolicyViewService = async (callback) => {
    var response = {}
    try {
      var cancellationPolicySData = await serviceTypeRepository.cancellationPolicyView()
      if (cancellationPolicySData.error === false) {
        response.error = false
        response.data = cancellationPolicySData.data
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
  this.cancellationPolicyPageViewService = async (data, callback) => {
    var response = {}
    try {
      var cancelcount = await serviceTypeRepository.cancellationPolicyPageViewCount()
      var cancelData = await serviceTypeRepository.cancellationPolicyPageView(data)
      var result = []
      if (cancelData.error === false && cancelcount.error === false) {
        result.push({
          data: cancelData.data,
          Count: cancelcount.data[0].count
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
  this.getCancellationPolicyViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCancelData = await serviceTypeRepository.getCancellationPolicyView(data)
      if (adminGCancelData.error === false) {
        response.error = false
        response.data = adminGCancelData.data[0]
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
  this.cancellationPolicyEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Description: data.Description,
        UserType: data.UserType
      }
      result.where = { Id: data.Id }
      var cancellationPolicyUData = await serviceTypeRepository.cancellationPolicyEdit(result)
      if (cancellationPolicyUData.error === false) {
        response.error = false
        response.data = cancellationPolicyUData.data
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
  this.rideManualBookingVehicleTypeViewService = async (callback) => {
    var response = {}
    try {
      var rideBookingVehicleTypeSData = await this.rideManualBookingVehicleTypeView()
      if (rideBookingVehicleTypeSData.error === false) {
        response.error = false
        response.data = rideBookingVehicleTypeSData.data
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
