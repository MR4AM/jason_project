/*
Navicat MySQL Data Transfer

Source Server         : jasonlee
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : fhlg

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-02-09 17:36:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('xiaoke', '7e7cc8047e92f7a249830d3c042fea27', '13677889910', '100sw@163.com');
INSERT INTO `user` VALUES ('司令大傻逼', '79d886010186eb60e3611cd4a5d0bcae', '13432895620', '9922863@qq.com');
INSERT INTO `user` VALUES ('黄丽旋个小辣鸡', '40641914166f1cba1d06c020e462ff8e', '15526879113', '7872836@qq.com');
INSERT INTO `user` VALUES ('laoxie', '827ccb0eea8a706c4c34a16891f84e7b', '13344455555', '192837193@qq.com');
INSERT INTO `user` VALUES ('jasonlee', 'f379eaf3c831b04de153469d1bec345e', '13432895832', '1479846243@qq.com');
INSERT INTO `user` VALUES ('laoxie999', '76d80224611fc919a5d54f0ff9fba446', '15678562432', '199@qq.com');
INSERT INTO `user` VALUES ('laoxie66', '202cb962ac59075b964b07152d234b70', '13344455555', '192837193@qq.com');
INSERT INTO `user` VALUES ('laoxie66666666', '202cb962ac59075b964b07152d234b70', '13344455555', '192837193@qq.com');
INSERT INTO `user` VALUES ('laoxie6', '202cb962ac59075b964b07152d234b70', '13344455555', '192837193@qq.com');
INSERT INTO `user` VALUES ('laoxie99999', '202cb962ac59075b964b07152d234b70', '13344455555', '192837193@qq.com');
SET FOREIGN_KEY_CHECKS=1;
