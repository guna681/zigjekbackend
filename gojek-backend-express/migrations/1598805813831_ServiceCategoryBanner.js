module.exports = {
  'up': `CREATE TABLE ServiceCategoryBanner (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  CategoryId int(11) DEFAULT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  Text varchar(50) DEFAULT NULL,
  Type varchar(50) DEFAULT NULL,
  Path varchar(255) DEFAULT NULL,
  URL varchar(255) DEFAULT NULL,
  Status int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ServiceCategoryBanner'
}
