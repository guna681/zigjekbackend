module.exports = {
    'up': `CREATE TABLE OrderTab (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  Type varchar(50) DEFAULT NULL,
  Name varchar(50) DEFAULT NULL,
  Path varchar(50) DEFAULT NULL,
  Key varchar(50) DEFAULT NULL,
  UserType varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE OrderTab'
}