module.exports = {
  'up': `CREATE TABLE Review (
  Id bigint(20) NOT NULL AUTO_INCREMENT,
  UserId bigint(20) NOT NULL,
  ProviderId bigint(20) NOT NULL,
  BookingId int(11) DEFAULT NULL,
  Rating tinyint(1) NOT NULL,
  Comments longtext NOT NULL,
  ReviewedBy varchar(45) DEFAULT NULL,
  CreateAt timestamp DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE Review'
}
