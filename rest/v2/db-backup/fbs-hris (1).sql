-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2024 at 09:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fbs-hris`
--

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_client`
--

CREATE TABLE `fbs_hris_client` (
  `client_aid` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_is_active` tinyint(1) NOT NULL,
  `client_created` varchar(20) NOT NULL,
  `client_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_client`
--

INSERT INTO `fbs_hris_client` (`client_aid`, `client_name`, `client_is_active`, `client_created`, `client_datetime`) VALUES
(1, 'Frontline Business Solutions', 1, '2024-07-05 10:25:37', '2024-07-05 10:25:58');

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_company`
--

CREATE TABLE `fbs_hris_company` (
  `company_aid` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `company_email` varchar(50) NOT NULL,
  `company_phone` int(20) NOT NULL,
  `company_street` varchar(100) NOT NULL,
  `company_city` varchar(100) NOT NULL,
  `company_province` varchar(100) NOT NULL,
  `company_postal` int(20) NOT NULL,
  `company_country` varchar(100) NOT NULL,
  `company_background` varchar(200) NOT NULL,
  `company_submenu` varchar(200) NOT NULL,
  `company_accent` varchar(200) NOT NULL,
  `company_logo` varchar(100) NOT NULL,
  `company_created` varchar(20) NOT NULL,
  `company_is_active` tinyint(1) NOT NULL,
  `company_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_company`
--

INSERT INTO `fbs_hris_company` (`company_aid`, `company_name`, `company_email`, `company_phone`, `company_street`, `company_city`, `company_province`, `company_postal`, `company_country`, `company_background`, `company_submenu`, `company_accent`, `company_logo`, `company_created`, `company_is_active`, `company_datetime`) VALUES
(1, 'STI College San Pablo', 'sti@edu.ph', 9343434, 'Lopez Jaena', 'San Pablo City', 'Laguna', 4000, 'Philippines', 'sdfsdf', 'nhfh', 'aaaaa', 'vvvvvv', '2024-07-01 09:52:28', 1, '2024-07-05 14:12:12');

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_departments`
--

CREATE TABLE `fbs_hris_departments` (
  `department_aid` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `department_is_active` tinyint(1) NOT NULL,
  `department_created` varchar(20) NOT NULL,
  `department_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_departments`
--

INSERT INTO `fbs_hris_departments` (`department_aid`, `department_name`, `department_is_active`, `department_created`, `department_datetime`) VALUES
(36, 'Web', 1, '2024-07-02 15:00:32', '2024-07-04 14:30:23'),
(37, 'aaaaaaaa2222', 1, '2024-07-02 15:04:21', '2024-07-10 14:42:34'),
(38, 'bbbbbbb', 1, '2024-07-03 07:37:27', '2024-07-04 14:27:25'),
(39, 'ccccccccc', 1, '2024-07-03 07:46:06', '2024-07-04 14:27:34'),
(40, 'dddddddd', 1, '2024-07-03 07:46:20', '2024-07-04 14:27:40'),
(41, 'asasa', 0, '2024-07-03 07:47:41', '2024-07-03 09:29:27'),
(42, 'eeeeee', 1, '2024-07-03 07:48:49', '2024-07-04 14:27:49'),
(43, 'tttttttt', 1, '2024-07-03 07:49:55', '2024-07-03 08:04:52'),
(46, 'asdas', 0, '2024-07-03 07:52:52', '2024-07-03 14:17:19'),
(56, 'asdasd', 0, '2024-07-03 08:21:36', '2024-07-04 14:29:28'),
(57, 'sdsdsd', 0, '2024-07-03 08:21:52', '2024-07-04 14:29:21'),
(58, 'sdsd', 0, '2024-07-03 08:22:01', '2024-07-04 14:29:24'),
(65, 'louren3', 1, '2024-07-03 09:10:02', '2024-07-03 09:10:02'),
(66, 'louren4', 1, '2024-07-03 09:10:53', '2024-07-03 09:10:53');

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_employees`
--

CREATE TABLE `fbs_hris_employees` (
  `employees_aid` int(11) NOT NULL,
  `employees_fname` varchar(100) NOT NULL,
  `employees_lname` varchar(100) NOT NULL,
  `employees_job_title_id` varchar(50) NOT NULL,
  `employees_department_id` varchar(50) NOT NULL,
  `employees_is_active` tinyint(1) NOT NULL,
  `employees_created` varchar(20) NOT NULL,
  `employees_datetime` varchar(20) NOT NULL,
  `employees_client_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_employees`
--

INSERT INTO `fbs_hris_employees` (`employees_aid`, `employees_fname`, `employees_lname`, `employees_job_title_id`, `employees_department_id`, `employees_is_active`, `employees_created`, `employees_datetime`, `employees_client_id`) VALUES
(1, 'yyyy', 'yyy', '28', '', 1, '2024-07-09 12:26:28', '2024-07-09 13:31:09', ''),
(2, 'ttt', 'ttt', '', '36', 1, '2024-07-09 12:29:07', '2024-07-09 13:59:40', '');

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_employees_info`
--

CREATE TABLE `fbs_hris_employees_info` (
  `employees_info_aid` int(11) NOT NULL,
  `employees_info_is_active` tinyint(1) NOT NULL,
  `employees_info_employees_id` int(11) NOT NULL,
  `employees_info_fname` varchar(100) NOT NULL,
  `employees_info_lname` varchar(100) NOT NULL,
  `employees_info_telephone` varchar(20) NOT NULL,
  `employees_info_email` varchar(100) NOT NULL,
  `employees_info_address` text NOT NULL,
  `employees_info_datetime` varchar(20) NOT NULL,
  `employees_info_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_employees_info`
--

INSERT INTO `fbs_hris_employees_info` (`employees_info_aid`, `employees_info_is_active`, `employees_info_employees_id`, `employees_info_fname`, `employees_info_lname`, `employees_info_telephone`, `employees_info_email`, `employees_info_address`, `employees_info_datetime`, `employees_info_created`) VALUES
(1, 1, 1, '', '', '', '', '', '2024-07-09 12:26:28', '2024-07-09 12:26:28'),
(2, 1, 2, '', '', '', '', '', '2024-07-09 12:29:07', '2024-07-09 12:29:07');

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_job_level`
--

CREATE TABLE `fbs_hris_job_level` (
  `job_level_aid` int(11) NOT NULL,
  `job_level_level` varchar(100) NOT NULL,
  `job_level_is_active` tinyint(1) NOT NULL,
  `job_level_created` varchar(20) NOT NULL,
  `job_level_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_job_level`
--

INSERT INTO `fbs_hris_job_level` (`job_level_aid`, `job_level_level`, `job_level_is_active`, `job_level_created`, `job_level_datetime`) VALUES
(2, 'Entry Level', 1, '2024-07-01 14:54:21', '2024-07-04 14:37:09'),
(5, 'Executive-Level', 1, '2024-07-02 09:50:36', '2024-07-04 14:38:23'),
(7, 'Mid-Level', 1, '2024-07-02 09:31:33', '2024-07-04 14:37:58'),
(15, 'Senior-Level', 1, '2024-07-03 08:46:25', '2024-07-04 14:38:08'),
(16, 'Board of Directors', 1, '2024-07-04 14:38:35', '2024-07-04 15:04:00'),
(17, 'CEO', 1, '2024-07-10 08:15:06', '2024-07-10 08:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_job_title`
--

CREATE TABLE `fbs_hris_job_title` (
  `job_title_aid` int(11) NOT NULL,
  `job_title_job_level_id` varchar(100) NOT NULL,
  `job_title_name` varchar(100) NOT NULL,
  `job_title_is_active` tinyint(1) NOT NULL,
  `job_title_created` varchar(20) NOT NULL,
  `job_title_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_job_title`
--

INSERT INTO `fbs_hris_job_title` (`job_title_aid`, `job_title_job_level_id`, `job_title_name`, `job_title_is_active`, `job_title_created`, `job_title_datetime`) VALUES
(28, '5', 'Vice President', 1, '2024-07-04 14:39:46', '2024-07-04 14:39:46'),
(29, '2', 'Intern', 1, '2024-07-04 14:40:17', '2024-07-04 14:40:17'),
(30, '7', 'Senior Analyst', 1, '2024-07-04 14:40:39', '2024-07-04 14:40:39'),
(31, '5', 'jklbnjkl', 0, '2024-07-04 15:01:42', '2024-07-09 13:07:58');

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_leave_benefits`
--

CREATE TABLE `fbs_hris_leave_benefits` (
  `leave_benefits_aid` int(11) NOT NULL,
  `leave_benefits_job_level_id` int(11) NOT NULL,
  `leave_benefits_job_title_id` int(11) NOT NULL,
  `leave_benefits_leave_type_id` int(11) NOT NULL,
  `leave_benefits_days` int(11) NOT NULL,
  `leave_benefits_is_active` tinyint(1) NOT NULL,
  `leave_benefits_created` varchar(20) NOT NULL,
  `leave_benefits_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fbs_hris_leave_type`
--

CREATE TABLE `fbs_hris_leave_type` (
  `leave_type_aid` int(11) NOT NULL,
  `leave_type_name` varchar(100) NOT NULL,
  `leave_type_is_active` tinyint(1) NOT NULL,
  `leave_type_created` varchar(20) NOT NULL,
  `leave_type_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fbs_hris_leave_type`
--

INSERT INTO `fbs_hris_leave_type` (`leave_type_aid`, `leave_type_name`, `leave_type_is_active`, `leave_type_created`, `leave_type_datetime`) VALUES
(1, 'Birthday Leave', 1, '2024-07-10 09:43:46', '2024-07-10 09:58:26'),
(3, 'Sick Leave', 1, '2024-07-10 14:08:01', '2024-07-10 14:08:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fbs_hris_client`
--
ALTER TABLE `fbs_hris_client`
  ADD PRIMARY KEY (`client_aid`);

--
-- Indexes for table `fbs_hris_company`
--
ALTER TABLE `fbs_hris_company`
  ADD PRIMARY KEY (`company_aid`);

--
-- Indexes for table `fbs_hris_departments`
--
ALTER TABLE `fbs_hris_departments`
  ADD PRIMARY KEY (`department_aid`);

--
-- Indexes for table `fbs_hris_employees`
--
ALTER TABLE `fbs_hris_employees`
  ADD PRIMARY KEY (`employees_aid`);

--
-- Indexes for table `fbs_hris_employees_info`
--
ALTER TABLE `fbs_hris_employees_info`
  ADD PRIMARY KEY (`employees_info_aid`);

--
-- Indexes for table `fbs_hris_job_level`
--
ALTER TABLE `fbs_hris_job_level`
  ADD PRIMARY KEY (`job_level_aid`);

--
-- Indexes for table `fbs_hris_job_title`
--
ALTER TABLE `fbs_hris_job_title`
  ADD PRIMARY KEY (`job_title_aid`);

--
-- Indexes for table `fbs_hris_leave_benefits`
--
ALTER TABLE `fbs_hris_leave_benefits`
  ADD PRIMARY KEY (`leave_benefits_aid`);

--
-- Indexes for table `fbs_hris_leave_type`
--
ALTER TABLE `fbs_hris_leave_type`
  ADD PRIMARY KEY (`leave_type_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fbs_hris_client`
--
ALTER TABLE `fbs_hris_client`
  MODIFY `client_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fbs_hris_company`
--
ALTER TABLE `fbs_hris_company`
  MODIFY `company_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fbs_hris_departments`
--
ALTER TABLE `fbs_hris_departments`
  MODIFY `department_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `fbs_hris_employees`
--
ALTER TABLE `fbs_hris_employees`
  MODIFY `employees_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fbs_hris_employees_info`
--
ALTER TABLE `fbs_hris_employees_info`
  MODIFY `employees_info_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fbs_hris_job_level`
--
ALTER TABLE `fbs_hris_job_level`
  MODIFY `job_level_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `fbs_hris_job_title`
--
ALTER TABLE `fbs_hris_job_title`
  MODIFY `job_title_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `fbs_hris_leave_benefits`
--
ALTER TABLE `fbs_hris_leave_benefits`
  MODIFY `leave_benefits_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fbs_hris_leave_type`
--
ALTER TABLE `fbs_hris_leave_type`
  MODIFY `leave_type_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
