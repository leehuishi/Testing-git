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
-- Table structure for table `InsuranceClaims`
--

DROP TABLE IF EXISTS `InsuranceClaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InsuranceClaims` (
  `ClaimID` int NOT NULL,
  `InsuranceID` int NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `ExpenseDate` varchar(255) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Purpose` varchar(255) NOT NULL,
  `FollowUp` bit(1) NOT NULL,
  `PreviousClaimID` int DEFAULT NULL,
  `Status` varchar(20) NOT NULL,
  `LastEditedClaimDate` varchar(255) NOT NULL,
  PRIMARY KEY (`ClaimID`),
  KEY `InsuranceID` (`InsuranceID`),
  CONSTRAINT `InsuranceClaims_ibfk_1` FOREIGN KEY (`InsuranceID`) REFERENCES `InsurancePolicies` (`InsuranceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InsuranceClaims`
--

LOCK TABLES `InsuranceClaims` WRITE;
/*!40000 ALTER TABLE `InsuranceClaims` DISABLE KEYS */;
INSERT INTO `InsuranceClaims` VALUES (22221,11147,'Steve','Tan','2023-01-01 00:00:00',100.00,'Claim for vehicle damage',_binary '\0',NULL,'Pending','2023-02-03 10:30:10'),(22222,11148,'Mary','Emily','2023-07-22 21:22:03',800.00,'Claim for houses',_binary '\0',NULL,'Pending','2023-07-2 21:22:03'),(22223,11149,'test','test','2024-01-09 16:13:54',12.00,'test',_binary '\0',NULL,'Pending','2024-01-09 16:12:00'),(22224,11148,'test','test','2024-01-09 16:18:08',12.00,'test',_binary '\0',NULL,'Pending','2024-01-09 16:12:00'),(22225,11148,'test','test','2024-01-09 16:21:12',12.00,'test',_binary '\0',NULL,'Pending','2024-01-09 16:12:00'),(22226,11149,'test','test','2024-01-09 16:21:22',24.00,'test2',_binary '\0',22222,'Pending','2024-01-09 16:12:00'),(22227,11148,'test3','test3','2024-01-09 16:23:12',124.00,'test3',_binary '\0',NULL,'Pending','2024-01-09 16:12:00'),(22228,11149,'test','test','2024-01-09 16:23:26',124.00,'test4',_binary '\0',22223,'Pending','2024-01-09 16:12:00'),(22229,11148,'test','test','2024-01-09 16:24:27',124.00,'test5',_binary '\0',22224,'Pending','2024-01-09 16:24:00'),(22230,11149,'tet','test','2024-01-09 16:24:52',294.00,'test',_binary '\0',NULL,'Pending','2024-01-09 16:24:00'),(22231,11149,'tet','tet','2024-01-09 16:25:15',34.00,'tet',_binary '\0',NULL,'Cancelled','2024-01-09 16:24:00'),(22232,11149,'test','test','2024-01-09 16:41:04',2.00,'test',_binary '\0',NULL,'Pending','2024-01-09 16:24:00'),(22233,11148,'test','test','2024-01-09 16:41:45',12.00,'test',_binary '',NULL,'Pending','2024-01-09 16:42:00'),(22234,11148,'test','test','2024-01-09 16:58:08',2.00,'test',_binary '\0',NULL,'Pending','2024-01-09 16:42:00'),(22235,11148,'tet','test','2024-01-09 16:58:56',23.40,'test',_binary '\0',NULL,'Pending','2024-01-09 16:42:00'),(22236,11148,'test','lim','2024-01-09 16:59:43',23.00,'test',_binary '\0',22223,'Pending','2024-01-09 16:42:00');
/*!40000 ALTER TABLE `InsuranceClaims` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 15:23:40
