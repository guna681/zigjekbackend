module.exports = {
    'up': `CREATE TABLE ServiceAddOns (
  Id int(11) NOT NULL AUTO_INCREMENT,
  CategroyId int(11) DEFAULT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  GroupId int(11) DEFAULT NULL,
  TitleId int(11) DEFAULT NULL,
  Name varchar(255) NOT NULL,
  Price decimal(10,2) DEFAULT NULL,
  CurrencyType varchar(11) DEFAULT NULL,
  IsFixedPrice tinyint(1) DEFAULT NULL,
  PricePerHour decimal(10,2) DEFAULT NULL,
  Status tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (Id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1`,
    'down': 'DROP TABLE ServiceAddOns'
}