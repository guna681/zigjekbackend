module.exports=function(){
    require('dotenv').config({ path: './../.env' })
  const config = {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    pool: {
      min: Number(process.env.DB_POOL_MIN),
      max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
  }
  var Knex = require('knex')
    
    // commonsort List Count 
    this.commonSortDataListCount=(data)=>{
        var output = {}
    var tablename = data.table_name
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(tablename).count(`Id as count`)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
    }
    // common sort data list select
    this.commonSortDataList=(data)=>{
        var output = {}
    var tablename = data.table_name
    var search = data.search
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var query = knex(tablename).select(knex.raw(`${tablename}.*,CONCAT(FirstName,LastName) as fullname`))
        .orderBy(data.column,data.sort)
      if (data.type == 'taxi') {
        if (data.IsDeliveryOpt == 0) {
          query.where('Type', data.type)
          query.where('IsDeliveryOpt', data.IsDeliveryOpt)
        } else {
          query.where('Type', data.type)
        }
      } else if (data.type == 'services') {
        query.where('Type', data.type)
      }
      query.then((result) => {
        if (result.length) {
          output.error = false
          output.data = result
        } else {
          output.error = true
        }
        resolve(output)
      })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
    }
}