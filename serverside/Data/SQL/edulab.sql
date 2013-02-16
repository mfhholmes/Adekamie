-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2013 at 07:24 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `edulab`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spAddAuthenticationToUser`(IN `pAuthId` VARCHAR(36),IN `pUserId` VARCHAR(36), IN `pTypeId` VARCHAR(36), IN `pHash` VARCHAR(50))
    NO SQL
INSERT INTO Authentication(
        AuthId,
        UserId,
        TypeId,
        Value)
VALUES	(
        pAuthId,
        pUserId,
        pTypeId,
        pHash)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spCreateNewAuthentication`(IN `pAuthId` VARCHAR(36), IN `pUserId` VARCHAR(36), IN `pTypeId` INT, IN `pValue` VARCHAR(50))
    NO SQL
BEGIN
DECLARE vCheck Int;
SELECT
	COUNT(UserId)
INTO 	vCheck
FROM	Users
WHERE	UserId = pUserId;

IF vCheck > 0 THEN
    SELECT
            COUNT(TypeId)
    INTO	vCheck
    FROM	AuthenticationTypes
    WHERE	TypeId = pTypeId;
    
    IF vCheck > 0 THEN

        INSERT INTO Authentication(
                AuthId,
                UserId,
                TypeId,
                Value)
        VALUES	(
                pAuthId,
                pUserId,
                pTypeId,
                pValue);
	END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spCreateNewAuthenticationType`(IN `pTypeId` VARCHAR(36), IN `pName` VARCHAR(50))
    NO SQL
INSERT INTO AuthenticationTypes (
	TypeId,
        Name)
VALUES	(
	pTypeId,
        pName)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spCreateNewLessonTemplate`(IN `pId` VARCHAR(36), IN `pName` VARCHAR(100), IN `pEnabled` BOOLEAN)
    NO SQL
INSERT INTO LessonTemplates(
	TemplateId,
        LessonName,
        Enabled)
VALUES(
	pId,
        pName,
        pEnabled)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spCreateNewLessonTemplateFile`(IN `pID` VARCHAR(36), IN `pTemplateId` VARCHAR(36), IN `pVersion` INT, IN `pFileName` VARCHAR(100))
    NO SQL
    DETERMINISTIC
BEGIN
Declare vCheck Int;
SELECT 
	COUNT(TemplateFileId)
INTO vCheck
FROM	LessonTemplateFiles
WHERE 	(TemplateId = pTemplateId
AND	Version = pVersion);

IF vCheck = 0 THEN
    INSERT INTO LessonTemplateFiles(
            TemplateFileId,
            TemplateId,
            Version,
            Filename
    )
    VALUES(
            pId,
            pTemplateId,
            pVersion,
            pFileName
    );
ELSE
	UPDATE LessonTemplateFiles
   	SET Filename = pFilename
        WHERE TRUE = FALSE;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spCreateNewUser`(IN `pUserId` VARCHAR(36), IN `pUserName` VARCHAR(50), IN `pEnabled` BOOLEAN)
    NO SQL
BEGIN
DECLARE vCheck INT;
SELECT
	COUNT(*)
INTO vCheck
FROM Users
WHERE UserName = pUserName
;

IF vCheck > 0 THEN
	UPDATE Users
        SET UserId = UserId
        WHERE 1 =0;
ELSE
	INSERT INTO Users(
        	UserId,
                UserName,
                Enabled)
        VALUES(
        	pUserId,
                pUserName,
                pEnabled);
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDeleteLessonTemplate`(IN `pId` VARCHAR(36))
    NO SQL
UPDATE LessonTemplates SET
	Enabled = False
WHERE
	TemplateId = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDeleteLessonTemplateFile`(IN `pFileId` VARCHAR(36))
    NO SQL
DELETE FROM LessonTemplateFiles
WHERE TemplateFileId = pFileId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDeleteUser`(IN `pUserId` VARCHAR(36))
    NO SQL
UPDATE Users
SET
	Enabled = False
WHERE
	UserId = pUserId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetAuthByUserAndType`(IN `pUserName` VARCHAR(50), IN `pTypeName` VARCHAR(50))
    NO SQL
SELECT
	Value
FROM
	Authentication AS Auth
JOIN	AuthenticationTypes AS AuthType
ON	Auth.TypeId = AuthType.TypeId
JOIN	Users
ON	Auth.UserId = Users.UserId
WHERE
	pUserName = Users.UserName
AND	pTypeName = AuthType.Name$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetAuthenticationForUser`(IN `pUserId` INT, IN `pAuthTypeId` INT)
    NO SQL
SELECT value
FROM authentication
WHERE userId = pUserId
AND typeId = pAuthTypeId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetAuthTypeByName`(IN `pTypeName` VARCHAR(50))
    NO SQL
SELECT	TypeId,
	Name
