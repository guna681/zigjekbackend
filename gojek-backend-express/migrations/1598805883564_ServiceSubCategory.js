module.exports = {
    'up': `CREATE TABLE ServiceSubCategory (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  CategoryId int(11) DEFAULT NULL,
  Name varchar(50) DEFAULT NULL,
  Image varchar(255) DEFAULT NULL,
  Status tinyint(11) NOT NULL DEFAULT '1',
  IsFixedPricing tinyint(1) DEFAULT '0',
  PricePerHour decimal(10,2) DEFAULT NULL,
  ServicesDisplayStyle tinyint(1) DEFAULT '1',
  CategorySlideTitle varchar(255) DEFAULT NULL,
  CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE ServiceSubCategory'
}