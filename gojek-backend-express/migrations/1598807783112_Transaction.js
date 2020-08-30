module.exports = {
    'up': `CREATE TABLE Transaction (
  Id bigint(20) NOT NULL AUTO_INCREMENT,
  UserType varchar(50) DEFAULT NULL,
  Description varchar(255) DEFAULT NULL,
  UserTypeId int(11) DEFAULT NULL,
  Amount decimal(10,2) DEFAULT NULL,
  Type varchar(50) DEFAULT NULL,
  Status varchar(50) DEFAULT 'pending',
  WithdrawalId int(11) DEFAULT NULL,
  CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE Transaction'
}