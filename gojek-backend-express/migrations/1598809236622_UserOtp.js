module.exports = {
    'up': `CREATE TABLE UserOtp (
  Id int(11) NOT NULL AUTO_INCREMENT,
  Mobile varchar(15) DEFAULT NULL,
  Ext varchar(5) DEFAULT NULL,
  OTP int(4) DEFAULT NULL,
  Type varchar(50) DEFAULT NULL,
  Status varchar(10) DEFAULT 'pending',
  CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=345 DEFAULT CHARSET=utf8mb4`,
    'down': 'DROP TABLE UserOtp'
}