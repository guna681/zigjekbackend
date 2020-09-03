module.exports = {
    'up': `CREATE TABLE ServiceGroup (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  CategoryId int(11) DEFAULT NULL,
  SubCategoryId int(11) DEFAULT NULL,
  Name varchar(50) NOT NULL DEFAULT '',
  Image varchar(255) DEFAULT NULL,
  Status tinyint(11) NOT NULL DEFAULT '1',
  CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
    'down': 'DROP TABLE ServiceGroup'
}