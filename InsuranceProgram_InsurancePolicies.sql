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
-- Table structure for table `InsurancePolicies`
--

DROP TABLE IF EXISTS `InsurancePolicies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InsurancePolicies` (
  `InsuranceID` int NOT NULL,
  `EmployeeID` int NOT NULL,
  `InsuranceType` varchar(100) NOT NULL,
  `PolicyStartDate` varchar(255) NOT NULL,
  `PolicyTerm` varchar(100) NOT NULL,
  `PolicyEndDate` varchar(255) NOT NULL,
  `ClaimLimit` decimal(10,2) NOT NULL,
  `RemainingClaimLimit` decimal(10,2) NOT NULL,
  PRIMARY KEY (`InsuranceID`),
  KEY `EmployeeID` (`EmployeeID`),
  CONSTRAINT `InsurancePolicies_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `User` (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InsurancePolicies`
--

LOCK TABLES `InsurancePolicies` WRITE;
/*!40000 ALTER TABLE `InsurancePolicies` DISABLE KEYS */;
INSERT INTO `InsurancePolicies` VALUES (11147,10001,'Car Insurance','2023-01-01 00:00:00','Cover up for vehicle','2024-01-01 00:00:00',200.10,100.00),(11148,10013,'Mortgage Insurance','2023-04-01 00:00:00','Cover up of houses and building','2024-04-01 00:00:00',1000.00,500.20),(11149,10013,'Life Insurance','2022-01-01 00:00:00','Cover medical bills','2024-01-01 00:00:00',500.00,200.20),(11150,10004,'Saving Insurance','2023-02-10 00:00:00','Cover up for saving','2024-01-01 00:00:00',1300.00,1200.20);
/*!40000 ALTER TABLE `InsurancePolicies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 15:23:38
