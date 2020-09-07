module.exports = {
  'up': `CREATE TABLE ProviderDocuments (
  id int(11) NOT NULL AUTO_INCREMENT,
  DocTypeId int(11) NOT NULL,
  ProviderId bigint(20) NOT NULL,
  Value varchar(255) DEFAULT '',
  Status varchar(10) NOT NULL,
  file varchar(255) NOT NULL,
  CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ProviderDocuments'
}
