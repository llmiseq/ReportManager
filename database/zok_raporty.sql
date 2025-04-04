-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2025 at 01:42 PM
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
-- Database: `zok_raporty`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `firmy`
--

CREATE TABLE `firmy` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `firmy`
--

INSERT INTO `firmy` (`id`, `nazwa`) VALUES
(1, 'ZOK'),
(2, 'ZSRG');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `oddzialy`
--

CREATE TABLE `oddzialy` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL,
  `firma` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `oddzialy`
--

INSERT INTO `oddzialy` (`id`, `nazwa`, `firma`) VALUES
(1, 'Jastrz-Bzie', 'ZOK'),
(2, 'Pniówek', 'ZOK'),
(3, 'Brzeszcze', 'ZOK'),
(4, 'Jankowice', 'ZSRG'),
(5, 'Budryk', 'ZSRG'),
(6, 'Chwałowice ', 'ZSRG'),
(7, 'OP-1', 'ZOK'),
(8, 'ccv', 'ZSRG'),
(9, 'ccc', 'ZSRG');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `raporty`
--

CREATE TABLE `raporty` (
  `id` int(11) NOT NULL,
  `firma` varchar(50) NOT NULL,
  `oddzial` varchar(50) NOT NULL,
  `wyrobisko` varchar(50) NOT NULL,
  `data` date NOT NULL,
  `zmiana` tinyint(1) NOT NULL,
  `tresc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `raporty`
--

INSERT INTO `raporty` (`id`, `firma`, `oddzial`, `wyrobisko`, `data`, `zmiana`, `tresc`) VALUES
(1, 'ZOK', 'Pniówek', 'ch. B-2 p. 404/3', '2025-04-03', 3, 'ddd'),
(2, 'ZOK', 'Brzeszcze', 'ch. went. ść. 913 nr 319 p. 364', '2025-04-03', 2, 'To jest treść'),
(3, 'ZOK', 'Pniówek', 'ch. B-2 p. 702/3', '2025-04-03', 4, 'test'),
(4, 'ZOK', 'Pniówek', 'poch. C-2 p. 404/4', '2025-04-03', 2, 'To jest treść: ZOK, Pniówek, poch. C-2 p. 404/4 03.04.2025 zm II'),
(5, 'ZOK', 'Pniówek', 'ch. W-6 p. 362/1', '2025-04-03', 4, 'To jest treśćv2'),
(6, 'ZSRG', 'Jankowice', 'ch. nadść. Z-9 p. 409/1', '2025-04-03', 1, 'TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST ');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id` int(50) NOT NULL,
  `imie` varchar(50) NOT NULL,
  `nazwisko` varchar(50) NOT NULL,
  `oddzial` varchar(50) NOT NULL,
  `firma` varchar(50) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `login` varchar(50) NOT NULL,
  `haslo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`id`, `imie`, `nazwisko`, `oddzial`, `firma`, `admin`, `login`, `haslo`) VALUES
(1, 'user', 'user', 'user', 'ZOK', 0, 'user', 'user'),
(2, 'admin', 'admin', 'admin', 'ZOK', 1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyrobiska`
--

CREATE TABLE `wyrobiska` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL,
  `nazwa_oddzialu` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `wyrobiska`
--

INSERT INTO `wyrobiska` (`id`, `nazwa`, `nazwa_oddzialu`) VALUES
(1, 'ch. B-2 p. 404/3', 'Pniówek'),
(2, 'ch. W-5 p. 363/5', 'Pniówek'),
(3, 'ch. W-6 p. 362/1', 'Pniówek'),
(4, 'poch. C-2 p. 404/4', 'Pniówek'),
(5, 'ch. went. ść. 913 nr 319 p. 364', 'Brzeszcze'),
(6, 'ch. went. ść. 07 nr 515 p. 510', 'Brzeszcze'),
(7, 'ch. nadść. Z-9 p. 409/1', 'Jankowice'),
(8, 'przec. bad. A-1 p. 405/1', 'Budryk'),
(9, 'ch. taśm. 1 P1 p. 408/1', 'Chwałowice'),
(10, 'test', 'Jastrz-Bzie'),
(11, 'ch. 812/4', 'Jastrz-Bzie');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `firmy`
--
ALTER TABLE `firmy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `oddzialy`
--
ALTER TABLE `oddzialy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `raporty`
--
ALTER TABLE `raporty`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `wyrobiska`
--
ALTER TABLE `wyrobiska`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `firmy`
--
ALTER TABLE `firmy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `oddzialy`
--
ALTER TABLE `oddzialy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `raporty`
--
ALTER TABLE `raporty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wyrobiska`
--
ALTER TABLE `wyrobiska`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
