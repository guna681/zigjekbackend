module.exports=function(){
    const SortRepository=require('../../repository/Admin/SortRepository')
    const Common =require('../../Utlis/common')
    require('dotenv').config({path: './../.env'})

    var SortRepository=new SortRepository();
    var common=new Common();

    this.commonSortViewService=async (datas,callback) =>{
        var response = {}
        var typename = datas.typename
        if(datas.sort=='AtoZ')
                {
                  data.column='FirstName'
                  data.sort='asc'
                }
                else if(datas.sort=='ZtoA'){
                    data.column='FirstName'
                    data.sort='asc'
                }
                else if(datas.sort=='latest')
                {
                    data.column='Id'
                    data.sort='desc'
                }
                else
                {
                    data.column='Id'
                    data.sort='asc'
                }
        switch(typename){
            case 'users':
               var udata={table_name:'Users',sort:datas.sort,column:datas.column,limit:datas.limit,page:datas.page}
               var resresult=[]
               try{
                   var usersSDCount=await SortRepository.commonSortDataListCount(udata)
                   var usersSDListSData=await SortRepository.commonSortDataList(udata)
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
                 var udata ={table_name:'Provider',sort:datas.sort,column:datas.column,limit:datas.limit,page:datas.page,type:datas.type,IsDeliveryOpt} 
                 var resresult=[]
                 try{
                     var usersSDCount=await SortRepository.commonSortDataListCount(udata)
                     var usersSDListSData=await SortRepository.commonSortDataList(udata)
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