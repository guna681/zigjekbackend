module.exports = {
    'up': `CREATE TABLE ProviderLocationUpdate (
  ProviderId int(11) unsigned NOT NULL AUTO_INCREMENT,
  S2CellId varchar(20) DEFAULT NULL,
  Latitude decimal(10,6) DEFAULT NULL,
  Longitude decimal(10,6) DEFAULT NULL,
  Bearing int(11) DEFAULT NULL,
  RideTypeId json DEFAULT NULL,
  IsDeliveryOpt tinyint(1) DEFAULT '0',
  IsPoolActive varchar(3) DEFAULT 'no',
  IsPoolEnabled varchar(3) DEFAULT 'no',
  MaxPoolCapacity int(11) DEFAULT '4',
  Status varchar(11) DEFAULT 'active',
  CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ProviderId)
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4`,
    'down': 'DROP TABLE ProviderLocationUpdate'
}