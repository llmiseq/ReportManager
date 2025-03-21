-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 09:15 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reportmanager`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `raporty`
--

CREATE TABLE `raporty` (
  `id_raportu` int(11) NOT NULL,
  `roboty` varchar(255) NOT NULL,
  `urzadzenia` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `zmiana` tinyint(1) NOT NULL,
  `wiertacz` varchar(255) NOT NULL,
  `pomocnicy` varchar(255) NOT NULL,
  `tresc_raportu` varchar(5000) NOT NULL,
  `glebokosc` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `raporty`
--

INSERT INTO `raporty` (`id_raportu`, `roboty`, `urzadzenia`, `data`, `zmiana`, `wiertacz`, `pomocnicy`, `tresc_raportu`, `glebokosc`) VALUES
(1, 'OW+12', 'Simens C12', '2025-03-27', 2, 'fdsfds', 'dfsfdsdf', 'fdsfdsfdfdsfds', 321),
(2, 'OW+12', 'Bosch', '2025-03-17', 2, 'Jan Nowak', 'yerbhvcuygerw, vfdjhgrew', 'dsfjfyterwafvsdfghvuidyfabnvkjldyfugrehgfjdfhsjgfbnerwbfhjagewr', 243),
(3, 'OW+12546', 'Bosch', '2025-03-06', 1, 'vf', 'vcx', 'cvx', 453),
(4, 'OW+12', 'Bosch', '2025-03-12', 3, 'Jan Nowak', 'dsfjkyrfefygjdvbhuhgreghjgvc', 'jkdsfuerygfjfjhgdfjkgeuyrjhdf', 100),
(5, 'OW+12546', 'Bosch', '2025-03-19', 1, 'sda', 'sad', 'wqexz', 33),
(6, 'OW+12546', 'Bosch', '2025-03-27', 2, 'Jan Nowak', 'Jan Nowak, Adrian dsfkjhsdj', 'Treść: Czym jest Lorem Ipsum? Lorem Ipsum jest po prostu tekstem zastępczym w przemyśle poligraficznym i składzie tekstu. Lorem Ipsum jest standardowym tekstem zastępczym w przemyśle od lat 1500., kiedy nieznany drukarz wziął próbkę czcionek i pomieszał je, aby stworzyć książkę z próbkami czcionek. Przetrwał nie tylko pięć stuleci, ale także skok do elektronicznego składu tekstu, pozostając zasadniczo niezmieniony. Stał się popularny w latach 60. XX wieku wraz z wydaniem arkuszy Letraset zawierających fragmenty Lorem Ipsum, a ostatnio z oprogramowaniem do składu komputerowego, takim jak Aldus PageMaker, zawierającym wersje Lorem Ipsum. Dlaczego z tego korzystamy? Jest od dawna udowodnionym faktem, że czytelnik będzie rozproszony przez czytelną treść strony, gdy spojrzy na jej układ. Istotą używania Lorem Ipsum jest to, że ma on mniej więcej normalny rozkład liter, w przeciwieństwie do używania „Treść tutaj, treść tutaj”, co sprawia, że ​​wygląda jak czytelny angielski. Wiele pakietów do publikacji na komputerach stacjonarnych i edytorów stron internetowych używa teraz Lorem Ipsum jako domyślnego tekstu modelowego, a wyszukiwanie „lorem ipsum” ujawni wiele stron internetowych, które są jeszcze w powijakach. Różne wersje ewoluowały na przestrzeni lat, czasami przez przypadek, czasami celowo (wtrącony humor itp.). Skąd się to bierze? Wbrew powszechnemu przekonaniu Lorem Ipsum nie jest po prostu przypadkowym tekstem. Ma korzenie w klasycznej literaturze łacińskiej z 45 r. p.n.e., co oznacza, że ​​ma ponad 2000 lat. Richard McClintock, profesor łaciny w Hampden-Sydney College w Wirginii, wyszukał jedno z mniej znanych łacińskich słów, consectetur, w fragmencie Lorem Ipsum i przeglądając cytaty tego słowa w literaturze klasycznej, odkrył niewątpliwe źródło. Lorem Ipsum pochodzi z sekcji 1.10.32 i 1.10.33 „De Finibus Bonorum et Malorum” (Skrajności dobra i zła) Cycerona, napisanej w 45 r. p.n.e. Ta książka jest traktatem o teorii etyki, bardzo popularnym w okresie renesansu. Pierwszy wers Lorem Ipsum, „Lorem ipsum dolor sit amet..”, pochodzi z wersu w sekcji 1.10.32. Standardowy fragment Lorem Ipsum używany od XVI wieku jest reprodukowany poniżej dla zainteresowanych. Sekcje 1.10.32 i 1.10.33 z „de Finibus Bonorum et Malorum” Cycerona są również reprodukowane w ich dokładnej oryginalnej formie, wraz z angielskimi wersjami z tłumaczenia H. Rackhama z 1914 r.Treść: Czym jest Lorem Ipsum? Lorem Ipsum jest po prostu tekstem zastępczym w przemyśle poligraficznym i składzie tekstu. Lorem Ipsum jest standardowym tekstem zastępczym w przemyśle od lat 1500., kiedy nieznany drukarz wziął próbkę czcionek i pomieszał je, aby stworzyć książkę z próbkami czcionek. Przetrwał nie tylko pięć stuleci, ale także skok do elektronicznego składu tekstu, pozostając zasadniczo niezmieniony. Stał się popularny w latach 60. XX wieku wraz z wydaniem arkuszy Letraset zawierających fragmenty Lorem Ipsum, a ostatnio z oprogramowaniem do składu komputerowego, takim jak Aldus PageMaker, zawierającym wersje Lorem Ipsum. Dlaczego z tego korzystamy? Jest od dawna udowodnionym faktem, że czytelnik będzie rozproszony przez czytelną treść strony, gdy spojrzy na jej układ. Istotą używania Lorem Ipsum jest to, że ma on mniej więcej normalny rozkład liter, w przeciwieństwie do używania „Treść tutaj, treść tutaj”, co sprawia, że ​​wygląda jak czytelny angielski. Wiele pakietów do publikacji na komputerach stacjonarnych i edytorów stron internetowych używa teraz Lorem Ipsum jako domyślnego tekstu modelowego, a wyszukiwanie „lorem ipsum” ujawni wiele stron internetowych, które są jeszcze w powijakach. Różne wersje ewoluowały na przestrzeni lat, czasami przez przypadek, czasami celowo (wtrącony humor itp.). Skąd się to bierze? Wbrew powszechnemu przekonaniu Lorem Ipsum nie jest po prostu przypadkowym tekstem. Ma korzenie w klasycznej literaturze łacińskiej z 45 r. p.n.e., co oznacza, że ​​ma ponad 2000 lat. Richard McClintock, profesor łaciny w Hampden-Sydney College w Wirginii, wyszukał jedno z mniej znanych łacińskich słów, consectetur, w fragmencie Lorem Ipsum i przeglądając cytaty tego słowa w literaturze klasycznej, odkrył niewątpliwe źródło. Lorem Ipsum pochodzi z sekcji 1.10.32 i 1.10.33 „De Finibus Bonorum et Malorum” (Skrajności dobra i zła) Cycerona, napisanej w 45 r. p.n.e. Ta książka jest traktatem o teorii etyki, bardzo popularnym w okresie renesansu. Pierwszy wers Lorem Ipsum, „Lorem ipsum dolor sit amet..”, pochodzi z wersu w sekcji 1.10.32. Standardowy fragment Lorem Ipsum używany od XVI wieku jest reprodukowany poniżej dla zainteresowanych. Sekcje 1.10.32 i 1.10.33 z „de Finibus Bonorum et Malorum” Cycerona są również reprodukowane w ich dokładnej oryginalnej formie, wraz z angielskimi wersjami z tłumaczenia H. Rackhama z 1914 r.Treść: Czym jest Lorem Ipsum? Lorem Ipsum jest po prostu tekstem zastępczym w przemyśle poligraficznym i składzie tekstu. Lorem Ipsum jest standardowym tekstem zastępczym w przemyśle od lat 1500., kiedy nieznany druk', 3423),
(7, 'OW+12546', 'Bosch', '2025-03-15', 3, 'Jan Nowak', 'Robert Kozłowski, Alfred Bogucki, Marian Hoffman', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Z wyjątkiem sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 66),
(8, 'fdgdggf', 'Fujitsu AZD56Z', '2025-03-25', 2, 'sdfdsfsdf', 'dfsfsdf', 'fdsfsdfdsf', 435),
(9, 'fdgdggf', 'Simens C12', '2025-03-22', 2, 'Adam Kowalski', 'Michał Kowalski', 'asddsas', 300);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roboty`
--

