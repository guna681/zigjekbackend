module.exports = {
    'up': `CREATE TABLE ServiceImage (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  ServiceId int(11) DEFAULT NULL,
  Path varchar(255) DEFAULT NULL,
  URL varchar(255) DEFAULT NULL,
  Type varchar(255) DEFAULT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE ServiceImage'
}