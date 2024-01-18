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
-- Table structure for table `projectexpenseclaims`
--

DROP TABLE IF EXISTS `projectexpenseclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectexpenseclaims` (
  `ClaimID` int NOT NULL,
  `ProjectID` int NOT NULL,
  `EmployeeID` int DEFAULT NULL,
  `CurrencyID` varchar(3) NOT NULL,
  `ExpenseDate` datetime NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Purpose` varchar(255) NOT NULL,
  `ChargeToDefaultDept` bit(1) NOT NULL,
  `AlternativeDeptCode` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `LastEditedClaimDate` datetime NOT NULL,
  PRIMARY KEY (`ClaimID`),
  KEY `EmployeeID` (`EmployeeID`),
  KEY `ProjectID` (`ProjectID`),
  KEY `CurrencyID` (`CurrencyID`),
  CONSTRAINT `projectexpenseclaims_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`),
  CONSTRAINT `projectexpenseclaims_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `employeeprojects` (`ProjectID`),
  CONSTRAINT `projectexpenseclaims_ibfk_3` FOREIGN KEY (`CurrencyID`) REFERENCES `currency` (`CurrencyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectexpenseclaims`
--

LOCK TABLES `projectexpenseclaims` WRITE;
/*!40000 ALTER TABLE `projectexpenseclaims` DISABLE KEYS */;
INSERT INTO `projectexpenseclaims` VALUES (11147,10001,10011,'SGD','2023-04-29 08:30:00',100.50,'Banking tech',_binary '\0','','Pending','2023-04-30 10:00:00'),(11148,10002,10015,'IDR','2023-04-28 10:00:00',250.75,'Operations',_binary '\0','','Approved','2023-04-30 11:30:00'),(11149,10003,10014,'JPY','2023-04-27 13:45:00',500.00,'Banking operations',_binary '\0','','Rejected','2023-04-30 12:15:00'),(11150,10004,10018,'SGD','2023-04-26 15:30:00',175.25,'Banking tech',_binary '','105','Pending','2023-04-30 13:00:00'),(11151,10005,10020,'KRW','2023-04-25 17:15:00',350.00,'Banking operations',_binary '\0','','Pending','2023-04-30 14:30:00'),(11152,10006,10012,'IDR','2023-04-24 19:00:00',50.00,'Banking tech',_binary '\0','','Approved','2023-04-30 15:45:00'),(11156,10006,10018,'JPY','2023-04-29 09:12:00',5000.00,'Banking software upgrade',_binary '\0','','Approved','2023-04-30 13:28:00'),(11157,10007,10020,'IDR','2023-04-28 11:30:00',1000000.00,'Operations software license fee',_binary '\0','','Pending','2023-04-30 13:30:00'),(11158,10002,10016,'SGD','2023-04-27 15:45:00',250.00,'Banking conference registration fee',_binary '','104','Pending','2023-04-30 13:32:00'),(11159,10008,10010,'INR','2023-04-26 10:20:00',7500.00,'Operations training program fee',_binary '\0','','Approved','2023-04-30 13:34:00'),(11160,10009,10019,'KHR','2023-04-25 14:00:00',150.00,'Banking seminar fee',_binary '\0','','Rejected','2023-04-30 13:36:00'),(11161,10003,10015,'HKD','2023-04-24 12:30:00',2000.00,'Operations software upgrade',_binary '\0','','Pending','2023-04-30 13:38:00'),(11164,10004,10011,'SGD','2023-04-29 10:00:00',25.00,'IT support',_binary '\0','','Pending','2023-04-29 10:30:00'),(11165,10005,10012,'IDR','2023-04-28 14:30:00',2000000.00,'Hardware purchase',_binary '','105','Approved','2023-04-29 09:30:00'),(11166,10002,10011,'KRW','2023-04-28 16:45:00',15000.00,'Printing materials',_binary '\0','','Rejected','2023-04-29 11:00:00'),(11167,10007,10012,'VND','2023-04-27 13:15:00',750000.00,'Data entry software',_binary '\0','','Pending','2023-04-29 08:45:00'),(11168,10006,10016,'CNY','2023-04-26 11:30:00',500.00,'Office supplies',_binary '\0','','Approved','2023-04-29 10:15:00'),(11169,10010,10019,'TWD','2023-04-25 09:45:00',8000.00,'Telecommunications',_binary '\0','','Pending','2023-04-29 09:00:00'),(11170,10009,10019,'SGD','2023-04-27 10:12:45',232.50,'IT infrastructure upgrade',_binary '\0','105','Pending','2023-04-29 13:45:00'),(11171,10001,10016,'JPY','2023-04-28 08:30:15',15900.00,'Bank reconciliation software',_binary '\0','','Pending','2023-04-29 14:25:00'),(11172,10010,10010,'INR','2023-04-28 16:45:30',4500.00,'Teleconferencing equipment',_binary '\0','','Pending','2023-04-29 15:10:00'),(11173,10008,10012,'IDR','2023-04-29 09:15:00',2100000.00,'Core banking system upgrade',_binary '\0','','Pending','2023-04-30 09:20:00'),(11175,10002,10010,'SGD','2023-04-29 13:20:00',750.00,'Travel expenses for IT training',_binary '\0','','Pending','2023-04-30 14:30:00'),(11176,10006,10018,'CNY','2023-04-30 08:45:00',8000.00,'Cloud storage subscription',_binary '\0','','Pending','2023-04-30 09:15:00'),(11177,10003,10015,'HKD','2023-04-30 11:30:00',5500.00,'Hardware maintenance contract renewal',_binary '\0','','Pending','2023-04-30 12:00:00'),(11178,10007,10011,'KHR','2023-04-30 14:15:30',600000.00,'Server upgrade',_binary '\0','','Pending','2023-04-30 14:45:00'),(11179,10004,10020,'VND','2023-04-30 16:00:00',1800000.00,'Data analytics software license',_binary '\0','','Pending','2023-04-30 16:00:00'),(11210,10007,10020,'SGD','2023-04-27 09:30:00',15.50,'IT Equipment Purchase',_binary '\0','','Approved','2023-04-28 10:15:00'),(11211,10005,10011,'KRW','2023-04-28 14:20:00',200000.00,'Training Course Fees',_binary '\0','','Pending','2023-04-28 16:35:00'),(11212,10003,10016,'HKD','2023-04-29 08:45:00',2500.00,'Business Lunch Meeting',_binary '','103','Pending','2023-04-29 12:20:00'),(11213,10004,10012,'CNY','2023-04-29 15:00:00',500.00,'Stationery and Supplies',_binary '\0','','Rejected','2023-04-30 09:45:00'),(11214,10010,10014,'IDR','2023-04-29 10:00:00',75000.00,'Marketing Materials',_binary '\0','','Pending','2024-01-14 17:21:00'),(11215,10002,10020,'INR','2023-04-30 13:45:00',8000.00,'Team Building Event',_binary '\0','','Approved','2023-04-30 16:20:00'),(11216,10005,10011,'SGD','2023-04-29 08:30:00',56.72,'Banking Operations Training',_binary '','105','Pending','2023-04-29 14:30:00'),(11217,10008,10012,'JPY','2023-04-28 10:45:00',3480.00,'IT Infrastructure Upgrade',_binary '\0','','Approved','2023-04-29 09:20:00'),(11219,10003,10014,'HKD','2023-04-24 12:30:00',1200.50,'Office Supplies Purchase',_binary '\0','','Pending','2024-01-14 17:21:00'),(11220,10006,10015,'KHR','2023-04-23 11:00:00',150000.00,'Client Meeting Expenses',_binary '\0','','Approved','2023-04-25 14:15:00'),(11221,10007,10016,'INR','2023-04-22 14:45:00',3000.00,'Travel Expenses',_binary '\0','','Pending','2023-04-24 16:30:00'),(11222,10008,10014,'VND','2023-04-22 13:30:00',450000.00,'Banking equipment repair',_binary '\0','103','Rejected','2023-04-23 14:00:00'),(11223,10006,10019,'HKD','2023-04-27 09:00:00',800.00,'Banking operations training course',_binary '\0','','Pending','2023-04-27 16:30:00'),(11224,10005,10017,'CNY','2023-04-25 15:00:00',600.00,'Banking software maintenance',_binary '\0','','Approved','2023-04-26 10:15:00'),(11225,10007,10016,'IDR','2023-04-28 14:30:00',300.00,'Banking Tech',_binary '\0','','Pending','2023-04-28 18:45:00'),(11226,10003,10018,'JPY','2023-04-27 10:00:00',1500.00,'Operations',_binary '\0','','Approved','2023-04-27 14:15:00'),(11227,10010,10012,'KRW','2023-04-26 13:00:00',800.00,'Banking Operations',_binary '\0','','Rejected','2023-04-26 17:30:00'),(11228,10002,10011,'SGD','2023-04-25 09:30:00',75.00,'Banking Tech',_binary '\0','','Pending','2023-04-25 13:45:00'),(11229,10005,10017,'INR','2023-04-24 16:00:00',900.00,'Banking Operations',_binary '\0','','Pending','2023-04-24 20:15:00'),(11231,10005,10017,'INR','2023-04-24 17:00:00',100.00,'Banking Operations',_binary '\0','','Pending','2023-04-24 20:17:00'),(12232,10003,10013,'JPY','2023-12-14 17:03:00',20.00,'test 2',_binary '','12322','Pending','2024-01-14 17:21:00'),(12233,10001,10013,'CNY','2024-01-03 15:46:00',153.00,'test',_binary '\0','','Cancelled','2024-01-03 14:51:00'),(12234,10001,10013,'CNY','2024-01-07 22:44:00',33.41,'test',_binary '\0','','Pending','2024-01-07 23:02:00'),(12235,10004,10013,'CNY','2024-01-07 23:05:00',29.31,'testtest',_binary '\0','','Pending','2024-01-07 23:07:00'),(12236,10009,10013,'KHR','2024-01-07 23:08:00',431.00,'test test',_binary '\0','','Pending','2024-01-07 23:07:00'),(12237,10010,10013,'SGD','2024-01-10 17:32:00',23.03,'test',_binary '\0','','Pending','2024-01-10 16:59:00'),(12238,10004,10013,'TWD','2024-01-10 17:41:00',34.20,'test',_binary '\0','','Pending','2024-01-10 16:59:00'),(12239,10006,10013,'JPY','2024-01-10 17:42:00',12.30,'test',_binary '','1234','Pending','2024-01-14 17:21:00'),(12240,10009,10013,'KRW','2024-01-10 18:11:00',12.30,'test',_binary '\0','','Pending','2024-01-10 18:11:00'),(12241,10003,10013,'INR','2024-01-10 18:11:00',34.03,'Kim',_binary '','123','Pending','2024-01-14 17:21:00'),(12242,10006,10013,'IDR','2024-01-11 00:17:00',200.20,'test',_binary '\0','','Pending','2024-01-14 16:33:00'),(12243,10009,10013,'VND','2024-01-11 00:18:00',120.30,'test',_binary '','123','Pending','2024-01-14 17:21:00'),(12244,10004,10013,'TWD','2024-01-14 17:25:00',34.04,'test424',_binary '','12345','Pending','2024-01-14 17:21:00'),(12245,10004,10013,'HKD','2024-01-14 17:30:00',23.00,'test charge to default',_binary '','123','Pending','2024-01-14 17:21:00'),(12246,10004,10013,'IDR','2024-01-14 17:31:00',12.40,'test',_binary '\0','','Pending','2024-01-14 17:21:00'),(12247,10003,10013,'SGD','2024-01-15 15:25:00',204.30,'test',_binary '\0','','Pending','2024-01-15 15:25:00');
/*!40000 ALTER TABLE `projectexpenseclaims` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 15:23:48
