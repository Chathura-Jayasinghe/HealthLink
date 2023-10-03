-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2023 at 05:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthlink`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `role`) VALUES
('1', 'admin@gmail.com', '12', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` varchar(200) NOT NULL,
  `user_id` varchar(200) DEFAULT NULL,
  `doctor_id` varchar(200) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `user_id`, `doctor_id`, `time`, `date`) VALUES
('2257145b-9d08-42e7-bdd2-a20483f33c28', '55d7cd00de4b1e748eb3bda6e633e915e79340506ccba0e04011bd269c98bf0d', '55662b21-8689-40d2-9bda-28ace73212ae', '12:18:00', '2023-09-13'),
('a96fc657-97ad-403e-9ba3-4f8072f14864', '55d7cd00de4b1e748eb3bda6e633e915e79340506ccba0e04011bd269c98bf0d', 'eef5d1a7-9ac4-4033-a11e-6fa3afc1a4d6', '22:19:00', '2023-09-22'),
('8a519d6b-25e9-4a0f-a88b-17ab9d58c306', '55d7cd00de4b1e748eb3bda6e633e915e79340506ccba0e04011bd269c98bf0d', 'eef5d1a7-9ac4-4033-a11e-6fa3afc1a4d6', '01:19:00', '2023-09-13');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` varchar(200) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `place` varchar(150) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `specialize` varchar(200) NOT NULL DEFAULT 'Common',
  `role` varchar(10) NOT NULL DEFAULT 'doctor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `name`, `email`, `phone`, `place`, `password`, `specialize`, `role`) VALUES
('55662b21-8689-40d2-9bda-28ace73212ae', 'Chathura Jayasinghe', 'chathurajayasinghe@gmail.com', '94704934655', 'Panadura', '12', 'Common', 'doctor'),
('863d6da6-9c48-4bcc-9608-2d2928dcedff', 'Pasindu Nimsara', 'Numsara@gmail.com', '94704934655', 'Asmadala', '12', 'Ophthalmologist', 'doctor'),
('ca039564-1f92-47e3-8130-916863b8c32b', 'Sachira Munasinghe', 'sachiramunasinghe@gmail.com', '94704934655', 'kandy', '12', 'Neurologist', 'doctor'),
('e22fa581-5aa9-4ca1-980b-e6d86b0676e4', 'Pasindu Kulasinghe', 'pasindu@gmail.com', '94704934655', 'Mawanella', '12', 'Psychiatrist', 'doctor'),
('eef5d1a7-9ac4-4033-a11e-6fa3afc1a4d6', 'doctor', 'doctor@gmail.com', '94704934655', 'kandy', '12', 'Neurologist', 'doctor'),
('f4f53f61-02dd-4e17-a33a-4eb7a11915ae', 'Malitha Prabhashana', 'malithaprabhashana@gmail.com', '94704934655', 'kegalle', '12', 'Neurologist', 'doctor'),
('fbc30083-70b5-4f39-ba41-f2b3453775a8', 'kaivndu damsith', 'thilakarathnakdb.21@uom.lk', '+94761747447', 'kandy', '12', 'Common', 'doctor');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(20) NOT NULL,
  `user_id` varchar(200) NOT NULL,
  `doctor_id` varchar(200) NOT NULL,
  `appointment_id` varchar(200) NOT NULL,
  `age` varchar(30) NOT NULL,
  `disease` varchar(100) NOT NULL,
  `condition_level` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `user_id`, `doctor_id`, `appointment_id`, `age`, `disease`, `condition_level`, `description`, `time`) VALUES
(1, '55d7cd00de4b1e748eb3bda6e633e915e79340506ccba0e04011bd269c98bf0d', 'eef5d1a7-9ac4-4033-a11e-6fa3afc1a4d6', 'a96fc657-97ad-403e-9ba3-4f8072f14864', '22', 'Fever', 'medium', 'description test', '2023-09-30 05:31:35'),
(2, '55d7cd00de4b1e748eb3bda6e633e915e79340506ccba0e04011bd269c98bf0d', 'eef5d1a7-9ac4-4033-a11e-6fa3afc1a4d6', 'a96fc657-97ad-403e-9ba3-4f8072f14864', '22', 'Fever', 'medium', 'description test', '2023-09-30 05:31:35');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(200) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `birth_date` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `address`, `birth_date`, `role`, `password`) VALUES
('2617ca51715b8d22375bf35c9a104672e28eceb0fc49f3586bb315fab61b0c18', 'kaivndu damsith', '4thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$tPVVmQ6y5ToC9DrTjyqqzumcLbFXQtbZUOQjnXhzUH/21MuAoYKI.'),
('270e5049c7b0cc36d592b619770ea70cb93230aa4a0f162ee571bb8202d8b238', 'kaivndu damsith', '5thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$bFcGEv4wbGNwF7fodsCi0O11EAUUXsrlblqfoXk7yO4SEaJ3C2vaK'),
('4cfbd6dbfd9548d16aac451fa29675f81e3d86916f389e7ff11311569dc6c392', 'kaivndu damsith', '3thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$XGDRk7PywH8T7paZPrYo9eVoVzp3MEBchWWpLH30S0GfmH.k0Xs1K'),
('5496111dc6ce59c58a7a3392be6fe871cb01385b55775697cf24625cd089379b', 'kaivndu damsith', '6thilakarathnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-08-30', 'user', '$2a$10$UmCPZmcwJpF4wvE6zn/9..1yJqCgH8EC7yzqZlerqP1YTn7sjfVby'),
('55d7cd00de4b1e748eb3bda6e633e915e79340506ccba0e04011bd269c98bf0d', 'Devinda Nimesh', 'devindanimesh@gmail.com', '0704934655', 'Mahawaththa ,lewke ,galathara', '2003-06-18', 'user', '$2a$10$SAMkSHEzLgG0EdTdpRnv1.Ft2YOscqUi7roNHZqoCoMLMrE..PL56'),
('59b9b278e8f17d8fb4c4b2e343f9800dcae7990c2e4930c79e25499fbbd6ab73', 'kaivndu damsith', '6thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$m1aMLjdrA96Ay5tA3MKoTuEu3JM8j9feLCVLN5imd2dmTvvWLaCN.'),
('6cd4945332846e74b11d36f6618568548fcb6cd146683428f505c96791cde248', 'kaivndu damsith', '7thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$poEAKc7VUricq2YObfyiPuaAXwRtksgWOa1VKpgaAK/GCGccPBZsy'),
('85e7af252d7b86013bb5b43de0accc0ec9f7494140c2a3491ed18812957280ed', 'kaivndu damsith', '2thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$x.CwMMRdywqm21/Bjs4RCOVGAc50/id02lyY9CQ9eSfLj0gl4jomm'),
('8f3bad717ebc914904f05ccf952e254e89a87a546fdb9e4dea7e75d6a8e8f1e9', 'kaivndu damsith', 'thilakarathnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$qNOkT4u8umd5Q4o3ujxA5.UgujY/wNI6LFDstr0bMY72keo50MDxa'),
('acc66d67d48bb3b44c614699d5d94d593b5254d7338c2e1129eb632f65a84191', 'kaivndu damsith', 'thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$a/z.nsq.pbzMI/vjG/gmredw3ZyTtdkhdmiaHUgWmFkyWtevSjYLW'),
('d38cb146693bad0a462845e743b437495dbf9aaca05ade0f65563d9066649aeb', 'kaivndu damsith', '1thilakaratsddhnakdb.21@uom.lk', '+94761747447', 'Mahawaththa ,lewke ,galathara', '2023-09-08', 'user', '$2a$10$OXecYc5mnL5AUvHDMAVgzeFIZiGHZRhrgPFZb2dGvRQuoW6Nbfq1K');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
