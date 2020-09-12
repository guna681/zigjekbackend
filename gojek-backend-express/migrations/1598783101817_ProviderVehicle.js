module.exports = {
  'up': `CREATE TABLE ProviderVehicle (
  Id int(11) NOT NULL AUTO_INCREMENT,
  ProviderId bigint(20) DEFAULT NULL,
  VehicleImage varchar(255) DEFAULT NULL,
  VehicleBrandName varchar(255) DEFAULT NULL,
  VehicleModelName varchar(255) DEFAULT NULL,
  RideVehicleTypeId json DEFAULT NULL,
  VehicleNumber varchar(50) DEFAULT NULL,
  Year year(4) DEFAULT NULL,
  Color varchar(50) DEFAULT NULL,
  Status varchar(10) DEFAULT NULL,
  IsActive varchar(45) DEFAULT NULL,
  CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ProviderVehicle'
}
