SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `vk0ju44t2gljpobs`;
--
-- Table structure for table `restaurant`
---
CREATE TABLE `restaurant` (
  `restaurantId` mediumint(9) NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `image` mediumblob,
  `location` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `hours_operation` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pickup` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `delivery` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `deliveryId` mediumint(9) NOT NULL,
  `description` varchar(400) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `restaurants`
--

-- --------------------------------------------------------
INSERT INTO `restaurant` (`restaurantId`, `name`, `location`, `hours_operation`,`category`,`pickup`,`delivery`,`deliveryId`,`description`) VALUES
(1, 'KFC','3134 Del Monte Blvd Ave, Marina, CA 93933', 'Monday - Sunday 11AM - 9PM','Wings','Y','Y',4,'KFC is an American fast food restaurant chain headquartered in Louisville, Kentucky, that specializes in fried chicken. It is the worlds second-largest restaurant chain after McDonalds.'),
(2, 'Taco Bell','1830 Fremont Blvd, Seaside, CA 93955','Monday - Sunday, 10AM - 12AM','Mexican','Y','Y',3,'Taco Bell is an American chain of fast food restaurants based in Irvine, California. The restaurants serve a variety of Mexican and Tex-Mex foods that include tacos, burritos, quesadillas, and nachos.'),
(3, 'Dominos Pizza','265 Reservation Rd Ste Q, Marina, CA 93933','Sunday - Thursday 11AM-12AM<br>Friday,Saturday 11AM - 1AM','Pizza','Y','Y',9,'Dominos Pizza is a delivery and carryout chain offering a wide range of pizzas amd a variety of other dishes and sides.'),
(4, 'Pizza Hut','1772 Fremont Blvd A, Seaside, CA 93955','Sunday - Thursday 9:30AM - 11PM<br> Friday, Saturday 9:30AM - 12AM','Pizza','Y','Y',10,'Pizza Hut is known for its Italian American cuisine menu, including pizza and pasta, as well as side dishes and desserts.'),
(5, 'Little Caesars','1760 Fremont Blvd, Seaside, CA 93955','Monday - Sunday 11AM - 9PM','Pizza','Y','Y',12,'Little Caesars is the third-largest pizza chain in the United States, behind Pizza Hut and Dominos Pizza.'),
(6, 'Wendys','1180 Fremont Blvd, Seaside, CA 93955','Monday - Sunday 6:30AM - 12AM','Burgers','Y','Y',5,'Wendys is an international fast food restaurant chain.'),
(7, 'Chipotle','140 General Stilwell Dr #106, Marina, CA 93933','Monday - Sunday 10:45AM - 10PM','Mexican','Y','N',14,'Chipotle is specializing in tacos and Mission-style burritos.'),
(8, 'Shake Shack','691 8th Ave, New York, NY 10036','Monday - Sunday 10:30AM - 12AM','Burgers','Y','N',17,'Shake Shack is a modern day version of a roadside burger stand serving delicious burgers, chicken, hot dogs, shakes, frozen custard, beer, wine & more.'),
(9, '101 Asian Kitchen','7170 Beverly Blvd, Los Angeles, CA 90036','Monday - Sunday, 3:00 PM - 1:00 AM','Asian','Y','Y',18,'101 Asian Kitchen is a casual strip-mall restaurant preparing Chinese standards along with sushi & Hawaiian-inspired fare.'),
(10, 'Applebees','1301 N Davis Rd, Salinas, CA 93907','Sunday - Thursday 11AM - 9PM<br>Friday, Saturday 11AM - 10PM','Burgers','Y','Y',19,'Applebees is American casual dining, classic drinks and local drafts.'),
(11, 'Cheesecake Dreamations','265 Reservation Rd., Marina, CA 93933','Tuesday-Friday 11:00 AM - 8:00 PM<br>Saturday, Sunday 3:00 PM - 8:00 PM','Dessert','Y','Y',20,'Cheesecake Dreamations are a Cheesecake shop specializing in mini cheesecakes. They also have deep Fried Cheesecakes, CheeseShakes & Loaded Baked Potatoes. You can also pre-order 2” minis, 4” or 6” Teasecakes or full 9” Cheesecakes.'),
(12,'DTLA Ramen','952 S Broadway St, Los Angeles', 'Sunday 12–10PM <br> Monday-Thursday 11:30AM–11PM<br> Friday 11:30AM–1AM<br>Saturday 12PM–1AM','Asian','Y','Y',16,'DTLA Ramen is a Japanese Ramen restaurant with a California spin.'),
(13, 'Mahalo!','1376 9th Ave, San Francisco, CA, 94122','Monday - Sunday 9AM - )PM','Hawaiian','Y','Y',6,'Mahalo! is a basic outpost offering Hawaiian breakfast & lunch dishes & specializing in spam-focused menu items.'),
(14,'Poke Bar','130 General Stilwell Dr Suite #106, Marina, CA 93933','Monday - Sunday 10:45AM - 6PM','Hawaiian','Y','N',8,'Poke Bar is a Hawaiian restaurant located in the Marina area.'),
(15,'Lees Garden Chinese Restaurant','215 Reservation Rd # A, Marina, CA 93933','Sunday - Thursday 11:30AM - 3PM, 4PM -9PM<br>Friday,Saturday 11:30AM - 3PM, 4PM -10PM','Asian','Y','Y',7,'Lees Garden Chinese Restaurant is a Chinese restaurant located in the Marina area.'),
(16,'Buffalo Wild Wings','1553 Fremont Blvd D3, Seaside, CA 93955','Monday - Sunday 11AM - 9PM','Wings','Y','Y',1,'Buffalo Wild Wings is an American casual dining restaurant and sports bar. It is mostly known for their wings.'),
(17,'The Bagel Bakery','452 Alvarado St, Monterey, CA 93940','Monday - Friday 6AM - 5PM<br> Saturday, Sunday 7AM - 4PM','Breakfast','Y','Y',2,'The bagel bakery builds their whole menu around bagels and offers bagel options for breakfast, lunch and dinner.'),
(18,'Papa Johns','Presidio Of Monterey Exchange Building #660, Unit 5, Monterey, CA 93940','Sunday - Thursday 10AM - 9:45PM<br>Friday, Saturday 10AM - 10:45PM','Pizza','Y','Y',11,'Papa Johns is the fourth largest pizza delivery restaurant chain in the United States.'),
(19,'Burger King','200 Reservation Rd, Marina, CA 93933','Monday - Sunday 7AM - 11PM','Burgers','Y','Y',13,'Burger King is an American multinational chain of hamburger fast food restaurants.'),
(20,'Dennys','110 Reservation Rd, Marina, CA 93933','Monday - Sunday 7:30AM - 10PM','Breakfast','Y','Y',15,'Dennys is a table service diner-style restaurant chain.');

ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurantId`);

