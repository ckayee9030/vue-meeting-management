/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80000
Source Host           : localhost:3306
Source Database       : meeting

Target Server Type    : MYSQL
Target Server Version : 80000
File Encoding         : 65001

Date: 2021-05-05 13:21:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `aid` varchar(10) NOT NULL,
  `account` varchar(20) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `gender` varchar(4) DEFAULT NULL,
  `addTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES ('3h0jhus8', 'xiaohang', '123456', '13413826154', '女', '2021-05-01 20:28:54', '2021-05-02 11:22:30');
INSERT INTO `admins` VALUES ('7nqk9tng', 'zhangsan', '123456', '15521008986', '女', '2021-05-01 20:28:38', '2021-05-02 11:33:50');
INSERT INTO `admins` VALUES ('bho2ags9', 'mhr', '123456', '15521008984', '男', '2021-05-01 20:28:15', null);

-- ----------------------------
-- Table structure for reserve
-- ----------------------------
DROP TABLE IF EXISTS `reserve`;
CREATE TABLE `reserve` (
  `rid` varchar(10) NOT NULL,
  `num` int(11) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `time_quantum_id` varchar(11) NOT NULL COMMENT '会议室id',
  `begin_time` datetime DEFAULT NULL,
  `state` int(11) DEFAULT '0' COMMENT '申请状态，0待审核,1通过，-1不通过,2完成',
  `reason` varchar(255) DEFAULT NULL COMMENT '不通过的理由',
  `isPasseTime` datetime DEFAULT NULL,
  `uid` varchar(20) DEFAULT NULL,
  `submitTime` datetime DEFAULT NULL COMMENT '提交时间',
  `room_name` varchar(255) DEFAULT NULL,
  `admin_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of reserve
