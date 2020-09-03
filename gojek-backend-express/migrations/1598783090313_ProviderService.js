module.exports = {
    'up': `CREATE TABLE ProviderService (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  ProviderId int(11) DEFAULT NULL,
  CategoryId int(11) NOT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  Experience int(11) DEFAULT NULL,
  PricePerHour int(11) DEFAULT '0',
  QuickPitch varchar(255) DEFAULT '',
  CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE ProviderService'
}