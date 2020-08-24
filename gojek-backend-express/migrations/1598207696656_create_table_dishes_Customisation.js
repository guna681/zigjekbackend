module.exports = {
      'up': `CREATE TABLE Dishes_Customisation (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    price DOUBLE(10,2) NOT NULL,
    description varchar(255) DEFAULT 'no description',
    isVeg INT(11) NOT NULL,
    dishId INT(10) NOT NULL,
    customisationCategoryId INT(10) NOT NULL,
    selected TINYINT(11) NOT NULL,
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    "down": `DROP TABLE Dishes_Customisation`
}