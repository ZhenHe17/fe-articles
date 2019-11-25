CREATE TABLE IF NOT EXISTS `community_articles`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL,
   `href` VARCHAR(200) NOT NULL,
   `tag` VARCHAR(100) DEFAULT '',
   `origin` VARCHAR(20) DEFAULT '',
   `category` VARCHAR(20) DEFAULT '',
   `type` VARCHAR(20) DEFAULT '',
   `desc` VARCHAR(200) DEFAULT '',
   `create_date` TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `recommend_articles`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL,
   `href` VARCHAR(200) NOT NULL,
   `tag` VARCHAR(100) DEFAULT '',
   `desc` VARCHAR(200) DEFAULT '',
   `origin` VARCHAR(20) DEFAULT '',
   `review_status` TINYINT DEFAULT 0,
   `referrer` VARCHAR(20) DEFAULT '',
   `edition` INT DEFAULT 0,
   `rank` INT DEFAULT 0,
   `create_date` TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
