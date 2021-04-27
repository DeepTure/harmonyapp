-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: harmonydef
-- ------------------------------------------------------
-- Server version	5.6.33-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usu` int(11) NOT NULL AUTO_INCREMENT,
  `id_tiu` int(11) DEFAULT NULL,
  `nom_usu` varchar(45) DEFAULT NULL,
  `rea_usu` varchar(45) DEFAULT NULL,
  `cor_usu` varchar(45) DEFAULT NULL,
  `gen_usu` varchar(10) DEFAULT NULL,
  `pas_usu` varchar(15) DEFAULT NULL,
  `app_usu` varchar(45) DEFAULT NULL,
  `apm_usu` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usu`),
  UNIQUE KEY `nom_usu_UNIQUE` (`nom_usu`),
  KEY `id_tiu_idx` (`id_tiu`),
  CONSTRAINT `id_tiu` FOREIGN KEY (`id_tiu`) REFERENCES `tipousuario` (`id_tiu`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (39,2,'perroloco','koro','kri@yahoo.com','Femenino','locomas','zalgo','hernandez'),(40,1,'koryto','carlos','korytocharls@gmail.com','Masculino','123','rojas','diaz'),(41,2,'cal','cal','xal@com.com','Femenino','hola','tiro','hernan'),(48,1,'pepe','pepe','fff@fff.com','Masculino','123','ghg','ghh'),(52,1,'pepito','pepito','fff@fff.com','Masculino','123','ghg','ghh'),(53,1,'karen','karen','loco@loco.com','Femenino','123','dsds','dsdsd');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-18 14:14:53
