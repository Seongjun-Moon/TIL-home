## MySQL

```
CREATE SCHEMA `sns` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `sns`.`user` (
  `email` VARCHAR(50) NOT NULL,
  `nick` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `nick_UNIQUE` (`nick` ASC))
ENGINE = InnoDB

CREATE TABLE `sns`.`post` (
  `post_no` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `content` VARCHAR(140) NULL,
  `img` VARCHAR(45) NULL,
PRIMARY KEY (`post_no`));

ALTER TABLE `sns`.`post` 
ADD INDEX `1_idx` (`email` ASC);
;
ALTER TABLE `sns`.`post` 
ADD CONSTRAINT `1`
  FOREIGN KEY (`email`)
  REFERENCES `sns`.`user` (`email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

CREATE TABLE `sns`.`hashtag` (
  `hashtag_no` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`hashtag_no`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC));

CREATE TABLE `sns`.`follow` (
  `follower_id` VARCHAR(45) NOT NULL,
  `following_id` VARCHAR(45) NOT NULL);

ALTER TABLE `sns`.`follow` 
ADD INDEX `f3_idx` (`follower_id` ASC),
ADD INDEX `f4_idx` (`following_id` ASC);
;
ALTER TABLE `sns`.`follow` 
ADD CONSTRAINT `f3`
  FOREIGN KEY (`follower_id`)
  REFERENCES `sns`.`user` (`email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `f4`
  FOREIGN KEY (`following_id`)
  REFERENCES `sns`.`user` (`email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

CREATE TABLE `sns`.`posthashtag` (
  `post_no` INT NOT NULL,
  `hashtag_no` INT NOT NULL);

ALTER TABLE `sns`.`posthashtag` 
ADD INDEX `f5_idx` (`post_no` ASC),
ADD INDEX `f6_idx` (`hashtag_no` ASC);
;
ALTER TABLE `sns`.`posthashtag` 
ADD CONSTRAINT `f5`
  FOREIGN KEY (`post_no`)
  REFERENCES `sns`.`post` (`post_no`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `f6`
  FOREIGN KEY (`hashtag_no`)
  REFERENCES `sns`.`hashtag` (`hashtag_no`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

```

