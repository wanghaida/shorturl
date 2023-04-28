/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.28.28
 Source Server Type    : MySQL
 Source Server Version : 101002 (10.10.2-MariaDB-1:10.10.2+maria~ubu2204)
 Source Host           : 192.168.28.28:3306
 Source Schema         : shorturl

 Target Server Type    : MySQL
 Target Server Version : 101002 (10.10.2-MariaDB-1:10.10.2+maria~ubu2204)
 File Encoding         : 65001

 Date: 28/04/2023 14:40:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for urls
-- ----------------------------
DROP TABLE IF EXISTS `urls`;
CREATE TABLE `urls` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `hash` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
