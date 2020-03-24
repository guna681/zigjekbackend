module.exports = function () {
  const PeekChargesRepository = require('../../repository/Admin/peekChargesRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var peekChargesRepository = new PeekChargesRepository();
  var common = new Common();

  this.peekChargesAddService = async (data, callback) => {
    var response = {}
    try {
      var peekchargesdata = {
        Type: data.type,
        Name: data.name,
        Day: data.daydata,
        Week: data.weekdata,
        StartTime: data.starttime,
        EndTime: data.endtime,
        Fare: data.fare,
        MinAmount: data.minamount,
        MaxAmount: data.maxamount
      }
      var peekchargesIData = await peekChargesRepository.peekChargesAdd(peekchargesdata)
      if (peekchargesIData.error === false) {
        response.error = false
        response.data = peekchargesIData.data[0]
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
  this.peekChargesPageViewService = async (data, callback) => {
    var response = {}
    try {
      var peekchargescount = await peekChargesRepository.peekChargesPageViewCount()
      var peekchargesData = await peekChargesRepository.peekChargesPageView(data)
      var result = []
      if (peekchargesData.error === false && peekchargescount.error === false) {
        result.push({
          data: peekchargesData.data,
          Count: peekchargescount.data[0].count
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
  this.getPeekChargesEditListViewService = async (data, callback) => {
    var response = {}
    try {
      var peekchargeseditListData = await peekChargesRepository.getPeekChargesEditListView(data)
      if (peekchargeseditListData.error === false) {
        response.error = false
        response.data = peekchargeseditListData.data[0]
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
  this.peekChargesEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Type: data.type,
        Name: data.name,
        Day: data.daydata,
        Week: data.weekdata,
        StartTime: data.starttime,
        EndTime: data.endtime,
        Fare: data.fare,
        MinAmount: data.minamount,
        MaxAmount: data.maxamount
      }
      result.where = { Id: data.Id }
      var peekchargesUData = await peekChargesRepository.peekChargesEdit(result)
      if (peekchargesUData.error === false) {
        response.error = false
        response.data = peekchargesUData.data
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
