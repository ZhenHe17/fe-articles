CREATE TABLE IF NOT EXISTS `all_articles`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL,
   `href` VARCHAR(100) NOT NULL,
   `tag` VARCHAR(100),
   `origin` VARCHAR(20),
   `category` VARCHAR(20),
   `type` VARCHAR(20),
   `create_date` TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
