-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: expenseclaimsdata
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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `EmployeeID` int NOT NULL,
  `SupervisorID` int DEFAULT NULL,
  `DepartmentCode` varchar(3) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `BankAccountNumber` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  KEY `SupervisorID` (`SupervisorID`),
  KEY `DepartmentCode` (`DepartmentCode`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`SupervisorID`) REFERENCES `employee` (`EmployeeID`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`DepartmentCode`) REFERENCES `department` (`DepartmentCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (10001,NULL,'101','Singa@123','Aisha','Tan','1234567890'),(10002,10001,'101','LaKopi123!','Jia Hui','Lee','2345678901'),(10003,10001,'102','SedapNyumyum77','Nurul','Lim','3456789012'),(10004,NULL,'102','GulaMelaka#1','Siti','Baiduri','4567890123'),(10005,10002,'103','Majulah*Sg123','Shan','Chong','5678901234'),(10006,10002,'103','ShiokLah99!','Kai Ming','Tan','6789012345'),(10007,10003,'104','ChopeSeat_88','Rajesh','Kumar','7890123456'),(10008,10003,'104','SiaLah#123','Siti','Jamilah','8901234567'),(10009,NULL,'105','ShiokLah88#','Wei Ting','Tan','9012345678'),(10010,NULL,'105','Majulah_Sg99','Johnny','Ng','1123456789'),(10011,10006,'106','SedapNyumyum55','Siti','Zubaidah','2345678903'),(10012,10006,'106','KayaToast789#','Kok Wai','Lee','3456789014'),(10013,10007,'107','LaKopi_123','Deepa','Padukone','4567890125'),(10014,10007,'107','ShiokLah_77','Wei Jian','Chua','5678901235'),(10015,10008,'108','ChopeSeat99#','Saravanan','Kumar','6789012349'),(10016,10008,'108','GulaMelaka11#','Xiao Mei','Goh','7890123450'),(10017,NULL,'109','Majulah_Sg77','Rahman','Tan','8901234566'),(10018,NULL,'109','SedapNyumyum66','Ying Ying','Loh','9012345677'),(10019,10011,'110','LaKopi11#','Munirah','Yasin','0123456781'),(10020,10011,'110','SiaLah33#','Ganesan','Laksamana','1234567892');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 15:23:56
