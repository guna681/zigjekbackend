module.exports = {
  'up': `CREATE TABLE ProviderPayment (
  Id bigint(20) NOT NULL AUTO_INCREMENT,
  PaymentField varchar(50) DEFAULT NULL,
  Value varchar(255) DEFAULT NULL,
  ProviderId bigint(20) DEFAULT NULL,
  CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=651 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ProviderPayment'
}
