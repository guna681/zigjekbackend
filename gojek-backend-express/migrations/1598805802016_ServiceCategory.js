module.exports = {
    'up': `CREATE TABLE ServiceCategory (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  TitleId int(50) DEFAULT NULL,
  Name varchar(50) DEFAULT NULL,
  Type varchar(10) DEFAULT NULL,
  Icon varchar(255) DEFAULT NULL,
  Status tinyint(1) DEFAULT '1',
  HasSubCategory tinyint(1) DEFAULT '0',
  IsFixedPricing tinyint(1) DEFAULT '0',
  PricePerHour decimal(10,2) DEFAULT NULL,
  DisplayType varchar(45) DEFAULT NULL,
  DisplayDescription varchar(100) DEFAULT NULL,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE ServiceCategory'
}