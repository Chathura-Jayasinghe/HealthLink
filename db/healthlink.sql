-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2023 at 09:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
('2b0de98a-53c9-4df3-84df-787c1bb081cc', NULL, '2', '19:35:00', '2023-08-30'),
('456c888a-bc2e-4768-a254-6e09b12bb32f', '8f3bad717ebc914904f05ccf952e254e89a87a546fdb9e4dea7e75d6a8e8f1e9', '2', '23:28:00', '2023-08-24'),
('ab9c5c46-e03d-4d43-a0d8-79f301cf7649', NULL, '1', '19:35:00', '2023-09-07'),
('aba423f7-5d52-485d-bd91-cbb9b893b9fe', NULL, '1', '07:36:00', '2023-09-07'),
('e143bc5a-ac5a-4e72-b3d2-de92199f3291', NULL, '1', '08:38:00', '2023-09-06'),
('9207398e-0274-490d-801a-f79ac35bb1aa', '8f3bad717ebc914904f05ccf952e254e89a87a546fdb9e4dea7e75d6a8e8f1e9', '2', '14:22:00', '2023-07-30'),
('13235454-148c-4f68-af5f-4865ccec81cb', '8f3bad717ebc914904f05ccf952e254e89a87a546fdb9e4dea7e75d6a8e8f1e9', '1', '00:00:00', '0000-00-00'),
('95617a75-f6c8-4ce5-bede-49c0f61dac4c', '8f3bad717ebc914904f05ccf952e254e89a87a546fdb9e4dea7e75d6a8e8f1e9', '2', '09:09:00', '2023-09-12');

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
('1', 'kavindu', 'kavindu@gmail.com', '0761747447', 'katubadda', '12', 'Common', 'doctor'),
('2', 'damsith', 'damsith@gmail.com', NULL, 'mawanella', '12', 'Common', 'doctor'),
('64b974fe-2c7f-4cb5-a4a9-279a1930742f', 'bandara', 'bandara2@gmail.com', '07712345567', 'kandy', '12', 'Common', 'doctor'),
('a9c4bf72-bd4f-40e1-bc3d-1c6e27b2a6bf', 'doctor', 'doctor@gmail.com', '+94761747447', 'kandy', '12', 'Brain-Cerebellum', 'doctor');

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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
