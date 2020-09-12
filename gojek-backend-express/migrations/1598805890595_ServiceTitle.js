module.exports = {
  'up': `CREATE TABLE ServiceTitle (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  Title varchar(50) DEFAULT NULL,
  Color varchar(11) DEFAULT NULL,
  Status tinyint(1) DEFAULT '1',
  CreateAt timestamp  DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ServiceTitle'
}