-- ----------------------------
INSERT INTO `reserve` VALUES ('0eifejvq', '150', '996', '2021-05-05 11:00:00', '996', '65-two', '2021-05-05 10:00:00', '0', null, null, 'n57ifolpbr', null, '996会议室', 'mhr');
INSERT INTO `reserve` VALUES ('1gf7ogf9', '343', '3443', '2021-05-05 11:00:00', '43434334', '2-two', '2021-05-05 10:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('1l0crtit', '343', '3443', '2021-05-05 11:00:00', '43434334', '2-two', '2021-05-05 10:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('1sonngu2', '343', '3443', '2021-05-05 11:00:00', '43434334', '2-two', '2021-05-05 10:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('2guj3t70', '343', '3443', '2021-05-06 12:00:00', '43434334', '3-three', '2021-05-06 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('2ldsb7gm', '343', '3443', '2021-05-05 11:00:00', '43434334', '2-two', '2021-05-05 10:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('5udlcq7r', '100', '企业宣讲会', '2021-05-07 11:00:00', '生活就像海洋，只有一直将强的人才能到达成功的彼岸！', '2-four', '2021-05-07 10:00:00', '-1', '不符合要求', '2021-05-04 19:07:36', 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('6mnkbb7b', '300', '员工年终奖会议', '2021-05-07 16:00:00', '椅子，桌子', '5-three', '2021-05-07 15:00:00', '1', null, '2021-05-05 12:48:12', 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('7u6tptrp', '100', '周末总结', '2021-05-06 16:00:00', '无', '110-two', '2021-05-06 15:00:00', '0', null, null, 'n57ifolpbr', null, '周末总结会议室', null);
INSERT INTO `reserve` VALUES ('89jb7st3', '343', '3443', '2021-05-06 12:00:00', '43434334', '3-three', '2021-05-06 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('8al20ijt', '343', '3443', '2021-05-06 12:00:00', '43434334', '3-three', '2021-05-06 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('9gnloogs', '343', '3443', '2021-05-05 12:00:00', '43434334', '3-two', '2021-05-05 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('cf3dhbue', '150', '996', '2021-05-06 12:00:00', '996', '67-three', '2021-05-06 11:00:00', '0', null, null, 'n57ifolpbr', null, '996会议室', 'mhr');
INSERT INTO `reserve` VALUES ('cq9khfu2', '100', '企业宣讲会', '2021-05-04 19:02:00', '生活就像海洋，只有一直将强的人才能到达成功的彼岸！', '2-two', '2021-05-05 10:00:00', '2', null, '2021-05-04 19:09:20', 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('d2ip3v3l', '343', '3443', '2021-05-05 12:00:00', '43434334', '3-two', '2021-05-05 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('e6f37eqb', '100', '周末总结', '2021-05-05 16:00:00', '无', '110-one', '2021-05-05 15:00:00', '0', null, null, 'n57ifolpbr', null, '周末总结会议室', null);
INSERT INTO `reserve` VALUES ('f1mkoghj', '343', '3443', '2021-05-06 12:00:00', '43434334', '3-three', '2021-05-06 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('flqsgcpp', '100', '企业宣讲会', '2021-05-05 10:00:00', '生活就像海洋，只有一直将强的人才能到达成功的彼岸！', '1-two', '2021-05-05 09:00:00', '2', null, '2021-05-04 19:09:23', 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('j6aco6ol', '300', '员工年终奖会议', '2021-05-06 16:00:00', '椅子，桌子', '5-two', '2021-05-06 15:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', null);
INSERT INTO `reserve` VALUES ('jrfkb8cp', '100', '周末总结', '2021-05-07 16:00:00', '无', '110-three', '2021-05-07 15:00:00', '1', null, '2021-05-05 13:18:14', 'n57ifolpbr', null, '周末总结会议室', 'mhr');
INSERT INTO `reserve` VALUES ('mrrvmnok', '343', '3443', '2021-05-05 12:00:00', '43434334', '3-two', '2021-05-05 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('no3d8nig', '334', '343', '2021-05-05 14:00:00', '33434', '4-two', '2021-05-05 13:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('s99jphu4', '343', '3443', '2021-05-05 12:00:00', '43434334', '3-two', '2021-05-05 11:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('t51rfeg3', '334', '343', '2021-05-05 13:00:00', '33434', '48-two', '2021-05-05 12:00:00', '0', null, null, 'n57ifolpbr', null, '企业宣讲会', 'mhr');
INSERT INTO `reserve` VALUES ('uul4ebsg', '150', '996', '2021-05-07 12:00:00', '996', '67-four', '2021-05-07 11:00:00', '1', null, '2021-05-05 09:24:30', 'n57ifolpbr', null, '996会议室', 'mhr');

-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `rid` int(10) NOT NULL AUTO_INCREMENT,
  `state` int(11) DEFAULT '0' COMMENT '会议室状态',
  `img` varchar(255) DEFAULT NULL COMMENT '会议图片',
  `address` varchar(255) DEFAULT NULL COMMENT '会议室地址',
  `admit` int(11) DEFAULT NULL COMMENT '可容纳人数',
  `equipment` text COMMENT '设备',
  `name` varchar(255) DEFAULT NULL COMMENT '会议室名称',
  `addTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `number` char(255) DEFAULT NULL COMMENT '编号',
  `isPublish` int(11) DEFAULT '1' COMMENT '是否开放',
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES ('2', '0', '/meetings/20210502/1619957570450.jpg', 'E101', '150', '电脑，投影仪', '企业宣讲会', '2021-05-02 20:13:29', null, '1003', '1');
INSERT INTO `rooms` VALUES ('3', '0', '/meetings/20210502/1619957685192.jpg', 'E506', '200', '电脑，投影仪，桌子，椅子', '123会议室', '2021-05-02 20:15:07', null, '1004', '1');
INSERT INTO `rooms` VALUES ('4', '0', '/meetings/20210502/1619957796823.jpg', 'R856', '150', '各种电子设备，应有尽有', '996会议室', '2021-05-02 20:16:49', '2021-05-02 20:35:57', 'E34567', '1');
INSERT INTO `rooms` VALUES ('5', '0', '/meetings/20210502/1619959358706.jpg', 'G306', '200', '桌子，麦克风2个，投影仪', '周末总结会议室', '2021-05-02 20:43:01', null, '1005', '1');
INSERT INTO `rooms` VALUES ('8', '0', '/roomss/20210504/1620122164168.jpeg', 'E2034', '100', '电脑，桌子，椅子，投影仪', 'XXX会议室', '2021-05-04 17:56:08', null, '1003', '1');
INSERT INTO `rooms` VALUES ('14', '0', '/roomss/20210504/1620130500201.jpg', 'E102', '200', '电脑，桌子', 'SSS会议室2332', '2021-05-04 20:15:16', null, 'E223232', '1');

-- ----------------------------
-- Table structure for rooms_analyze
-- ----------------------------
DROP TABLE IF EXISTS `rooms_analyze`;
CREATE TABLE `rooms_analyze` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `a` int(11) DEFAULT '0',
  `reserve_count` int(11) DEFAULT '0',
  `b` int(11) DEFAULT '0',
  `c` int(11) DEFAULT '0',
  `d` int(11) DEFAULT '0',
  `e` int(11) DEFAULT '0',
  `f` int(11) DEFAULT '0',
  `g` int(11) DEFAULT '0',
  `h` int(11) DEFAULT '0',
  `i` int(11) DEFAULT '0',
  `j` int(11) DEFAULT '0',
  `k` int(11) DEFAULT '0',
  `l` int(11) DEFAULT '0',
  `m` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of rooms_analyze
-- ----------------------------
INSERT INTO `rooms_analyze` VALUES ('4', '14', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rooms_analyze` VALUES ('5', '2', '0', '7', '1', '2', '1', '1', '0', '2', '0', '0', '0', '0', '0', '0');
INSERT INTO `rooms_analyze` VALUES ('6', '3', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rooms_analyze` VALUES ('7', '4', '0', '3', '1', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `rooms_analyze` VALUES ('8', '5', '0', '3', '0', '0', '0', '0', '0', '3', '0', '0', '0', '0', '0', '0');
INSERT INTO `rooms_analyze` VALUES ('9', '8', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for time_quantum
-- ----------------------------
DROP TABLE IF EXISTS `time_quantum`;
CREATE TABLE `time_quantum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL COMMENT '对应的会议室id',
  `time_quantum` varchar(255) DEFAULT NULL COMMENT '时间段',
  `one` int(11) DEFAULT '0' COMMENT '状态',
  `two` int(10) unsigned DEFAULT '0' COMMENT '第二天',
  `three` int(11) DEFAULT '0' COMMENT '第三天',
  `four` int(11) DEFAULT '0' COMMENT '第四天',
  `five` int(11) DEFAULT '0' COMMENT '第五天',
  `six` int(11) DEFAULT '0' COMMENT '第六天',
  `seven` int(11) DEFAULT '0' COMMENT '第七天',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of time_quantum
-- ----------------------------
INSERT INTO `time_quantum` VALUES ('1', '2', '09:00-10:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('2', '2', '10:00-11:00', '0', '1', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('3', '2', '11:00-12:00', '0', '1', '1', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('4', '2', '13:00-14:00', '0', '1', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('5', '2', '15:00-16:00', '0', '1', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('6', '2', '17:00-18:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('7', '2', '19:00-20:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('8', '2', '20:00-21:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('9', '2', '21:00-22:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('48', '2', '12:00-13:00', '0', '1', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('49', '2', '14:00-15:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('50', '2', '16:00-17:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('51', '2', '18:00-19:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('52', '3', '09:00-10:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('53', '3', '11:00-12:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('54', '3', '10:00-11:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('55', '3', '19:00-20:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('56', '3', '20:00-21:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('57', '3', '18:00-19:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('58', '3', '13:00-14:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('59', '3', '14:00-15:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('60', '3', '12:00-13:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('61', '3', '16:00-17:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('62', '3', '17:00-18:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('63', '3', '15:00-16:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('64', '3', '21:00-22:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('65', '4', '10:00-11:00', '0', '1', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('66', '4', '09:00-10:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('67', '4', '11:00-12:00', '0', '0', '1', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('68', '4', '12:00-13:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('69', '4', '14:00-15:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('70', '4', '13:00-14:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('71', '4', '15:00-16:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('72', '4', '16:00-17:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('73', '4', '17:00-18:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('74', '4', '18:00-19:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('75', '4', '19:00-20:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('76', '4', '21:00-22:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('77', '4', '20:00-21:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('104', '5', '10:00-11:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('105', '5', '09:00-10:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('106', '5', '11:00-12:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('107', '5', '12:00-13:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('108', '5', '13:00-14:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('109', '5', '14:00-15:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('110', '5', '15:00-16:00', '1', '1', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('111', '5', '16:00-17:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('112', '5', '17:00-18:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('113', '5', '18:00-19:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('114', '5', '19:00-20:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('115', '5', '20:00-21:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('116', '5', '21:00-22:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('121', '8', '09:00-10:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('122', '8', '11:00-12:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('123', '8', '10:00-11:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('124', '8', '12:00-13:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('125', '8', '13:00-14:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('126', '8', '19:00-20:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('127', '8', '15:00-16:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('128', '8', '17:00-18:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('129', '8', '16:00-17:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('130', '8', '21:00-22:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('131', '8', '18:00-19:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('132', '8', '14:00-15:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('133', '8', '20:00-21:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('199', '14', '09:00-10:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('200', '14', '10:00-11:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('201', '14', '11:00-12:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('202', '14', '12:00-13:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('203', '14', '13:00-14:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('204', '14', '14:00-15:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('205', '14', '15:00-16:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('206', '14', '16:00-17:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('207', '14', '17:00-18:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('208', '14', '19:00-20:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('209', '14', '21:00-22:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('210', '14', '20:00-21:00', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `time_quantum` VALUES ('211', '14', '18:00-19:00', '0', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` varchar(10) NOT NULL,
  `account` varchar(30) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `gender` varchar(4) DEFAULT NULL,
  `deparment` varchar(20) DEFAULT NULL,
  `post` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `registerTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `isPasse` int(11) DEFAULT '0' COMMENT '是否通过申请',
  `passeTime` datetime DEFAULT NULL,
  `u_img` varchar(0) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('3nvv87brig', 'sdfghah', '123456', '女', '策划部', '营销', '15521445457', '786345@qq.com', '2021-05-03 11:21:40', null, '小花', '1', '2021-05-03 11:24:15', null);
INSERT INTO `users` VALUES ('n57ifolpbr', 'mhr', '654321', '男', '技术部', '前端工程师', '15521008985', '7863615@qq.com', '2021-05-03 11:21:43', '2021-05-03 21:47:53', '张三', '1', '2021-05-04 13:22:05', null);
INSERT INTO `users` VALUES ('qekfds7m9t', 'njbn', '123456', '男', '宣传部', '推销', '15521004745', '785264@qq.com', '2021-05-03 11:21:48', null, '李四', '0', '2021-05-03 11:24:22', null);
INSERT INTO `users` VALUES ('st4u6donjg', '233', '233', '男', '工程部', 'java工程师', '15521008985', '786361576@qq.com', '2021-05-04 17:30:24', '2021-05-04 17:30:43', '无BUG', '1', '2021-05-04 17:30:46', null);
