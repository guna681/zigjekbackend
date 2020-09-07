module.exports = {
  'up': `CREATE TABLE ServiceAddOnsTitle (
  Id int(11) NOT NULL AUTO_INCREMENT,
  CategoryId int(11) DEFAULT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  GroupId int(11) DEFAULT NULL,
  Name varchar(255) NOT NULL,
  Type varchar(11) DEFAULT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1`,
  'down': 'DROP TABLE ServiceAddOnsTitle'
}