CREATE TABLE `roboty` (
  `id_roboty` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `inwestor` varchar(255) NOT NULL,
  `data_kol` date DEFAULT NULL,
  `data_zak` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `roboty`
--

INSERT INTO `roboty` (`id_roboty`, `nazwa`, `inwestor`, `data_kol`, `data_zak`) VALUES
(1, 'OW+12', 'Aaaa', '2025-03-04', '0000-00-00'),
(2, 'OW+12546', 'Aaaa', '2025-03-04', '2025-03-07'),
(4, 'fdgdggf', 'fdgfgfdgfd', '2025-03-13', '2025-03-28');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `urzadzenia`
--

CREATE TABLE `urzadzenia` (
  `id_urzadzenia` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `urzadzenia`
--

INSERT INTO `urzadzenia` (`id_urzadzenia`, `nazwa`) VALUES
(1, 'Bosch'),
(4, 'Simens C12'),
(5, 'Fujitsu AZD56Z'),
(6, 'Simens F43'),
(9, 'Bosh 12D'),
(10, 'jgh'),
(11, 'ghj'),
(12, 'ghj');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `department` varchar(50) DEFAULT NULL,
  `administrator` tinyint(1) DEFAULT 0,
  `superAdministrator` tinyint(1) NOT NULL,
  `auditor` tinyint(1) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `department`, `administrator`, `superAdministrator`, `auditor`, `login`, `password`) VALUES
(1, 'adminit', 'adminit', '', 1, 0, 0, 'admin', 'admin'),
(2, 'user', 'user', NULL, 0, 0, 0, 'user', 'user'),
(3, 'u', 'u', '', 0, 1, 0, 'u', 'u'),
(4, 'ff', 'gg', 'ff', 0, 0, 0, 'ff', '$2y$10$ig2YOY.zrL2KMsFcBLlG3eydNmAJ47gB933w4CR5DQJ'),
(6, 'ui', 'ui', 'ui', 0, 0, 1, 'ui', 'ui');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `raporty`
--
ALTER TABLE `raporty`
  ADD PRIMARY KEY (`id_raportu`);

--
-- Indeksy dla tabeli `roboty`
--
ALTER TABLE `roboty`
  ADD PRIMARY KEY (`id_roboty`);

--
-- Indeksy dla tabeli `urzadzenia`
--
ALTER TABLE `urzadzenia`
  ADD PRIMARY KEY (`id_urzadzenia`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `raporty`
--
ALTER TABLE `raporty`
  MODIFY `id_raportu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `roboty`
--
ALTER TABLE `roboty`
  MODIFY `id_roboty` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `urzadzenia`
--
ALTER TABLE `urzadzenia`
  MODIFY `id_urzadzenia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
