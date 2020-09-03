module.exports = {
      'up': `CREATE TABLE Dishes (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    outletId INT(10) NOT NULL,
    name varchar(255) NOT NULL,
    image varchar(255) DEFAULT NULL,
    tag varchar(255) DEFAULT '2',
    price DOUBLE(10,2) NOT NULL,
    slashedPrice DOUBLE(10,3) NOT NULL,
    quantity INT(11) NOT NULL,
    description varchar(255) DEFAULT 'no description',
    isRecommended TINYINT(4) DEFAULT '0',
    categoryId INT(10) NOT NULL,
    isVeg INT(11) NOT NULL,
    showFromTime TIME NOT NULL,
    showToTime TIME NOT NULL,
    status TINYINT(11) DEFAULT '0',
    deleted_at timestamp DEFAULT NULL,
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    isCustomisation TINYINT(11) NOT '0',
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    "down": `DROP TABLE Dishes`
}