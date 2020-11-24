module.exports=function(){
    const SortRepository=require('../../repository/Admin/SortRepository')
    const Common =require('../../Utils/common')
    require('dotenv').config({path: './../.env'})

    var sortRepository=new SortRepository();
    var common=new Common();

    this.commonSortViewService=async (datas,callback) =>{
        var response = {}
        var typename = datas.typename
        if(datas.sort=='AtoZ')
                {
                  datas.column='FirstName'
                  datas.sort='asc'
                }
                else if(datas.sort=='ZtoA'){
                    datas.column='FirstName'
                    datas.sort='desc'
                }
                else if(datas.sort=='latest')
                {
                    datas.column='Id'
                    datas.sort='desc'
                }
                else
                {
                    datas.column='Id'
                    datas.sort='asc'
                }
        switch(typename){
            case 'users':
               var udata={table_name:'Users',sort:datas.sort,column:datas.column,limit:datas.limit,page:datas.page}
               var resresult=[]
               try{
                   var usersSDCount=await sortRepository.commonSortDataListCount(udata)
                   var usersSDListSData=await sortRepository.commonSortDataList(udata)
                   if(usersSDListSData.error === false && usersSDCount.error ===false){
                       usersSDListSData.data.forEach((j,index)=>{
                           var resultdata=common.secureChangerList(j.Email,j.Mobile)
                           j.Mobile = resultdata['mobile']
                           j.Email  = resultdata['email']
                           resresult.push({ Id: j.Id, FirstName: j.FirstName, LastName: j.LastName, Image: j.Image, Mobile: j.Mobile, Email: j.Email, ExtCode: j.ExtCode })
                       })
                       var result=[]
                       result.push({data:resresult},{Count:usersSDCount.data.length})
                       response.error =false
                       response.data=result
                       response.msg='VALID'
                   }
                   else{
                       response.error=true
                       response.msg='FAILED'
                   }
                   callback(response)
               } catch (err){
                   err.error=true
                   err.msg ='OOPS'
                   callback(err)
               }
               break 
               case 'providers':
                 var udata ={table_name:'Provider',sort:datas.sort,column:datas.column,limit:datas.limit,page:datas.page,type:datas.type,IsDeliveryOpt:datas.IsDeliveryOpt} 
                 var resresult=[]
                 try{
					 
                     var usersSDCount=await sortRepository.commonSortDataListCount(udata)
                     var usersSDListSData=await sortRepository.commonSortDataList(udata)
                     if(usersSDListSData.error === false && usersSDCount.error ===false){
                         usersSDListSData.data.forEach((j,index)=>{
                             var resultdata=common.secureChangerList(j.Email,j.Mobile)
                             j.Mobile = resultdata['mobile']
                             j.Email  = resultdata['email']
                             resresult.push({ Id: j.Id, FirstName: j.FirstName, LastName: j.LastName, Image: j.Image, Mobile: j.Mobile, Email: j.Email, ExtCode: j.ExtCode })
                         })
                         var result=[]
                         result.push({data:resresult},{Count:usersSDCount.data.length})
                         response.error =false
                         response.data=result
                         response.msg='VALID'
                     }
                     else{
                         response.error=true
                         response.msg='FAILED'
                     }
                     callback(response)
                 } catch (err){
                     err.error=true
                     err.msg ='OOPS'
                     callback(err)
                 }
                 break 
                 default:
                     response.error=true
                     response.msg='FAILED'
                     callback(response)
                     break
        }
    }
}