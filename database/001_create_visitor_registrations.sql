-- Sona Tower Guest WiFi Portal - Database Setup
-- Run against Microsoft SQL Server 2016+

IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = N'SonaTowerGuestPortal')
BEGIN
    CREATE DATABASE SonaTowerGuestPortal;
END
GO

USE SonaTowerGuestPortal;
GO

IF OBJECT_ID(N'dbo.VisitorRegistrations', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.VisitorRegistrations (
        VisitorID         INT IDENTITY(1,1) NOT NULL,
        CNIC              VARCHAR(15)       NOT NULL,
        FullName          NVARCHAR(100)     NOT NULL,
        PhoneNumber       VARCHAR(15)       NOT NULL,
        Company           NVARCHAR(150)     NOT NULL,
        IPAddress         VARCHAR(45)       NULL,
        MACAddress        VARCHAR(17)       NULL,
        RegistrationTime  DATETIME2(0)      NOT NULL CONSTRAINT DF_VisitorRegistrations_RegistrationTime DEFAULT (SYSUTCDATETIME()),
        CreatedAt         DATETIME2(0)      NOT NULL CONSTRAINT DF_VisitorRegistrations_CreatedAt DEFAULT (SYSUTCDATETIME()),
        RegistrationDatePKT AS (
            CAST(
                (RegistrationTime AT TIME ZONE 'UTC') AT TIME ZONE 'Pakistan Standard Time'
            AS DATE)
        ) PERSISTED,
        CONSTRAINT PK_VisitorRegistrations PRIMARY KEY CLUSTERED (VisitorID)
    );
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.indexes
    WHERE name = N'UX_VisitorRegistrations_CNIC_DatePKT'
      AND object_id = OBJECT_ID(N'dbo.VisitorRegistrations')
)
BEGIN
    CREATE UNIQUE INDEX UX_VisitorRegistrations_CNIC_DatePKT
        ON dbo.VisitorRegistrations (CNIC, RegistrationDatePKT);
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.indexes
    WHERE name = N'IX_VisitorRegistrations_RegistrationTime'
      AND object_id = OBJECT_ID(N'dbo.VisitorRegistrations')
)
BEGIN
    CREATE INDEX IX_VisitorRegistrations_RegistrationTime
        ON dbo.VisitorRegistrations (RegistrationTime DESC);
END
GO

-- Application login (adjust password before running in production)
/*
CREATE LOGIN portal_app_user WITH PASSWORD = 'ChangeMe_Strong_Password_123!';
GO

USE SonaTowerGuestPortal;
GO

CREATE USER portal_app_user FOR LOGIN portal_app_user;
GO

GRANT SELECT, INSERT ON dbo.VisitorRegistrations TO portal_app_user;
GO
*/
