-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: online_food_orderingdb
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Yangon','Myanmar','Yangon','No.(2/A),Kanbae Road,(6)Quarter, Township'),(2,'Yangon','Myanmar','Yangon','No.8/B, KhayMarThi Street, Yangon'),(3,'Mandalay','Yangon','Mandalay','36, Inya Myaing, Street Shwe Taung Kyar St, 11201'),(4,'Yangon','Myanmar','Yangon','No.34,ThaTiPaHtan Road,Kyut Myaung Ward, Yangon'),(5,'Yangon','Myanmar','Yangon','Dhammazedi Road, people park, yangon hawker, Yangon'),(6,'Yangon','Myanmar','Yangon','837/Hlaing'),(7,'Yangon','Myanmar','Yangon','374/NawNi'),(8,'Mandalay','Myanmar','Mandalay','SouthOkkalapa/kanTharYar/12street'),(9,'Yangon','Myanmar','Yangon','033/OoChitMaung');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `total` bigint(20) NOT NULL,
  `total_item` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9emlp6m95v5er2bcqkjsw48he` (`user_id`),
  CONSTRAINT `FKg5uhi8vpsuy0lgloxk2h4w5o6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,900,2,2),(2,1950,3,8);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `total_price` bigint(20) NOT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1uobyhgl1wvgt1jpccia8xxs3` (`cart_id`),
  KEY `FKcro8349ry4i72h81en8iw202g` (`food_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKcro8349ry4i72h81en8iw202g` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (8,1,600,2,29),(9,1,500,2,31),(10,1,850,2,7),(15,1,400,1,30),(16,1,500,1,3);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item_ingredients`
--

