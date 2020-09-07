module.exports = {
  'up': `CREATE TABLE EmailSetting (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    templateName varchar(800) NOT NULL,
    template LONGTEXT NOT NULL,
    key varchar(255) DEFAULT NULL,
    status TINYINT(11) DEFAULT '0',
    default TINYINT(11) DEFAULT '0',
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE EmailSetting`
}
