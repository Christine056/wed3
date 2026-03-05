-- ============================================================
-- WEDDING APP — Database Setup
-- Run this in phpMyAdmin or MySQL CLI
-- ============================================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS `wedding_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `wedding_db`;

-- ============================================================
-- TABLE: guests
-- ============================================================
CREATE TABLE IF NOT EXISTS `guests` (
  `id`              INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`            VARCHAR(255) NOT NULL,
  `password`        VARCHAR(100) NOT NULL COMMENT 'Unique guest code / password',
  `reserved_seats`  INT(3) NOT NULL DEFAULT 1,
  `children_count`  INT(3) NOT NULL DEFAULT 0,
  `plus_one_count`  INT(3) NOT NULL DEFAULT 0,
  `attended_count`  INT(3) NOT NULL DEFAULT 0,
  `is_attending`    TINYINT(1) NULL DEFAULT NULL COMMENT 'NULL=pending, 1=attending, 0=declined',
  `status`          VARCHAR(50) NULL DEFAULT 'pending' COMMENT 'pending | confirmed | declined',
  `message`         TEXT NULL,
  `added_by`        VARCHAR(100) NOT NULL DEFAULT 'system',
  `added_on`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by`      VARCHAR(100) NOT NULL DEFAULT 'system',
  `updated_on`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted`      TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_guest_password` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: admins
-- ============================================================
CREATE TABLE IF NOT EXISTS `admins` (
  `id`          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username`    VARCHAR(100) NOT NULL,
  `password`    VARCHAR(255) NOT NULL,
  `added_by`    VARCHAR(100) NOT NULL DEFAULT 'system',
  `added_on`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by`  VARCHAR(100) NOT NULL DEFAULT 'system',
  `updated_on`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted`  TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: photos
-- ============================================================
CREATE TABLE IF NOT EXISTS `photos` (
  `id`            INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `guest_id`      INT(11) UNSIGNED NULL DEFAULT NULL,
  `file_url`      TEXT NOT NULL COMMENT 'Local or Google Drive shareable URL',
  `drive_file_id` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Google Drive file ID',
  `added_by`      VARCHAR(100) NOT NULL DEFAULT 'guest',
  `added_on`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by`    VARCHAR(100) NOT NULL DEFAULT 'guest',
  `updated_on`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted`    TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_photo_guest` (`guest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DEFAULT ADMIN ACCOUNT
-- Username: admin | Password: admin123
-- IMPORTANT: Change this password after first login!
-- ============================================================
INSERT INTO `admins` (`username`, `password`, `added_by`, `is_deleted`)
VALUES ('admin', 'admin123', 'system', 0);

-- ============================================================
-- SAMPLE GUESTS (for testing)
-- ============================================================
INSERT INTO `guests` (`name`, `password`, `reserved_seats`, `children_count`, `plus_one_count`, `status`, `added_by`) VALUES
('Juan dela Cruz',      'GUEST001', 2, 0, 0, 'pending', 'admin'),
('Maria Santos',        'GUEST002', 3, 1, 1, 'pending', 'admin'),
('Pedro Reyes',         'GUEST003', 2, 0, 1, 'pending', 'admin'),
('Ana Garcia',          'GUEST004', 1, 0, 0, 'pending', 'admin'),
('Carlos Mendoza',      'GUEST005', 4, 2, 0, 'pending', 'admin'),
('Liza Bonifacio',      'GUEST006', 2, 0, 1, 'pending', 'admin');

-- ============================================================
-- End of Setup
-- ============================================================
