module.exports = {
  'up': `CREATE TABLE Cart (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    userId INT(10) DEFAULT NULL,
    udId varchar(255) DEFAULT NULL,
    restaurantId INT(10) DEFAULT NULL,
    outletId INT(10) NOT NULL,
    dishId INT(10) NOT NULL,
    customisationId TEXT DEFAULT NULL,
    itemPrice DOUBLE(10,2) DEFAULT NULL,
    quantity INT(10) NOT NULL,
    uuId varchar(255) DEFAULT NULL,
    orderId varchar(255) DEFAULT '0',
    deliveryaddressId INT(11) DEFAULT NULL,
    couponName varchar(255) DEFAULT '',
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE Cart`
}