DROP TABLE IF EXISTS `cart_item_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart_item_ingredients` (
  `cart_item_id` bigint(20) NOT NULL,
  `ingredients` varchar(255) DEFAULT NULL,
  KEY `FKkrku8lnktprll6drft94bedkx` (`cart_item_id`),
  CONSTRAINT `FKkrku8lnktprll6drft94bedkx` FOREIGN KEY (`cart_item_id`) REFERENCES `cart_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_ingredients`
--

LOCK TABLES `cart_item_ingredients` WRITE;
/*!40000 ALTER TABLE `cart_item_ingredients` DISABLE KEYS */;
INSERT INTO `cart_item_ingredients` VALUES (8,'Eggplant'),(8,' Coconut Milk'),(9,' Coconut Milk'),(9,'Green Papaya'),(9,'Palm Sugar'),(10,'Rice Noodles'),(10,'Turmeric'),(10,'Onion'),(15,' Sticky Rice'),(15,'Palm Sugar'),(15,'Coconut Cream'),(15,'Mango'),(16,'Rice Noodles'),(16,'Turmeric'),(16,'Onion'),(16,'Catfish'),(16,'Lemongrass');
/*!40000 ALTER TABLE `cart_item_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_information`
--

DROP TABLE IF EXISTS `contact_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `contact_information` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_information`
--

LOCK TABLES `contact_information` WRITE;
/*!40000 ALTER TABLE `contact_information` DISABLE KEYS */;
INSERT INTO `contact_information` VALUES (1,'golden@gmail.com','instagram.com/golden','08327232','twitter.com/golden'),(2,'jade@gmail.com','instagram.com/jade','098438723','twitter.com/jade'),(3,'ruby@gmail.com','instagram.com/ruby','098277282','twitter.com/ruby'),(4,'bowl@gmail.com','instagram.com/bowl','0927283727','twitter.com/bowl'),(5,'lotus@gmail.com','instagram.com/lotus','0932772663','twitter.com/lotus');
/*!40000 ALTER TABLE `contact_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `available` bit(1) NOT NULL,
  `creation_date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image1` varchar(255) NOT NULL,
  `is_non_vegetarian` bit(1) NOT NULL,
  `is_seasonal` bit(1) NOT NULL,
  `is_vegetarian` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` bigint(20) NOT NULL,
  `food_category_id` bigint(20) DEFAULT NULL,
  `restaurants_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpnfa6f8ubf600psx2mhefa1a1` (`food_category_id`),
  KEY `FKpiyp3ftd5oe2svm55o9qsnf3t` (`restaurants_id`),
  CONSTRAINT `FKpiyp3ftd5oe2svm55o9qsnf3t` FOREIGN KEY (`restaurants_id`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `FKpnfa6f8ubf600psx2mhefa1a1` FOREIGN KEY (`food_category_id`) REFERENCES `food_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (2,_binary '\0','2025-01-24','Healthy and Good For Human','52h4Tp7p.jpg',_binary '',_binary '',_binary '','Tea Leaf Salad',600,3,1),(3,_binary '','2025-01-24','Fav Food In Myanmar','Mohinga (Or Mohika).jpg',_binary '',_binary '\0',_binary '','Mohinga',500,4,1),(5,_binary '','2025-01-24','Fermented tea leaves mixed with crunchy toppings.','9e3142b6-4923-4533-8b93-534fbddb60bb.jpg',_binary '',_binary '\0',_binary '\0','Fried Tofu Salad',300,3,1),(6,_binary '','2025-01-24','Tender fish simmered in turmeric curry.','Masor Tenga Recipe - Authentic Assamese Recipe - Khaddoroshik.jpg',_binary '',_binary '\0',_binary '\0','Fish Curry',650,2,1),(7,_binary '','2025-01-24','Amazing Noodles And Spices','Garlic Butter Chicken Bites with Creamy Parmesan Pasta.jpg',_binary '',_binary '\0',_binary '','Shan Noodles',850,1,1),(8,_binary '\0','2025-01-24','Creamy noodles with a rich coconut curry','606d752a209c3.jpg',_binary '',_binary '\0',_binary '','Coconut Noodles',900,1,1),(9,_binary '','2025-01-24','Pork in tangy sweet-and-sour sauce.','mrsandmrstyles ΓÇá.jpg',_binary '',_binary '\0',_binary '\0','Sweet and Sour Chicken',1200,5,2),(10,_binary '','2025-01-24','Crispy duck served with pancakes.','324K views ┬╖ 1_4K reactions _ Prawns Fried Rice (Shrimp) _ The best Prawns Fried Rice you can make in less than 30mins.jpg',_binary '',_binary '\0',_binary '\0','Prawn Fried Rice',900,6,2),(11,_binary '\0','2025-01-24','Stir-fried noodles with beef and vegetables.','mushroom-curry.jpg',_binary '',_binary '\0',_binary '','Spring Rolls',550,7,2),(12,_binary '\0','2025-01-24','Stir-fried chicken with peanuts and chilies.','chicken-nugget.jpg',_binary '',_binary '\0',_binary '\0','Chicken Dumplings',700,7,2),(13,_binary '','2025-01-24','Tangy soup with tofu and bamboo shoots.','Authentic Tom Kha Gai Soup Recipe.jpg',_binary '',_binary '\0',_binary '','Hot and Sour Soup',440,8,2),(14,_binary '','2025-01-24','Sweet custard tarts in flaky pastry','Nasi Goreng (Indonesian Fried Rice) - Sugar Spice & More.jpg',_binary '',_binary '\0',_binary '\0','Egg Fried Rice',1100,6,2),(15,_binary '','2025-01-24','Slow-cooked beef in rich coconut sauce.','Akohzie Chef Aguilar.jpg',_binary '',_binary '\0',_binary '\0','Beef Rendang',1400,9,3),(16,_binary '','2025-01-24','Grilled meat skewers with peanut sauce.','Homemade Chicken Tikka Kabab Recipe - khaddoroshik.jpg',_binary '',_binary '\0',_binary '\0','Chicken Satay',900,10,3),(17,_binary '','2025-01-24','Spicy noodle soup with seafood.','Mediterranean Seafood Stew - Zarzuela de Pescado - Spain on a Fork.jpg',_binary '',_binary '\0',_binary '\0','Laksa',750,11,3),(18,_binary '','2025-01-24','Savory pastry stuffed with curried potatoes.','potato-nugget.jpg',_binary '',_binary '\0',_binary '\0','Curry Puff',300,9,3),(19,_binary '\0','2025-01-24','Flaky flatbread served with curry.','Annfamm.jpg',_binary '',_binary '\0',_binary '\0','Roti Canai',400,12,3),(20,_binary '','2025-01-24','Coconut rice with spicy sambal.','Nasi Lemak.jpg',_binary '\0',_binary '\0',_binary '','Nasi Lemak',600,13,3),(21,_binary '','2025-01-24','Vietnamese noodle soup with beef or chicken.','Instant Pot Pho.jpg',_binary '',_binary '\0',_binary '\0','Pho',650,14,4),(22,_binary '','2025-01-24','Crispy baguette sandwich with savory fillings.','download.jpg',_binary '',_binary '\0',_binary '\0','Banh Mi',800,15,4),(23,_binary '','2025-01-24','Fresh rolls with shrimp and herbs.','Nem N╞░ß╗¢ng Cuon (Grilled Pork Spring Rolls).jpg',_binary '',_binary '\0',_binary '','Vietnamese Spring Rolls',600,15,4),(24,_binary '\0','2025-01-24',' Rice cooked with meats and sauces.','Vietnamese Grilled Pork with Noodles ΓÇô B├║n Thß╗ït N╞░ß╗¢ng.jpg',_binary '',_binary '\0',_binary '\0','Grilled Pork Vermicelli',1000,16,4),(25,_binary '','2025-01-24','Strong coffee with condensed milk.','Egg Coffee - A Vietnamese Classic - Honest Cooking by Kalle Bergman.jpg',_binary '',_binary '\0',_binary '','Egg Coffee',200,17,4),(26,_binary '','2025-01-24','Spicy noodle soup with sliced beef.','Hue Beef Noodle Soup from Hue, Vietnam.jpg',_binary '',_binary '\0',_binary '\0','Hue Beef Noodle Soup',700,14,4),(27,_binary '','2025-01-24','Spicy and sour soup with shrimp.','Tom Yum Soup_ A Spicy and Sour Thai Delicacy.jpg',_binary '',_binary '',_binary '\0','Tom Yum Soup',1400,18,5),(28,_binary '','2025-01-24','Stir-fried rice noodles with tamarind sauce.','_WOULD YOU DIVE INTO THIS SIZZLING ≡ƒìñ GrilledΓÇª.jpg',_binary '',_binary '',_binary '\0','Pad Thai',1300,19,5),(29,_binary '','2025-01-24','Creamy curry with eggplant and chicken.','Thai Green Curry.jpg',_binary '',_binary '\0',_binary '','Green Curry',600,19,5),(30,_binary '','2025-01-24','Sweet coconut rice with fresh mango.','01GonrE7.jpg',_binary '',_binary '',_binary '','Mango Sticky Rice',400,20,5),(31,_binary '','2025-01-24','Creamy curry with tender pumpkin.','Green Papaya Salad - Som Tam - α╕¬α╣ëα╕íα╕òα╕│ - Ian Benites.jpg',_binary '',_binary '',_binary '','Papaya Salad',500,21,5),(32,_binary '\0','2025-01-24','Stir-fried chicken with Thai basil.','fried-chichen.jpg',_binary '',_binary '\0',_binary '\0','Thai Basil Chicken',800,19,5);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_category`
--

DROP TABLE IF EXISTS `food_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `restaurant_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl1a49n974awq3tcx6cimwne2v` (`restaurant_id`),
  CONSTRAINT `FKl1a49n974awq3tcx6cimwne2v` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_category`
--

LOCK TABLES `food_category` WRITE;
/*!40000 ALTER TABLE `food_category` DISABLE KEYS */;
INSERT INTO `food_category` VALUES (1,'Noodles',1),(2,'Curry',1),(3,'Salad',1),(4,'Snacks',1),(5,'Chicken',2),(6,'Rice',2),(7,'Snacks',2),(8,'Soup',2),(9,'Curry',3),(10,'Satay',3),(11,'Soup',3),(12,'Snacks',3),(13,'Rice',3),(14,'Soup',4),(15,'Snacks',4),(16,'Curry',4),(17,'Drink',4),(18,'Soup',5),(19,'Curry',5),(20,'Rice',5),(21,'Salad',5);
/*!40000 ALTER TABLE `food_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_ingredient_category`
--

DROP TABLE IF EXISTS `food_ingredient_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_ingredient_category` (
  `food_id` bigint(20) NOT NULL,
  `ingredient_category_id` bigint(20) NOT NULL,
  KEY `FKn7jfa7t0bew5ieirck4sedhje` (`ingredient_category_id`),
  KEY `FK1wosiwgljnplm9dn85kri30vy` (`food_id`),
  CONSTRAINT `FK1wosiwgljnplm9dn85kri30vy` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FKn7jfa7t0bew5ieirck4sedhje` FOREIGN KEY (`ingredient_category_id`) REFERENCES `ingredient_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_ingredient_category`
--

LOCK TABLES `food_ingredient_category` WRITE;
/*!40000 ALTER TABLE `food_ingredient_category` DISABLE KEYS */;
INSERT INTO `food_ingredient_category` VALUES (2,2),(2,3),(2,4),(3,1),(3,2),(3,3),(3,5),(6,2),(6,5),(6,6),(5,2),(5,3),(5,7),(7,1),(7,2),(7,3),(8,1),(8,2),(8,3),(8,6),(9,9),(9,10),(9,11),(10,10),(10,12),(10,13),(11,10),(11,15),(12,9),(12,10),(12,15),(13,10),(13,16),(13,17),(14,9),(14,10),(14,13),(14,14),(14,17),(15,18),(15,19),(15,20),(16,18),(16,19),(16,21),(17,19),(17,20),(17,22),(18,19),(18,24),(18,26),(19,18),(19,21),(19,25),(20,18),(20,19),(20,27),(20,28),(21,29),(21,30),(21,31),(22,29),(22,32),(22,33),(23,29),(23,33),(23,34),(23,38),(24,29),(24,30),(24,33),(25,33),(25,35),(25,36),(25,37),(26,29),(26,30),(26,31),(27,39),(27,40),(27,41),(28,42),(28,43),(28,44),(29,40),(29,41),(29,43),(30,45),(30,46),(30,47),(31,40),(31,43),(31,47),(32,43),(32,44),(32,48);
/*!40000 ALTER TABLE `food_ingredient_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_ingredient_items`
--

DROP TABLE IF EXISTS `food_ingredient_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_ingredient_items` (
  `food_id` bigint(20) NOT NULL,
  `ingredient_item_id` bigint(20) NOT NULL,
  KEY `FKosim18w9k9c8uo3g3mxe4egq9` (`ingredient_item_id`),
  KEY `FK78jjimhio72tabvw3trfin9p5` (`food_id`),
  CONSTRAINT `FK78jjimhio72tabvw3trfin9p5` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FKosim18w9k9c8uo3g3mxe4egq9` FOREIGN KEY (`ingredient_item_id`) REFERENCES `ingredients_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_ingredient_items`
--

LOCK TABLES `food_ingredient_items` WRITE;
/*!40000 ALTER TABLE `food_ingredient_items` DISABLE KEYS */;
INSERT INTO `food_ingredient_items` VALUES (2,4),(2,6),(2,7),(2,8),(2,16),(2,22),(3,1),(3,3),(3,9),(3,10),(3,11),(3,12),(3,13),(3,19),(6,3),(6,10),(6,13),(6,16),(6,20),(6,21),(5,2),(5,4),(5,8),(5,11),(5,17),(5,18),(5,19),(7,1),(7,3),(7,4),(7,5),(7,8),(7,9),(7,11),(7,16),(8,1),(8,3),(8,4),(8,8),(8,9),(8,11),(8,14),(8,15),(8,16),(8,17),(9,34),(9,37),(9,38),(9,42),(9,44),(9,45),(9,46),(10,27),(10,30),(10,33),(10,37),(10,38),(10,40),(10,43),(11,30),(11,32),(11,35),(11,36),(11,37),(11,38),(11,41),(12,32),(12,33),(12,34),(12,35),(12,38),(12,42),(13,23),(13,27),(13,29),(13,31),(13,33),(13,37),(13,42),(14,23),(14,29),(14,33),(14,34),(14,37),(14,38),(14,39),(14,40),(15,47),(15,48),(15,49),(15,50),(15,51),(15,52),(15,53),(16,47),(16,48),(16,49),(16,51),(16,53),(16,54),(16,55),(16,56),(17,48),(17,50),(17,52),(17,55),(17,57),(18,51),(18,55),(18,59),(18,60),(18,61),(18,62),(19,47),(19,53),(19,54),(19,63),(19,64),(20,47),(20,49),(20,51),(20,53),(20,56),(20,65),(20,66),(20,67),(21,68),(21,69),(21,70),(21,71),(21,72),(21,73),(21,82),(22,68),(22,74),(22,75),(22,76),(22,77),(22,81),(22,88),(23,68),(23,69),(23,78),(23,79),(23,80),(23,81),(23,86),(23,87),(23,88),(24,68),(24,69),(24,70),(24,76),(24,79),(24,80),(25,75),(25,76),(25,79),(25,83),(25,84),(25,85),(26,68),(26,69),(26,70),(26,71),(26,72),(26,73),(26,82),(27,94),(27,107),(27,108),(27,109),(28,92),(28,95),(28,96),(28,104),(28,105),(28,106),(29,91),(29,94),(29,100),(29,101),(29,102),(29,103),(30,93),(30,97),(30,98),(30,99),(31,93),(31,94),(31,95),(31,96),(31,102),(32,89),(32,90),(32,91),(32,92),(32,96),(32,102),(32,104),(32,105);
/*!40000 ALTER TABLE `food_ingredient_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient_category`
--

DROP TABLE IF EXISTS `ingredient_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ingredient_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `restaurant_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdx2hvej3t5hkiguy698n9covv` (`restaurant_id`),
  CONSTRAINT `FKdx2hvej3t5hkiguy698n9covv` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient_category`
--

LOCK TABLES `ingredient_category` WRITE;
/*!40000 ALTER TABLE `ingredient_category` DISABLE KEYS */;
INSERT INTO `ingredient_category` VALUES (1,'Noodles',1),(2,'Spices',1),(3,'Vegetables',1),(4,'Nuts & Seeds',1),(5,'Seafood',1),(6,'Liquids',1),(7,'Proteins',1),(9,'Meat',2),(10,'Vegetables',2),(11,'Sauces',2),(12,'Seafood',2),(13,'Grains',2),(14,'Proteins',2),(15,'Wrapping',2),(16,'Liquids',2),(17,'Spices',2),(18,'Meat',3),(19,'Spices',3),(20,'Liquids',3),(21,'Sauces',3),(22,'Noodles',3),(24,'Dough',3),(25,'Bread',3),(26,'Vegetables',3),(27,'Proteins',3),(28,'Grains',3),(29,'Meat',4),(30,'Noodles',4),(31,'Spices',4),(32,'Bread',4),(33,'Vegetables',4),(34,'Wrapping',4),(35,'Proteins',4),(36,'Liquids',4),(37,'Sweeteners',4),(38,'Source',4),(39,'Seafood',5),(40,'Spices',5),(41,'Liquids',5),(42,'Noodles',5),(43,'Vegetables',5),(44,'Proteins',5),(45,'Fruits',5),(46,'Grains',5),(47,'Sweeteners',5),(48,'Sauces',5);
/*!40000 ALTER TABLE `ingredient_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients_item`
--

DROP TABLE IF EXISTS `ingredients_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ingredients_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `in_stoke` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ingredient_category_id` bigint(20) DEFAULT NULL,
  `restaurant_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs2q9wo6ft2iqnn554f94envwj` (`ingredient_category_id`),
  KEY `FKkokfv1la8uvwmow57uv6aeqnx` (`restaurant_id`),
  CONSTRAINT `FKkokfv1la8uvwmow57uv6aeqnx` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `FKs2q9wo6ft2iqnn554f94envwj` FOREIGN KEY (`ingredient_category_id`) REFERENCES `ingredient_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients_item`
--

LOCK TABLES `ingredients_item` WRITE;
/*!40000 ALTER TABLE `ingredients_item` DISABLE KEYS */;
INSERT INTO `ingredients_item` VALUES (1,_binary '','Rice Noodles',1,1),(2,_binary '\0','Chili Powder',2,1),(3,_binary '','Turmeric',2,1),(4,_binary '','Tomato',3,1),(5,_binary '\0','Cilantro',3,1),(6,_binary '','Peanuts',4,1),(7,_binary '\0','Sesame Seeds',4,1),(8,_binary '','Garlic Oil',2,1),(9,_binary '','Rice Vermicelli',1,1),(10,_binary '','Catfish',5,1),(11,_binary '','Onion',3,1),(12,_binary '\0','Banana Stem',3,1),(13,_binary '','Lemongrass',2,1),(14,_binary '','Egg Noodles',1,1),(15,_binary '','Coconut Milk',6,1),(16,_binary '','Chili Oil',2,1),(17,_binary '\0','Cucumber',3,1),(18,_binary '','Tofu',7,1),(19,_binary '','Lime',2,1),(20,_binary '','River Fish',5,1),(21,_binary '\0',' Tamarind Juice',6,1),(22,_binary '','Tea Leaves',3,1),(23,_binary '\0','White Pepper',17,2),(27,_binary '','Bamboo Shoots',10,2),(29,_binary '','Chili Oil',17,2),(30,_binary '','Tofu',10,2),(31,_binary '','Chicken Broth',16,2),(32,_binary '','Dumpling Dough',15,2),(33,_binary '\0','Garlic',10,2),(34,_binary '','Minced Chicken',9,2),(35,_binary '\0','Rice Paper',15,2),(36,_binary '','Cabbage',10,2),(37,_binary '','Carrot',10,2),(38,_binary '','Mushroom',10,2),(39,_binary '','Egg',14,2),(40,_binary '\0','Jasmine Rice',13,2),(41,_binary '','Green Peas',10,2),(42,_binary '','Onion',10,2),(43,_binary '','Prawns',12,2),(44,_binary '','Sweet',11,2),(45,_binary '\0','Sour Sauce',11,2),(46,_binary '','Bell Peppers',10,2),(47,_binary '\0','Beef',18,3),(48,_binary '','Lemongrass',19,3),(49,_binary '','Galangal',19,3),(50,_binary '\0','Turmeric',19,3),(51,_binary '','Chili',19,3),(52,_binary '','Coconut Milk',20,3),(53,_binary '','Chicken',18,3),(54,_binary '','Peanut ',21,3),(55,_binary '\0','Cumin',19,3),(56,_binary '','Coriander',19,3),(57,_binary '','Rice ',22,3),(59,_binary '','Puff Pastry',24,3),(60,_binary '','Potato',26,3),(61,_binary '\0','Carrot',26,3),(62,_binary '','Curry Powder',19,3),(63,_binary '','Flatbread',25,3),(64,_binary '','Curry',21,3),(65,_binary '\0','Coconut Rice',28,3),(66,_binary '','Fried Anchovies',27,3),(67,_binary '','Hard-Boiled Egg',27,3),(68,_binary '\0','Beef ',29,4),(69,_binary '','Chicken',29,4),(70,_binary '','Rice',30,4),(71,_binary '\0','Star Anise',31,4),(72,_binary '','Clove',31,4),(73,_binary '','Cinnamon',31,4),(74,_binary '','Baguette',32,4),(75,_binary '\0','Pickled Carrot',33,4),(76,_binary '','Cucumber',33,4),(77,_binary '','Grilled Pork',29,4),(78,_binary '','Rice Paper',34,4),(79,_binary '','Lettuce',33,4),(80,_binary '','Mint',33,4),(81,_binary '','Vermicelli',33,4),(82,_binary '\0','Vermicelli Noodles',30,4),(83,_binary '','Coffee',36,4),(84,_binary '','Egg Yolk',35,4),(85,_binary '','Condensed Milk',37,4),(86,_binary '','Oyster',38,4),(87,_binary '\0','Soy ',38,4),(88,_binary '','Chili',33,4),(89,_binary '\0','Oyster ',48,5),(90,_binary '','Soy ',48,5),(91,_binary '\0','Thai Basil',43,5),(92,_binary '','Ground Chicken',44,5),(93,_binary '','Palm Sugar',47,5),(94,_binary '\0','Garlic',40,5),(95,_binary '','Green Papaya',43,5),(96,_binary '','Tomato',43,5),(97,_binary '','Coconut Cream',47,5),(98,_binary '',' Sticky Rice',46,5),(99,_binary '','Mango',45,5),(100,_binary '',' Coconut Milk',41,5),(101,_binary '\0','Green Curry Paste',40,5),(102,_binary '','Eggplant',43,5),(103,_binary '','Bamboo Shoots',43,5),(104,_binary '','Egg',44,5),(105,_binary '','Prawns',44,5),(106,_binary '\0','Rice Noodles',42,5),(107,_binary '','Shrimp',39,5),(108,_binary '','Kaffir Lime Leaves',40,5),(109,_binary '','Galangal',40,5);
/*!40000 ALTER TABLE `ingredients_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item_ingredients`
--

DROP TABLE IF EXISTS `order_item_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_item_ingredients` (
  `order_item_id` bigint(20) NOT NULL,
  `ingredients` varchar(255) DEFAULT NULL,
  KEY `FKnoklqw81fom3muo54igrm6n4j` (`order_item_id`),
  CONSTRAINT `FKnoklqw81fom3muo54igrm6n4j` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item_ingredients`
--

LOCK TABLES `order_item_ingredients` WRITE;
/*!40000 ALTER TABLE `order_item_ingredients` DISABLE KEYS */;
INSERT INTO `order_item_ingredients` VALUES (1,'Chicken'),(1,'Lemongrass'),(1,'Galangal'),(1,'Coconut Milk'),(2,'Chicken'),(2,'Galangal'),(2,'Chili'),(2,'Fried Anchovies'),(3,'Rice Noodles'),(3,'Turmeric'),(3,'Lemongrass'),(3,'Onion'),(3,'Catfish'),(4,'Rice Noodles'),(4,'Turmeric'),(4,'Lemongrass'),(4,'Onion'),(4,'Catfish'),(4,'Garlic Oil'),(4,'Tomato'),(4,'Tofu'),(5,'Mango'),(5,' Sticky Rice'),(5,'Palm Sugar'),(6,'Chicken'),(6,'Rice'),(6,'Clove'),(7,'Rice'),(7,'Clove'),(7,'Lettuce'),(7,'Mint'),(7,'Rice Paper'),(7,'Oyster'),(8,'Green Papaya'),(8,'Prawns'),(9,'Green Papaya'),(9,'Prawns'),(9,'Shrimp'),(9,'Kaffir Lime Leaves'),(10,'Cucumber'),(10,'Coffee'),(10,'Condensed Milk');
/*!40000 ALTER TABLE `order_item_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_item_state` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` bigint(20) NOT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7jsocg6uwawnp9ymm8u2j4mmc` (`food_id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  CONSTRAINT `FK7jsocg6uwawnp9ymm8u2j4mmc` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,'PENDING',2,2800,15,1),(2,'PENDING',1,600,20,1),(3,'PENDING',2,1000,3,2),(4,'CANCELLED',1,300,5,2),(5,'PENDING',1,400,30,2),(6,'PENDING',1,650,21,3),(7,'PENDING',1,600,23,3),(8,'PENDING',1,1300,28,4),(9,'CANCELLED',1,1400,27,4),(10,'PENDING',1,200,25,4);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` date DEFAULT NULL,
  `total_item` int(11) NOT NULL,
  `total_price` bigint(20) NOT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf5464gxwc32ongdvka2rtvw96` (`address_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKf5464gxwc32ongdvka2rtvw96` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-01-25',3,4400,6,2),(2,'2025-01-25',4,2700,9,8),(3,'2025-01-25',2,2250,8,8),(4,'2025-01-25',3,3900,7,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restaurant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cuisine_type` varchar(255) DEFAULT NULL,
  `description` text,
  `name` varchar(255) NOT NULL,
  `open` bit(1) NOT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `registration_date` datetime(6) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `contact_information_id` bigint(20) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2b01rrbfd5g6hklh8ei57uhgn` (`address_id`),
  UNIQUE KEY `UK5vg3ikk12ijmoppo7kf9f1f57` (`contact_information_id`),
  KEY `FKsh6jyud453k5uisje3pyubk39` (`owner_id`),
  CONSTRAINT `FK96q13p1ptpewvus590a8o83xt` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKqgktrc0iltxq093wviihjo0pm` FOREIGN KEY (`contact_information_id`) REFERENCES `contact_information` (`id`),
  CONSTRAINT `FKsh6jyud453k5uisje3pyubk39` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'Myanmar','A cozy restaurant offering authentic Burmese cuisine, featuring classic dishes like Shan Noodles, Tea Leaf Salad, and Mohinga. A true taste of Myanmar\'s rich culinary heritage.','Golden Pagoda',_binary '','MON-SUN : 6:00AM - 9:00PM','2025-01-24 14:27:34.909870',1,1,1),(2,'japanene','An elegant Asian eatery specializing in Chinese-inspired comfort food, from Sweet and Sour Chicken to delicious Prawn Fried Rice. Perfect for a family feast!','Jade Garden',_binary '\0','MON-SUN : 6:00AM - 8:00PM','2025-01-24 14:55:59.480486',2,2,4),(3,'Russian','A vibrant spot for Indonesian delicacies, showcasing the bold flavors of Beef Rendang, Chicken Satay, and spicy Sambal Prawns. A haven for spice lovers','Ruby Palace',_binary '','MON-SUN : 7:00AM - 7:00PM','2025-01-24 15:05:40.801510',3,3,5),(4,'Russian','A casual Vietnamese restaurant serving fresh and flavorful dishes like Pho, Banh Mi, and Grilled Pork Chop Rice. Enjoy a culinary journey through Vietnam.','Emerald Bowl',_binary '','MON-SUN : 5:30AM - 9:00PM','2025-01-24 15:25:23.090583',4,4,6),(5,'japanene','An inviting Thai dining experience with popular dishes like Tom Yum Soup, Pad Thai, and Green Curry. Known for its perfect balance of sweet, sour, salty, and spicy flavors.','Sapphire Lotus',_binary '','MON-SUN : 5:00AM - 8:00PM','2025-01-24 15:29:32.148083',5,5,7);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant_images`
--

DROP TABLE IF EXISTS `restaurant_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restaurant_images` (
  `restaurant_id` bigint(20) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  KEY `FK810i11orew47qx1nrcwlh43jb` (`restaurant_id`),
  CONSTRAINT `FK810i11orew47qx1nrcwlh43jb` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant_images`
--

LOCK TABLES `restaurant_images` WRITE;
/*!40000 ALTER TABLE `restaurant_images` DISABLE KEYS */;
INSERT INTO `restaurant_images` VALUES (1,'restaurant_table_interior_39288_1920x1080.jpg'),(1,'3353888.jpg'),(2,'restaurant_cafe_design_39235_1920x1080.jpg'),(2,'3353902.jpg'),(3,'syed-ahmad-kgjQ1AGDwE0-unsplash.jpg'),(3,'jazmin-quaynor-9Y8vxVQN4o4-unsplash.jpg'),(4,'adrien-olichon-BL7QItZuCDY-unsplash.jpg'),(4,'rod-long-WC7LeX79iEU-unsplash.jpg'),(5,'louis-hansel-wVoP_Q2Bg_A-unsplash.jpg'),(5,'jason-leung-poI7DelFiVA-unsplash.jpg');
/*!40000 ALTER TABLE `restaurant_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_CUSTOMER'),(2,'ROLE_OWNER'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favourite_restaurant`
--

DROP TABLE IF EXISTS `user_favourite_restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_favourite_restaurant` (
  `user_id` bigint(20) NOT NULL,
  `restaurant_id` bigint(20) NOT NULL,
  KEY `FKk5inq0ydf37dqeud7obo3akya` (`restaurant_id`),
  KEY `FK288f02c8rwnh8tlp0f7g1tu78` (`user_id`),
  CONSTRAINT `FK288f02c8rwnh8tlp0f7g1tu78` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKk5inq0ydf37dqeud7obo3akya` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favourite_restaurant`
--

LOCK TABLES `user_favourite_restaurant` WRITE;
/*!40000 ALTER TABLE `user_favourite_restaurant` DISABLE KEYS */;
INSERT INTO `user_favourite_restaurant` VALUES (2,3),(2,4),(8,1),(8,5);
/*!40000 ALTER TABLE `user_favourite_restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (2,1),(8,1),(1,3),(4,3),(5,3),(6,3),(7,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr53o2ojjw4fikudfnsuuga336` (`password`),
  UNIQUE KEY `UK9q63snka3mdh91as4io72espi` (`phone_number`),
  UNIQUE KEY `UKk8d0f2n7n88w1a16yhua64onx` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hla@gmail.com','$2a$10$geIAqHpgKppLh3qeWVNsTOlrZMhXJApEZipNnBW0J2Jo2HdhMw3ae','09327826326','HlaHlaWing'),(2,'tun@gmail.com','$2a$10$7sfEPW4rN9NfOaBKLkHhuOE34XTWHcltxRMzDw4MsAhmGIPgtts96','09823732','TunTun'),(3,'manung@gmail.com','$2a$10$n2KNTwSf7F7lyrmA0oPgLO/qisCpVSUVb.DZQINs5kiVs86hINRLu','0932772874','KoKoMaung'),(4,'ko@gmail.com','$2a$10$XfRWxGJV56e0VG.M6nG7huqFuReMUZsuAwylvRKbpiorDKsyaHqY6','0932728732','KoKo'),(5,'shew@gmail.com','$2a$10$pq.z9p416eWc9naumic6f.l40jCQBIzaHPcoeyuZ29kcn6hs6toiu','092783872','ShewYiOo'),(6,'nyi@gmail.com','$2a$10$HYq88jMGGwQA2/t50JiJzuEp3pJuMb.4n64tpdewWa3IR7n7Gmr76','097327823','NyiMinHtet'),(7,'myat@gmail.com','$2a$10$P7mzp/bdabE6PvGe7Gn1I.obyGMIuvlG/wl..W.6WcIOErqREMw4G','09732723','SoeMyatMyatHtun'),(8,'may@gmail.com','$2a$10$hSgmhiwuibdDJgQZYUsPdOsYDhv1zeeBI5Kq6La6N9qKFwdf3BSh6','093277277','MayThuZar');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_addresses`
--

DROP TABLE IF EXISTS `users_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_addresses` (
  `user_id` bigint(20) NOT NULL,
  `addresses_id` bigint(20) NOT NULL,
  UNIQUE KEY `UKfkg2t84ux3d2l2pg8atpsbljx` (`addresses_id`),
  KEY `FKrpoauh74gtrrvj9m8skx6vti1` (`user_id`),
  CONSTRAINT `FKe4noxx3lwcqyb2puartxil7g1` FOREIGN KEY (`addresses_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKrpoauh74gtrrvj9m8skx6vti1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_addresses`
--

LOCK TABLES `users_addresses` WRITE;
/*!40000 ALTER TABLE `users_addresses` DISABLE KEYS */;
INSERT INTO `users_addresses` VALUES (2,6),(2,7),(8,8),(8,9);
/*!40000 ALTER TABLE `users_addresses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-29 20:39:08
