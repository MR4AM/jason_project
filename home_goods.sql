/*
Navicat MySQL Data Transfer

Source Server         : jasonlee
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : fhlg

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-02-09 17:37:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for home_goods
-- ----------------------------
DROP TABLE IF EXISTS `home_goods`;
CREATE TABLE `home_goods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `price` double(10,2) NOT NULL,
  `sale` double(255,0) DEFAULT NULL,
  `imgurl` varchar(255) CHARACTER SET utf8 NOT NULL,
  `category` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of home_goods
-- ----------------------------
INSERT INTO `home_goods` VALUES ('1', '华为 HUAWEI P10', '3150.00', '3050', '../img/phone/1001.jpg', 'phone');
INSERT INTO `home_goods` VALUES ('2', '华为（Huawei畅享7Plus', '1699.00', '1599', '../img/phone/1002.jpg', 'phone');
INSERT INTO `home_goods` VALUES ('3', '佳能（Canon）IXUS 285 HS', '1199.00', '1109', '../img/phone/1003.jpg', 'phone');
INSERT INTO `home_goods` VALUES ('4', '山业SANWA   MA-ERGC1', '1699.00', '1699', '../img/phone/1004.jpg', 'phone');
INSERT INTO `home_goods` VALUES ('5', '华为 HUAWEI P10', '3150.00', '3000', '../img/phone/1005.jpg', 'phone');
INSERT INTO `home_goods` VALUES ('6', ' BIRD/波导 A510', '6433.00', '3150', '../img/phone/1006.jpg', 'phone');
INSERT INTO `home_goods` VALUES ('7', ' 百依恋歌 拉链中长款加厚棉衣女长袖外套 BL2612 ', '49.00', '29', '../img/clothes/1001.jpg', 'clothes');
INSERT INTO `home_goods` VALUES ('8', ' 百依恋歌 中长款高腰百褶裙 ZC1702 ', '69.00', '89', '../img/clothes/1002.jpg', 'clothes');
INSERT INTO `home_goods` VALUES ('9', ' 浪莎 男士内衣纯色莫代尔薄款圆领秋衣秋裤套装 L88501 黑色 L码 ', '89.00', '70', '../img/clothes/1003.jpg', 'clothes');
INSERT INTO `home_goods` VALUES ('10', ' 陀翡利迩(TOPHILL)皮带手表女镶水钻双日历女表商务精钢女士防水时尚石英表TE008L ', '699.00', '599', '../img/clothes/1004.jpg', 'clothes');
INSERT INTO `home_goods` VALUES ('11', ' 陀翡利迩TOPHILL手表女士时尚潮流超薄小表盘时装石英表瑞士品牌拓非女表TS002L ', '350.00', '300', '../img/clothes/1005.jpg', 'clothes');
INSERT INTO `home_goods` VALUES ('12', ' 阿迪达斯男秋新款运动透气长裤休闲跑步训练针织健身裤 黑色金条南韩丝 2XL ', '433.00', '400', '../img/clothes/1006.jpg', 'clothes');
INSERT INTO `home_goods` VALUES ('13', '华为 HUAWEI P10', '3150.00', '3000', '../img/family/1001.jpg', 'family');
INSERT INTO `home_goods` VALUES ('14', '华为（Huawei畅享7Plus', '1699.00', '1099', '../img/family/1002.jpg', 'family');
INSERT INTO `home_goods` VALUES ('15', '佳能（Canon）IXUS 285 HS', '1199.00', '1099', '../img/family/1003.jpg', 'family');
INSERT INTO `home_goods` VALUES ('16', '山业SANWA   MA-ERGC1', '1699.00', '1099', '../img/family/1004.jpg', 'family');
INSERT INTO `home_goods` VALUES ('17', '华为 HUAWEI P10', '3150.00', '1099', '../img/family/1005.jpg', 'family');
INSERT INTO `home_goods` VALUES ('18', ' BIRD/波导 A510', '6433.00', '1099', '../img/family/1006.jpg', 'family');
INSERT INTO `home_goods` VALUES ('19', ' Grace 洁丽雅 无捻特柔毛巾礼盒三件套装 7001 ', '89.00', '1099', '../img/life/1001.jpg', 'life');
INSERT INTO `home_goods` VALUES ('20', ' 北极绒  1.5-1.8米床 喜庆婚嫁系列纯棉活性磨毛加厚四件套 金玉良缘 ', '399.00', '1099', '../img/life/1002.jpg', 'life');
INSERT INTO `home_goods` VALUES ('21', ' 浪莎 羊羔绒冬被 1.5*2.0M 5斤 驼色 ', '209.00', '1099', '../img/life/1003.jpg', 'life');
INSERT INTO `home_goods` VALUES ('22', ' 爱帛 韩版亲肤棉印花冬被 ', '129.00', '1099', '../img/life/1004.jpg', 'life');
INSERT INTO `home_goods` VALUES ('23', ' 浪莎 云貂绒毛毯 2.0*2.3M 蓝色波浪 ', '399.00', '1099', '../img/life/1005.jpg', 'life');
INSERT INTO `home_goods` VALUES ('24', '  摩亚 高支高密 磨毛印花 床垫  简约风格 90CM*200CM ', '49.00', '1099', '../img/life/1006.jpg', 'life');
INSERT INTO `home_goods` VALUES ('25', '华为 HUAWEI P10', '3150.00', '400', '../img/mom_child/1001.jpg', 'mom_child');
INSERT INTO `home_goods` VALUES ('26', '华为（Huawei畅享7Plus', '1699.00', '400', '../img/mom_child/1002.jpg', 'mom_child');
INSERT INTO `home_goods` VALUES ('27', '华为（Huawei畅享7Plus', '1699.00', '400', '../img/mom_child/1003.jpg', 'mom_child');
INSERT INTO `home_goods` VALUES ('28', '华为（Huawei畅享7Plus', '1699.00', '400', '../img/mom_child/1004.jpg', 'mom_child');
INSERT INTO `home_goods` VALUES ('29', '华为 HUAWEI P10', '3150.00', '400', '../img/mom_child/1005.jpg', 'mom_child');
INSERT INTO `home_goods` VALUES ('30', ' BIRD/波导 A510', '6433.00', '400', '../img/mom_child/1006.jpg', 'mom_child');
INSERT INTO `home_goods` VALUES ('31', '华为 HUAWEI P10', '3150.00', '400', '../img/sport_outside/1001.jpg', 'sport_outside');
INSERT INTO `home_goods` VALUES ('32', '华为（Huawei畅享7Plus', '1699.00', '520', '../img/sport_outside/1002.jpg', 'sport_outside');
INSERT INTO `home_goods` VALUES ('33', '华为（Huawei畅享7Plus', '1699.00', '520', '../img/sport_outside/1003.jpg', 'sport_outside');
INSERT INTO `home_goods` VALUES ('34', '华为（Huawei畅享7Plus', '1699.00', '520', '../img/sport_outside/1004.jpg', 'sport_outside');
INSERT INTO `home_goods` VALUES ('35', '华为 HUAWEI P10', '3150.00', '520', '../img/sport_outside/1005.jpg', 'sport_outside');
INSERT INTO `home_goods` VALUES ('36', ' BIRD/波导 A510', '6433.00', '520', '../img/sport_outside/1006.jpg', 'sport_outside');
INSERT INTO `home_goods` VALUES ('37', ' 相宜本草 黑茶男士控油洁面泥100g送50g ', '28.00', '520', '../img/makeup/1001.jpg', 'makeup');
INSERT INTO `home_goods` VALUES ('38', '韩后 毛孔清透爽肤水 120ml ', '169.00', '520', '../img/makeup/1002.jpg', 'makeup');
INSERT INTO `home_goods` VALUES ('39', '伊诗兰顿弹力蛋白精华眼霜改善黑眼圈细纹暗沉浮肿眼袋棕瓶 ', '199.00', '520', '../img/makeup/1003.jpg', 'makeup');
INSERT INTO `home_goods` VALUES ('40', '美迪惠尔 维生素面膜（升级版）10片', '299.00', '520', '../img/makeup/1004.jpg', 'makeup');
INSERT INTO `home_goods` VALUES ('41', '相宜本草 红景天莹透幼白礼盒 ', '350.00', '520', '../img/makeup/1005.jpg', 'makeup');
INSERT INTO `home_goods` VALUES ('42', '  片仔癀 深炫白牙膏留兰香型 180g ', '33.00', '520', '../img/makeup/1006.jpg', 'makeup');
INSERT INTO `home_goods` VALUES ('43', '华为 HUAWEI P10', '3150.00', '520', '../img/heathy_food/1001.jpg', 'heathy_food');
INSERT INTO `home_goods` VALUES ('44', '华为（Huawei畅享7Plus', '1699.00', '520', '../img/heathy_food/1002.jpg', 'heathy_food');
INSERT INTO `home_goods` VALUES ('45', '华为（Huawei畅享7Plus', '1699.00', '520', '../img/heathy_food/1003.jpg', 'heathy_food');
INSERT INTO `home_goods` VALUES ('46', '华为（Huawei畅享7Plus', '1699.00', '520', '../img/heathy_food/1004.jpg', 'heathy_food');
INSERT INTO `home_goods` VALUES ('47', '华为 HUAWEI P10', '3150.00', '520', '../img/heathy_food/1005.jpg', 'heathy_food');
INSERT INTO `home_goods` VALUES ('48', ' 波尔甘红酒', '6433.00', '520', '../img/heathy_food/1006.jpg', 'heathy_food');
INSERT INTO `home_goods` VALUES ('49', '赞宝贝小喇叭摇铃 ', '9.80', '1', '../img/prosale/1001.jpg', 'prosale');
INSERT INTO `home_goods` VALUES ('50', 'Viken维肯悦步运动蓝牙耳机', '159.00', '59', '../img/prosale/1002.jpg', 'prosale');
INSERT INTO `home_goods` VALUES ('51', 'Gol高乐竹纤维绣花毛巾', '49.00', '19', '../img/prosale/1003.jpg', 'prosale');
INSERT INTO `home_goods` VALUES ('52', 'FOLATO车载手机支架', '99.00', '19', '../img/prosale/1004.jpg', 'prosale');
INSERT INTO `home_goods` VALUES ('53', '正宗微山湖麻鸭蛋', '189.00', '159', '../img/prosale/1005.jpg', 'prosale');
SET FOREIGN_KEY_CHECKS=1;
