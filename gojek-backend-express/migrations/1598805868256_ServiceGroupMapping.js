module.exports = {
  'up': `CREATE TABLE ServiceGroupMapping (
  Id int(11) NOT NULL AUTO_INCREMENT,
  GroupId int(11) DEFAULT NULL,
  ServiceId int(11) DEFAULT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1`,
  'down': 'DROP TABLE ServiceGroupMapping'
}
