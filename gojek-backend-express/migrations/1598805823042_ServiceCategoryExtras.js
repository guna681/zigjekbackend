module.exports = {
    'up': `CREATE TABLE ServiceCategoryExtras (
  Id int(11) NOT NULL AUTO_INCREMENT,
  CategoryId int(11) DEFAULT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  Icon varchar(255) NOT NULL,
  Text varchar(255) NOT NULL,
  Status int(11) DEFAULT '1',
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1`,
    'down': 'DROP TABLE ServiceCategoryExtras'
}