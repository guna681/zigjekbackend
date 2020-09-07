module.exports = {
  'up': `CREATE TABLE RideVehicleType (
  Id int(11) NOT NULL AUTO_INCREMENT,
  RideTypeId int(11) DEFAULT NULL,
  Name varchar(45) DEFAULT NULL,
  IconPassive longtext,
  IconActive longtext,
  CountryId int(11) DEFAULT NULL,
  StateIds json DEFAULT NULL,
  CityIds json DEFAULT NULL,
  BaseCharge decimal(10,2) DEFAULT NULL,
  MinCharge decimal(10,2) DEFAULT NULL COMMENT 'As per KM',
  CurrencyType varchar(255) DEFAULT NULL,
  CommissionPercentage int(11) DEFAULT NULL,
  WaitingCharge decimal(10,2) DEFAULT NULL,
  Capacity int(1) DEFAULT NULL,
  ShortDesc varchar(50) DEFAULT NULL,
  LongDesc varchar(255) DEFAULT NULL,
  IsActive varchar(255) DEFAULT NULL,
  IsPoolEnabled varchar(3) DEFAULT 'no',
  CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE RideVehicleType'
}
