module.exports = {
  'up': `CREATE TABLE WithDrawal (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT,
  ProviderId int(11) DEFAULT NULL,
  Amount decimal(10,2) DEFAULT NULL,
  Status varchar(50) DEFAULT NULL,
  TansactionId varchar(255) CHARACTER SET utf8mb4  DEFAULT NULL,
  CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  'down': `DROP TABLE WithDrawal`
}
