module.exports = function () {
  require('dotenv').config()
  const TransactionRepository = require('../repository/TransactionRepository')
  const Common = require('../Utils/common')

  var transactionRepository = new TransactionRepository()
  var common = new Common()

  this.createTransaction = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var transact = {}
        transact.UserType = data.userType
        transact.UserTypeId = data.userId
        transact.Description = data.description
        transact.Type = data.type
        transact.Amount = data.amount
        transact.Status = data.status ? 'pending' : data.status
        transact.WithdrawalId = data.withdrawalId ? data.withdrawalId : null
        var transaction = await transactionRepository.insertTransaction(transact)
        if (transaction.error) {
          response.msg = 'CREATE_TRANSACTION_ERROR'
          response.error = true
        } else {
          response.msg = 'VALID'
          response.data = transaction.result
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.msg = 'OOPS'
        err.error = true
        resolve(err)
      }
    })
  }

  this.editTransaction = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var transact = {}
        transact.Id = data.transactId
        transact.Status = data.status
        var transaction = await transactionRepository.updateTransaction(transact)
        if (transaction.error) {
          response.msg = 'EDIT_TRANSACTION_ERROR'
          response.error = true
        } else {
          response.msg = 'VALID'
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.msg = 'OOPS'
        err.error = true
        resolve(err)
      }
    })
  }

  this.getTransactionList = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var transact = {}
        transact.UserType = data.userType
        transact.UserTypeId = data.userId
        var transaction = await transactionRepository.fetchTransaction(transact)
        if (transaction.error) {
          response.msg = 'NO_TRANSACTION'
          response.error = true
        } else {
          var trnx = transaction.result.map(element => {
            var data = {}
            data['description'] = element.Description
            data['amount'] = '$ ' + element.Amount
            data['type'] = element.Type
            data['createdAt'] = element.CreateAt
            data['date'] = common.dateFormatter(element.CreateAt)
            data['status'] = element.Status === 'pending' ? 'failed' : element.Status
            return data
          })
          response.msg = 'VALID'
          response.data = trnx
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.msg = 'OOPS'
        err.error = true
        resolve(err)
      }
    })
  }
}
