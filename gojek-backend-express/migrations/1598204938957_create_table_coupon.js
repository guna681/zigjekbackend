module.exports = {
  'up': `CREATE TABLE Coupon (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    couponName varchar(255) NOT NULL,
    couponCode varchar(255) NOT NULL,
    discountPerscentage varchar(5) NOT NULL,
    maxDiscount DOUBLE(10,6) NOT NULL,
    dateStart DATE DEFAULT NULL,
    dateEnd DATE DEFAULT NULL,
    status INT(11) DEFAULT '0',
    couponImage varchar(255) NOT NULL,
    outletId INT(45) NOT NULL,
    couponStatus INT(11) NOT NULL,
    isDeleted INT(11) NOT NULL,
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE Coupon`
}
