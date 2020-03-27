module.exports = function () {
  const PeekChargesRepository = require('../repository/PeekChargesRepository')
  const Common = require('../Utils/common')

  var peekChargesRepository = new PeekChargesRepository()
  var common = new Common()
  require('dotenv').config({ path: './../.env' })
  this.peekChargesRedeemService = async (data, callback) => {
    var response = {}
    try {
      var amount = parseFloat(data.amount)
      var peekchargesData = await peekChargesRepository.getPeekChargesDate(data.date, data.time)
      if (peekchargesData.error === false) {
        var datefare
        peekchargesData.data.map((x) => {
          datefare = ((parseFloat(x.Fare) * amount / 100) + amount)
        })
        response.error = false
        response.data = datefare
        response.msg = 'VALID'
      } else {
        if (peekchargesData.error === true && peekchargesData.data.length === 0) {
          var peekchargesWeekData = await peekChargesRepository.getPeekChargesWeek(data.date, data.time)
          var weekfare
          peekchargesWeekData.data.map((x) => {
            weekfare = ((parseFloat(x.Fare) * amount / 100) + amount)
          })
          if (peekchargesWeekData.error === false) {
            response.error = false
            response.data = weekfare
            response.msg = 'VALID'
          } else {
            response.error = true
            response.msg = 'FAILED'
          }
        } else {
          response.error = true
          response.msg = 'FAILED'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
