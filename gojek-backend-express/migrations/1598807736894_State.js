module.exports = {
  'up': `CREATE TABLE State (
  Id int(11) NOT NULL AUTO_INCREMENT,
  CountryId int(11) DEFAULT NULL,
  ShortCode varchar(45) DEFAULT NULL,
  StateName varchar(45) DEFAULT NULL,
  IsActive varchar(3) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY StateName (StateName)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE State'
}
