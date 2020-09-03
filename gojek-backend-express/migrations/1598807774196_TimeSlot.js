module.exports = {
    'up': `CREATE TABLE TimeSlot (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  Day varchar(3) DEFAULT NULL,
  Time json DEFAULT NULL,
  CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE TimeSlot'
}