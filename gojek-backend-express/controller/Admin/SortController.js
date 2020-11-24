module.exports = function () {
    const SortService = require('../../services/Admin/SortService')
    const Common = require('../../Utils/common')
    require('dotenv').config({path:'./../.env'})

    var sortService = new SortService();
    var common = new Common();

    this.commonSortViewCtrl=(req,callback) => {
        var response = {}
        sortService.commonSortViewService(req,(result)=>{
            if(result.error){
                response.error = true
                response.msg = result.msg
            } else {
                response.error =false
                response.msg = result.msg
                response.data = result.data
            }
            callback(response)
        })
    }
}