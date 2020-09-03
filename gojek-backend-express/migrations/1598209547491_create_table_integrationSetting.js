module.exports = {
      'up': `CREATE TABLE IntegrationSetting (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    key varchar(255) NOT NULL,
    value varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    image varchar(255) DEFAULT NULL,
    status TINYINT(4) DEFAULT '0',
    paymentType VARCHAR(45) DEFAULT NULL,
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    "down": `DROP TABLE IntegrationSetting`
}