FROM	AuthenticationTypes
WHERE	Name = pTypeName$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetLatestFileForTemplate`(IN `pTemplateId` VARCHAR(36))
    NO SQL
SELECT
	TemplateFileId,
        TemplateId,
        Version,
        FileName
FROM LessonTemplateFiles
WHERE TemplateId = pTemplateId
ORDER BY VERSION DESC
LIMIT 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetLessonTemplateFileNameById`(IN `pFileId` VARCHAR(36))
    NO SQL
SELECT
	TemplateFileId,
        TemplateId,
        Version,
        FileName
FROM	LessonTemplateFiles
WHERE	TemplateFileId = pFileId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetLessonTemplateNameById`(IN `pId` VARCHAR(36))
    NO SQL
SELECT
	TemplateId,
        LessonName,
        Enabled
FROM LessonTemplates
WHERE (TemplateId = pId
AND	Enabled = 1)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetTemplateFilesForTemplate`(IN `pTemplateId` VARCHAR(36))
    NO SQL
SELECT
	TemplateFileId,
        TemplateId,
        Version,
        FileName
FROM LessonTemplateFiles
WHERE TemplateId = pTemplateId
ORDER By Version$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetTemplates`()
    NO SQL
SELECT
	TemplateId,
        LessonName,
        Enabled
FROM
	LessonTemplates
WHERE
	Enabled = 1
ORDER BY 
	LessonName$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetUserById`(IN `pUserId` VARCHAR(36))
    NO SQL
SELECT
	UserId,
        UserName,
        Enabled
FROM
	Users
WHERE(
	UserId = pUserId
AND	Enabled = 1
)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetUserByName`(IN `pUserName` VARCHAR(50))
    NO SQL
SELECT
	UserId,
        UserName,
        Enabled
FROM
	Users
WHERE	
(	UserName = pUserName
AND	Enabled = 1
)
LIMIT 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetUsers`()
    NO SQL
SELECT
	UserId,
        UserName,
        Enabled
FROM	Users
WHERE	Enabled = 1
ORDER BY UserName$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spUpdateLessonTemplate`(IN `pId` VARCHAR(36), IN `pName` VARCHAR(100), IN `pEnabled` BOOLEAN)
    NO SQL
UPDATE LessonTemplates SET
	LessonName = pName,
       	Enabled = pEnabled
WHERE
	TemplateId = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spUpdateLessonTemplateFile`(IN `pFileId` VARCHAR(36), IN `pTemplateId` VARCHAR(36), IN `pVersion` INT, IN `pFileName` VARCHAR(100))
    NO SQL
UPDATE LessonTemplateFiles SET
        TemplateId = pTemplateId,
        Version = pVersion,
        FileName = pFileName
WHERE TemplateFileId = pFileId$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `authentication`
--

CREATE TABLE IF NOT EXISTS `authentication` (
  `AuthId` varchar(36) NOT NULL,
  `UserId` varchar(36) NOT NULL,
  `TypeId` int(11) NOT NULL,
  `Value` varchar(50) NOT NULL,
  PRIMARY KEY (`AuthId`),
  KEY `UserId` (`UserId`),
  KEY `UserId_2` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `authenticationtypes`
--

CREATE TABLE IF NOT EXISTS `authenticationtypes` (
  `TypeId` varchar(36) NOT NULL,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`TypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `FileId` varchar(36) NOT NULL,
  `UserId` varchar(36) NOT NULL,
  `LessonId` varchar(36) NOT NULL,
  `Version` int(11) NOT NULL,
  PRIMARY KEY (`FileId`),
  KEY `UserId` (`UserId`,`LessonId`),
  KEY `LessonId` (`LessonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lessoninstances`
--

CREATE TABLE IF NOT EXISTS `lessoninstances` (
  `LessonId` varchar(36) NOT NULL,
  `TemplateId` varchar(36) NOT NULL,
  `TeacherId` varchar(36) NOT NULL,
  `Available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`LessonId`),
  KEY `TemplateId` (`TemplateId`),
  KEY `TeacherId` (`TeacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lessontemplatefiles`
--

CREATE TABLE IF NOT EXISTS `lessontemplatefiles` (
  `TemplateFileId` varchar(36) NOT NULL,
  `TemplateId` varchar(36) NOT NULL,
  `Version` int(11) NOT NULL,
  `Filename` varchar(100) NOT NULL,
  PRIMARY KEY (`TemplateFileId`),
  KEY `TemplateId` (`TemplateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lessontemplates`
--

CREATE TABLE IF NOT EXISTS `lessontemplates` (
  `TemplateId` varchar(36) NOT NULL,
  `LessonName` varchar(100) NOT NULL,
  `Enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`TemplateId`),
  KEY `LessonName` (`LessonName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `SessionId` varchar(36) NOT NULL,
  `UserId` varchar(36) NOT NULL,
  `SessionIP` varchar(50) NOT NULL,
  `Start` datetime NOT NULL,
  `LastRequest` datetime NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`SessionId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `UserId` varchar(36) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`UserId`),
  KEY `UserName` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
