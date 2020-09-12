module.exports = {
  'up': `CREATE TABLE ServiceCategoryTitle (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  CategoryId int(11) DEFAULT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  Title varchar(100) DEFAULT NULL,
  Status int(11) DEFAULT '1',
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ServiceCategoryTitle'
}
