module.exports = {
  'up': `CREATE TABLE Users (
  Id bigint(20) NOT NULL AUTO_INCREMENT,
  FirstName varchar(255) NOT NULL,
  LastName varchar(255) NOT NULL,
  Image longtext,
  Email varchar(255) NOT NULL,
  Mobile varchar(15) NOT NULL DEFAULT '',
  Password varchar(255) DEFAULT NULL,
  ExtCode varchar(5) DEFAULT NULL,
  CountryId varchar(5) NOT NULL DEFAULT '',
  LoginType varchar(255) NOT NULL,
  IsMobileVerified tinyint(1) DEFAULT NULL,
  IsEmailVerified tinyint(1) DEFAULT NULL,
  Status varchar(10) DEFAULT NULL,
  WalletId bigint(20) DEFAULT NULL,
  Rating decimal(2,1) DEFAULT '0.0',
  StripeCustomerID varchar(255) DEFAULT NULL,
  SocialToken varchar(255) DEFAULT NULL,
  Language varchar(255) DEFAULT NULL,
  latitude float(10,6) DEFAULT NULL,
  longitude float(10,6) DEFAULT NULL,
  CurrentAddressId int(11) DEFAULT NULL,
  CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  deviceToken varchar(500) DEFAULT NULL,
  os varchar(45) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY Email (Email),
  UNIQUE KEY WalletId (WalletId)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE Users'
}