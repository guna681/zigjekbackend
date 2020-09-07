module.exports = {
  'up': `CREATE TABLE ProviderWithdrawal (
    id int(11) unsigned NOT NULL AUTO_INCREMENT,
    ProviderId bigint(20) NOT NULL,
    Amount decimal(10,2) NOT NULL,
    Status varchar(100) DEFAULT NULL,
    TransactionId varchar(255) CHARACTER SET utf8mb4  DEFAULT NULL,
    CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  'down': `DROP TABLE ProviderWithdrawal`
}
