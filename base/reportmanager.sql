-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2025 at 08:39 PM
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
(1, 'OW+12', 'Bosch', '2025-03-27', 2, 'asdasd', 'dsad', 'dsa', 23);

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
(2, 'OW+12546', 'Aaaa', '2025-03-04', '2025-03-07');

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
(1, 'Bosch');

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
(3, 'u', 'u', '', 0, 1, 0, 'u', 'u');

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
  MODIFY `id_raportu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roboty`
--
ALTER TABLE `roboty`
  MODIFY `id_roboty` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `urzadzenia`
--
ALTER TABLE `urzadzenia`
  MODIFY `id_urzadzenia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
