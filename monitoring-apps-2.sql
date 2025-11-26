-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: monitoring_apps
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('monitoring_apps_cache_user@gmail.com|127.0.0.1','i:1;',1757858278),('monitoring_apps_cache_user@gmail.com|127.0.0.1:timer','i:1757858278;',1757858278);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kerusakans`
--

DROP TABLE IF EXISTS `kerusakans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kerusakans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `mesin_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `kode_kerusakan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Dilaporkan','Dalam Perbaikan','Selesai','Ditolak') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Dilaporkan',
  `waktu_lapor` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kerusakans_mesin_id_foreign` (`mesin_id`),
  KEY `kerusakans_user_id_foreign` (`user_id`),
  CONSTRAINT `kerusakans_mesin_id_foreign` FOREIGN KEY (`mesin_id`) REFERENCES `mesins` (`id`),
  CONSTRAINT `kerusakans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kerusakans`
--

LOCK TABLES `kerusakans` WRITE;
/*!40000 ALTER TABLE `kerusakans` DISABLE KEYS */;
INSERT INTO `kerusakans` VALUES (1,2,3,'KRS-001','mesin tidak berfungsi','Selesai','2025-09-14 06:58:24','2025-09-14 06:58:24','2025-09-14 07:01:43'),(2,4,3,'KRS-002','pisau tidak memotong sempurna','Selesai','2025-09-14 23:42:37','2025-09-14 23:42:37','2025-09-14 23:46:19'),(3,5,3,'KRS-003','Suhu oven tidak sesuai standar','Selesai','2025-09-20 08:28:25','2025-09-20 08:28:25','2025-09-20 08:46:25'),(4,3,3,'KRS-004','Jarum patah','Selesai','2025-09-20 08:30:00','2025-09-20 08:30:00','2025-10-30 05:53:37'),(6,7,3,'KRS-005','rusak nih cangkul nye','Dilaporkan','2025-10-30 05:43:06','2025-10-30 05:43:06','2025-10-30 05:43:06'),(8,7,3,'KRS-007','cangkul w rusak lagi nih bejir','Dalam Perbaikan','2025-10-30 07:33:55','2025-10-30 07:33:55','2025-10-30 07:33:55');
/*!40000 ALTER TABLE `kerusakans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesins`
--

DROP TABLE IF EXISTS `mesins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kode_mesin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_mesin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lokasi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar_mesin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesins`
--

LOCK TABLES `mesins` WRITE;
/*!40000 ALTER TABLE `mesins` DISABLE KEYS */;
INSERT INTO `mesins` VALUES (2,'FDP-001','Roll Gulung','line1 N1','Roll Karpet','mesin_images/Z988dpI8Fqwhr41umfOCqFJmwydhWpCC2XIgE6i3.jpg','2025-09-14 06:54:30','2025-10-30 05:19:50'),(3,'FDP-003','Press Jarum','Line 1 N1','Press Karpet','mesin_images/h2ldp7GeXYmklqC6X0BNzqXNuxZpTSoktTk9l6DH.jpg','2025-09-14 06:56:19','2025-09-14 06:56:19'),(4,'FDP-004','Cutting','Line 2 N1','Mesin potong','mesin_images/LsabjOXX5uZL3DVjlFDJzyEeZU1zPSCcIsEL9BGY.jpg','2025-09-14 23:39:46','2025-09-14 23:39:46'),(5,'FDP-005','oven','Line 1 N1','mesin pemanas','mesin_images/wI9BYB14VISaUZ8B86BC398KKse2llw1zPakC7SP.jpg','2025-09-20 08:11:57','2025-09-20 08:11:57'),(7,'Mesin-11','cangkul','antah berantah','penggali','mesin_images/3KFc8pIqUo3jp2raC4LxZaBpDo6PS6gHr565yw51.jpg','2025-10-30 05:19:34','2025-10-30 05:28:10');
/*!40000 ALTER TABLE `mesins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_08_13_085512_create_mesins_table',1),(5,'2025_08_15_094042_create_kerusakans_table',1),(6,'2025_08_15_100509_create_perbaikans_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perbaikans`
--

DROP TABLE IF EXISTS `perbaikans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perbaikans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kerusakan_id` bigint unsigned NOT NULL,
  `teknisi_id` bigint unsigned NOT NULL,
  `tindakan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sparepart` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci,
  `waktu_mulai` timestamp NOT NULL,
  `waktu_selesai` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `perbaikans_kerusakan_id_foreign` (`kerusakan_id`),
  KEY `perbaikans_teknisi_id_foreign` (`teknisi_id`),
  CONSTRAINT `perbaikans_kerusakan_id_foreign` FOREIGN KEY (`kerusakan_id`) REFERENCES `kerusakans` (`id`),
  CONSTRAINT `perbaikans_teknisi_id_foreign` FOREIGN KEY (`teknisi_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perbaikans`
--

LOCK TABLES `perbaikans` WRITE;
/*!40000 ALTER TABLE `perbaikans` DISABLE KEYS */;
INSERT INTO `perbaikans` VALUES (1,1,2,'Perbaikan Selesai','-','Tidak ada aliran listrik','2025-09-14 06:59:13','2025-09-14 07:01:43','2025-09-14 06:59:13','2025-09-14 07:01:43'),(2,2,2,'Perbaikan Selesai','-','Perbaikan pada pisau yang gompal / penyok','2025-09-14 23:43:36','2025-09-14 23:46:19','2025-09-14 23:43:36','2025-09-14 23:46:19'),(3,3,2,'Perbaikan Selesai','Panel pengatur suhu','Mengganti pengatur suhu yang rusak','2025-09-20 08:31:05','2025-09-20 08:46:25','2025-09-20 08:31:05','2025-09-20 08:46:25'),(4,4,2,'Perbaikan Selesai','Jarum','Mengganti jarum yang patah','2025-09-20 08:46:50','2025-10-30 05:53:37','2025-09-20 08:46:50','2025-10-30 05:53:37'),(6,8,2,'Perbaikan dimulai','-',NULL,'2025-10-30 07:33:55',NULL,'2025-10-30 07:33:55','2025-10-30 07:33:55');
/*!40000 ALTER TABLE `perbaikans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('rCMihF768gOxlgc6j7m0xLn1jAlUJvKqVdgwrGFn',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoic0txdldvQ0JVUUhrazlyZlRlZE96MzBHSHBSUlY2Z2pZUDFhNE00TiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9',1761834930),('T5kzCLIMMg1rppAo5vrtgp6y6bZa7p5qEwTlgU78',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','YToyOntzOjY6Il90b2tlbiI7czo0MDoidVU0NEZpOGRGTmxmbnJYUzBSNUNEaEJWNTYxNWJJTEM1Tkxpa2dXWiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1761830004);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','teknisi','operator') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'operator',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@gmail.com','admin',NULL,'$2y$12$g2bZAWzqwX4XDYKtTb.HdeeLIKVmJ8lSLo5Nj655XTn2gAgLlP.0i','p9S9rhVO0WNvH3pvT4YXnLeMQSJPRs3cp3aTqjbO5plYXM3GjmCVThLGEsDy','2025-10-29 08:25:02','2025-10-29 08:25:02'),(2,'Teknisi','teknisi@gmail.com','teknisi',NULL,'$2y$12$g2bZAWzqwX4XDYKtTb.HdeeLIKVmJ8lSLo5Nj655XTn2gAgLlP.0i','rlYIIu379JoptvW7oVCZMM96RyuFXBF4lEqkQqwzbC1EqE9FVb7hDeqqweRJ','2025-10-29 08:25:02','2025-10-29 08:25:02'),(3,'Operator','operator@gmail.com','operator',NULL,'$2y$12$g2bZAWzqwX4XDYKtTb.HdeeLIKVmJ8lSLo5Nj655XTn2gAgLlP.0i','8CyfCNJ2VQAGmIHyoVyrNXRRSHPrpBhxCNqxUTPNdWftULWbUSQy0kXphFdg','2025-10-29 08:25:02','2025-10-29 08:25:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-30 21:39:55
