module.exports = {
  'up': `CREATE TABLE ProviderLocationUpdate (
    ProviderId int(11) unsigned NOT NULL AUTO_INCREMENT,
    S2CellId varchar(20) DEFAULT NULL,
    Latitude decimal(10,6) DEFAULT NULL,
    Longitude decimal(10,6) DEFAULT NULL,
    Bearing int(11) DEFAULT NULL,
    RideTypeId json DEFAULT NULL,
    Status varchar(11) CHARACTER SET utf8mb4  DEFAULT 'active',
    IsPoolActive varchar(3) CHARACTER SET utf8mb4  DEFAULT 'no',
    IsPoolEnabled varchar(3) CHARACTER SET utf8mb4  DEFAULT 'no',
    MaxPoolCapacity int(11) DEFAULT '4',
    CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (ProviderId)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  'down': `DROP TABLE ProviderLocationUpdate`
}
