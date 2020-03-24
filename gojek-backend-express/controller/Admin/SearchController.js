module.exports = function () {
  const SearchService = require('../../services/Admin/SearchService')
  const Common = require('../../Utils/common')
  require('dotenv').config()

  var searchService = new SearchService();
  var common = new Common();

  this.commonSearchViewCtrl = (req, callback) => {
    var response = {}
    searchService.commonSearchViewService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
  this.usersListViewCtrl = (req, callback) => {
    var response = {}
    this.usersListViewService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
}
