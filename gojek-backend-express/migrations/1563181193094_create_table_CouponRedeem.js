module.exports = {
  'up': `CREATE TABLE CouponRedeemed (
        Id bigint(20) NOT NULL AUTO_INCREMENT,
        UserId INT NOT NULL,
        Amount varchar(255) DEFAULT NULL,
        DiscountAmount varchar(255) DEFAULT NULL,        
        Status varchar(255) DEFAULT 'pending',
        BookingId INT NOT NULL,
        CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(Id)
        ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;`,
  'down': `DROP TABLE CouponRedeemed`
}