ALTER TABLE `restaurant`
  MODIFY `restaurantId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `deliveryId` mediumint(9) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(450) COLLATE utf8_unicode_ci NOT NULL,
  `image` mediumblob,
  `link` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `delivery`
--

-- --------------------------------------------------------
INSERT INTO `delivery` (`deliveryId`, `name`, `description`, `link`) VALUES
(1, 'Doordash','Doordash is an on-demand restaurant delivery service that get deliver breakfast, lunch, and dinner from your favorite restaurants. They even deliver alcoholic beverages from restaurants, stores, and breweries.','https://www.doordash.com/en-US'),
(2, 'Uber Eats','Uber Eats is a food ordering and delivery service that you can use your Uber account for to get great options from nearby restaurants (chain and local).','https://www.ubereats.com/'),
(3, 'GrubHub','GrubHub offers food delivery and restaurant takeout from over 50,000 restaurants in 1,100+ cities. Just choose your desired cuisine and from there you’ll see restaurants and menus from amazing restaurants. Then just with a tap, you can get your food delivered straight to you.','https://www.grubhub.com/'),
(4, 'Seamless','Seamless offers a simple way to order food for delivery or takeout from thousands of places and menus in your neighborhood. You can even get access to discounts and deals on some of your delivery favorites.','https://www.seamless.com/'),
(5, 'Postmates','Postmates makes it possible to get food, groceries, and even alcohol delivered to you from over 100,00 retail shops, grocery stores, and restaurants, and more. They offer Postmates Unlimited which for $9.99 a month, you can get a $0 delivery fee on all orders over $20.','https://postmates.com/'),
(6, 'Delivery.com','Delivery.com helps you find local favorite and discover new ones with this app and website. And if there’s one thing that separates Delivery.com from the rest, it’s the fact that they delivery food, alcohol, groceries, gifts, and laundry. You can earn Delivery Points with every purchase and cash them in for free credit and other rewards.','https://www.delivery.com/'),
(7, 'Eat 24','Get easy access to thousands of local restaurants and favorites delivered straight to your door. They are now powered by GrubHub.','https://www.eat24.com/'),
(8, 'ChowNow', 'ChowNow works with restaurants to provide digital tools that can work directly from their own websites, while appealing directly to customers through its own app that allows you to order from many different restaurants in one place. The app lets you search for available restaurants in your area or browse based on the type of food you want.','https://eat.chownow.com/discover/'),
(9, 'Domino’s Pizza Delivery', 'Domino’s Pizza is an international pizza restaurant chain that operates over 10,000 restaurants. It is the second largest pizza restaurant chain in United States and the largest internationally. They have their own delivery service, including contactless delivery.','https://www.dominos.com/en/'),
(10, 'Pizza Hut Delivery','Pizza Hut still has their food available by ordering online for delivery. Pizza Hut has incredible deals going on, like the Big Dipper pizza for $12.99, as well as the large 3-topping pizza for just $10. And if you want contactless delivery, just drop a note for the delivery driver online before you place your order.','https://www.pizzahut.com/index.php?f=change&zip=del#/localize//'),
(11, 'Papa John’s Delivery', 'Papa John’s (officially known as Papa John’s Pizza) is a fast food pizza restaurant that offers delivery and take-out services. They are the third largest pizza chain in the United States. Papa John’s prices are comparable to those of its two largest competitors, Domino’s and Pizza Hut.', 'https://www.papajohns.com/'),
(12, 'Little Caesars Delivery','Although some Little Caesars restaurants offer delivery services, they focus more on carryout. The restaurant offers less choices on their menu than the competition, which is how they can afford to keep their prices so low.','https://littlecaesars.com/en-us/menu/'),
(13, 'Burger King Delivery','Burger King is making headlines for their current delivery deals and freebies, for example offering customers free delivery on all orders placed on the Burger King app that are $10 or more. Burger King wants to help customers by offering two free kids meals with the purchase of an adult’s meal. Customers need to place orders on the mobile app or online and can redeem this offer once a day.','https://www.bk.com/store-locator/address'),
(14, 'Chipotle Delivery','Chipotle is offering free delivery every single day in March when you spend $10 or more on your order. Redeem this offer on chipotle.com or the mobile app and place your order. The deal will automatically be applied at checkout.','https://chipotle.com/'),
(15, 'Denny’s Delivery','Order a real breakfast from Denny’s (they also serve lunch and dinner). The diner is offering free delivery until April 30 when you spend at least five bucks on your order. Order from the Denny’s website or app.','https://order.dennys.com/locations'),
(16, 'Caviar','Square’s Caviar app brings you food from a selection of local restaurants, with real-time GPS tracking for deliveries as well as pickup. Caviar offers a number of in-app exclusive deals, and it focuses less on fast food compared with other apps. Instead, Caviar emphasizes other types of restaurants, and it lets you leave instructions for no-contact delivery when you checkout for your order.','https://www.trycaviar.com/'),
(17, 'Goldbelly', 'Goldbelly is a curated online marketplace for regional and artisanal foods crafted by local food purveyors throughout the United States. Other than most delivery services, you can order from towns further away from your location and get the delivery after a few days.', ''),
(18, 'MenuPages', 'MenuPages offers restaurant search by location. An interesting difference is that MenuPages shows the hours of operation for pickup and delivery separately.', 'https://menupages.com/'),
(19, 'Applebees', 'Applebee’s is another restaurant offering free delivery for the foreseeable future. To take advantage of the offer, order your meal on the restaurant’s website or mobile app. They are also offering contactless delivery.', 'https://www.applebees.com/en'),
(20, 'Doorbell Dining', 'Doorbell Dining is Californias premiere restaurant marketing firm. They currently coordinate deliveries for over 120 restaurants throughout the Monterey, Salinas, Santa Cruz, and South Bay. They specialize in corporate meal solutions, event catering and arranging residential delivery.', 'https://www.doorbelldining.com/');


ALTER TABLE `delivery`
  ADD PRIMARY KEY (`deliveryId`);

ALTER TABLE `delivery`
  MODIFY `deliveryId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
	`userId` tinyint(2) NOT NULL,
	`username` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
	`password` varchar(72) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `users`
  MODIFY `userId` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

--
-- Dumping data for table `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
CREATE TABLE `rating` (
	`ratingId` mediumint(9) NOT NULL,
    `rating` int(5) DEFAULT NULL,
	`comment` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
    `serviceId` mediumint(9) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `rating`
  ADD PRIMARY KEY (`ratingId`);

ALTER TABLE `rating`
  MODIFY `ratingId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

--
-- Dumping data for table `users`
--