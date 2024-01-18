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
-- Table structure for table `employeeprojects`
--

DROP TABLE IF EXISTS `employeeprojects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeeprojects` (
  `ProjectID` int NOT NULL,
  `EmployeeID` int DEFAULT NULL,
  `ProjectName` varchar(100) DEFAULT NULL,
  `ProjectStatus` varchar(50) DEFAULT NULL,
  `ProjectBudget` float DEFAULT NULL,
  `ProjectLeadID` int DEFAULT NULL,
  PRIMARY KEY (`ProjectID`),
  KEY `EmployeeID` (`EmployeeID`),
  KEY `ProjectLeadID` (`ProjectLeadID`),
  CONSTRAINT `employeeprojects_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`),
  CONSTRAINT `employeeprojects_ibfk_2` FOREIGN KEY (`ProjectLeadID`) REFERENCES `employee` (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeprojects`
--

LOCK TABLES `employeeprojects` WRITE;
/*!40000 ALTER TABLE `employeeprojects` DISABLE KEYS */;
INSERT INTO `employeeprojects` VALUES (10001,10001,'Mobile Banking App','In Progress',15000,10002),(10002,10003,'Online Payment Gateway','Completed',25000,10004),(10003,10005,'ATM Upgrade','In Progress',18000,10006),(10004,10007,'Credit Scoring System','Terminated',30000,10008),(10005,10009,'Core Banking System Migration','In Progress',20000,10010),(10006,10011,'Digital Onboarding Platform','Yet To Commence',35000,10012),(10007,10013,'Trade Finance Automation','Completed',27000,10014),(10008,10015,'Customer Data Management System','In Progress',19000,10016),(10009,10017,'Risk Management Dashboard','Terminated',32000,10018),(10010,10019,'Loan Origination System','Yet To Commence',40000,10020);
/*!40000 ALTER TABLE `employeeprojects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 15:23:45
