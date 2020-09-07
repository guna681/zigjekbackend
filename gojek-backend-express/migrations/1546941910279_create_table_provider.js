module.exports = {
  'up': `CREATE TABLE Provider (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Image varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    Email varchar(255) NOT NULL,
    Mobile varchar(15) NOT NULL,
    Password varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    ExtCode varchar(5) NOT NULL,
    CountryId varchar(11) NOT NULL DEFAULT '',
    LoginType varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    IsMobileVerified tinyint(1) DEFAULT NULL,
    IsEmailVerified tinyint(1) DEFAULT NULL,
    Status varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    WalletId bigint(20) DEFAULT NULL,
    MobileBrand varchar(45) DEFAULT NULL,
    MobileModel varchar(45) DEFAULT NULL,
    DeviceId varchar(255) DEFAULT NULL,
    GCMId varchar(255) DEFAULT NULL,
    AccessToken varchar(255) DEFAULT NULL,
    AppVersion varchar(45) DEFAULT NULL,
    OS varchar(45) DEFAULT NULL,
    OSVersion varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    Latitude decimal(10,6) DEFAULT NULL,
    Longitude decimal(10,6) DEFAULT NULL,
    Bearing int(11) DEFAULT NULL,
    S2CellId varchar(20) DEFAULT NULL,
    Rating decimal(2,1) DEFAULT NULL,
    Earnings decimal(10,2) DEFAULT '0.00',
    VehicleBrand varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'unknown',
    VehicleModel varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'unknown',
    VehicleNumber varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'unknown',
    IsActive varchar(45) DEFAULT NULL,
    SocialToken varchar(255) DEFAULT NULL,
    StripeAccountID varchar(255) DEFAULT NULL,  
    Language varchar(255) DEFAULT NULL,                  
    CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    UNIQUE KEY Email (Email),
    UNIQUE KEY Mobile (Mobile)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE Provider`
}
