// var sequelizeAuto=require('sequelize-auto')
// var auto=new sequelizeAuto('zigjek','root','',{
//    host:'localhost',
//    dialect:'mysql',
//    port:'3306'
    
// });

// auto.run(function(err){
//    if(err) throw err;

//    console.log(auto.tables);
//    console.log(auto.foreignKeys);
// });
var sequelize=require('sequelize');
const path=require('path');
const con=new sequelize("mysql://root:@localhost:3306/zigjek-migration-nodejs",{
    define:{
        timestamps:false
    }
});

var address=require(path.join(__dirname,"/models/address.js"))(sequelize,sequelize.DataTypes);

con.sync({force:false}).then(()=>{

   address.findAll().then(address=>{
      console.log("address ",address);
   });
   console.log("sync is completed");
});