-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: InsuranceProgram
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `EmployeeID` int NOT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Age` int NOT NULL,
  PRIMARY KEY (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (10001,'Singa@123','Aisha','Tan',24),(10002,'LaKopi123!','Jia Hui','Lee',53),(10003,'SedapNyumyum77','Nurul','Lim',35),(10004,'GulaMelaka#1','Siti','Baiduri',49),(10005,'Majulah*Sg123','Shan','Chong',25),(10006,'ShiokLah99!','Kai Ming','Tan',42),(10007,'ChopeSeat_88','Rajesh','Kumar',31),(10008,'SiaLah#123','Siti','Jamilah',51),(10009,'ShiokLah88#','Wei Ting','Tan',35),(10010,'Majulah_Sg99','Johnny','Ng',26),(10011,'SedapNyumyum55','Siti','Zubaidah',42),(10012,'KayaToast789#','Kok Wai','Lee',31),(10013,'LaKopi_123','Deepa','Padukone',63),(10014,'ShiokLah_77','Wei Jian','Chua',37),(10015,'ChopeSeat99#','Saravanan','Kumar',36),(10016,'GulaMelaka11#','Xiao Mei','Goh',38),(10017,'Majulah_Sg77','Rahman','Tan',28),(10018,'SedapNyumyum66','Ying Ying','Loh',48),(10019,'LaKopi11#','Munirah','Yasin',29),(10020,'SiaLah33#','Ganesan','Laksamana',30);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 15:23:43
