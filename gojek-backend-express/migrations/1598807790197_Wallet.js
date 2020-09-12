module.exports = {
  'up': `CREATE TABLE Wallet (
  Id bigint(20) NOT NULL AUTO_INCREMENT,
  UserTypeId bigint(11) DEFAULT NULL,
  UserType varchar(50) DEFAULT NULL,
  CurrencyId bigint(20) DEFAULT NULL,
  Secret varchar(255) DEFAULT NULL,
  Balance decimal(10,2) NOT NULL DEFAULT '0.00',
  CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE Wallet'
}
