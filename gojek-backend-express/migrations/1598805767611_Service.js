module.exports = {
    'up': `CREATE TABLE Service (
  Id int(11) NOT NULL AUTO_INCREMENT,
  CategoryId int(11) DEFAULT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  SubTitle varchar(50) DEFAULT NULL,
  Name varchar(255) NOT NULL,
  Image varchar(255) DEFAULT NULL,
  Price decimal(10,2) NOT NULL,
  IsFixedPrice tinyint(1) NOT NULL,
  PricePerHour decimal(10,2) NOT NULL,
  Status tinyint(1) NOT NULL,
  Limit int(11) DEFAULT '2',
  SlashPrice decimal(10,2) DEFAULT NULL,
  CurrencyType varchar(255) DEFAULT '$',
  Commission decimal(4,2) DEFAULT '0.00',
  Description json DEFAULT NULL,
  Duration varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1`,
    'down': 'DROP TABLE Service'
}