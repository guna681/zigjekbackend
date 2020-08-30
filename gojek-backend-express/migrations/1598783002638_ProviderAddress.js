module.exports = {
    'up': `CREATE TABLE ProviderAddress (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  ProviderId int(11) NOT NULL,
  Address1 varchar(255) DEFAULT NULL,
  Address2 varchar(255) DEFAULT NULL,
  City varchar(50) DEFAULT NULL,
  Province varchar(255) DEFAULT NULL,
  Landmark varchar(255) NOT NULL DEFAULT '',
  Latitude decimal(10,6) DEFAULT NULL,
  Longitude decimal(10,6) DEFAULT NULL,
  ZipCode int(11) DEFAULT NULL,
  Status tinyint(1) DEFAULT NULL,
  CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE ProviderAddress'
}