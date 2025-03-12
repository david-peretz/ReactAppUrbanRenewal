-- Initial Migration Script for Urban Renewal Database

-- Create Database (if not exists)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'UrbanRenewalDb')
BEGIN
    CREATE DATABASE UrbanRenewalDb;
END
GO

USE UrbanRenewalDb;
GO

-- Users Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Username NVARCHAR(50) NOT NULL,
        Email NVARCHAR(100) NOT NULL,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        Role NVARCHAR(50) NOT NULL,
        PhoneNumber NVARCHAR(20) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        LastLogin DATETIME2 NULL,
        CONSTRAINT UQ_Users_Username UNIQUE (Username),
        CONSTRAINT UQ_Users_Email UNIQUE (Email)
    );
END
GO

-- Projects Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Projects')
BEGIN
    CREATE TABLE Projects (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        Location NVARCHAR(200) NOT NULL,
        StartDate DATETIME2 NOT NULL,
        EndDate DATETIME2 NULL,
        Budget DECIMAL(18, 2) NOT NULL DEFAULT 0,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Planning',
        City NVARCHAR(100) NOT NULL,
        Street NVARCHAR(100) NOT NULL,
        BuildingNumber NVARCHAR(20) NOT NULL,
        TotalUnits INT NOT NULL DEFAULT 0,
        CurrentOccupancy INT NOT NULL DEFAULT 0,
        LandArea DECIMAL(18, 2) NOT NULL DEFAULT 0,
        BuildingArea DECIMAL(18, 2) NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 NULL
    );
END
GO

-- Customers Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Customers')
BEGIN
    CREATE TABLE Customers (
        Id INT PRIMARY KEY IDENTITY(1,1),
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        Email NVARCHAR(100) NULL,
        PhoneNumber NVARCHAR(20) NULL,
        Address NVARCHAR(200) NULL,
        City NVARCHAR(100) NULL,
        PostalCode NVARCHAR(20) NULL,
        IdentificationNumber NVARCHAR(20) NULL,
        CustomerType NVARCHAR(50) NOT NULL DEFAULT 'Resident',
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 NULL
    );
END
GO

-- Many-to-Many relationship between Customers and Projects
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CustomerProjects')
BEGIN
    CREATE TABLE CustomerProjects (
        CustomerId INT NOT NULL,
        ProjectId INT NOT NULL,
        PRIMARY KEY (CustomerId, ProjectId),
        CONSTRAINT FK_CustomerProjects_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(Id) ON DELETE CASCADE,
        CONSTRAINT FK_CustomerProjects_Projects FOREIGN KEY (ProjectId) REFERENCES Projects(Id) ON DELETE CASCADE
    );
END
GO

-- Documents Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Documents')
BEGIN
    CREATE TABLE Documents (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        FilePath NVARCHAR(MAX) NOT NULL,
        FileType NVARCHAR(100) NOT NULL,
        FileSize BIGINT NOT NULL,
        DocumentType NVARCHAR(50) NOT NULL,
        UploadDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        ExpiryDate DATETIME2 NULL,
        ProjectId INT NULL,
        UploadedById INT NULL,
        CONSTRAINT FK_Documents_Projects FOREIGN KEY (ProjectId) REFERENCES Projects(Id) ON DELETE SET NULL,
        CONSTRAINT FK_Documents_Users FOREIGN KEY (UploadedById) REFERENCES Users(Id) ON DELETE SET NULL
    );
END
GO

-- Tenders Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tenders')
BEGIN
    CREATE TABLE Tenders (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Title NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        ReleaseDate DATETIME2 NOT NULL,
        SubmissionDeadline DATETIME2 NOT NULL,
        EstimatedValue DECIMAL(18, 2) NOT NULL DEFAULT 0,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Draft',
        AwardedTo NVARCHAR(100) NULL,
        AwardedAmount DECIMAL(18, 2) NULL,
        AwardedDate DATETIME2 NULL,
        RequiredQualifications NVARCHAR(500) NULL,
        EvaluationCriteria NVARCHAR(500) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 NULL,
        ProjectId INT NOT NULL,
        CreatedById INT NULL,
        CONSTRAINT FK_Tenders_Projects FOREIGN KEY (ProjectId) REFERENCES Projects(Id) ON DELETE CASCADE,
        CONSTRAINT FK_Tenders_Users FOREIGN KEY (CreatedById) REFERENCES Users(Id) ON DELETE SET NULL
    );
END
GO

-- Property Valuations Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PropertyValuations')
BEGIN
    CREATE TABLE PropertyValuations (
        Id INT PRIMARY KEY IDENTITY(1,1),
        PropertyAddress NVARCHAR(100) NOT NULL,
        PropertyType NVARCHAR(50) NOT NULL DEFAULT 'Residential',
        AssessedValue DECIMAL(18, 2) NOT NULL DEFAULT 0,
        MarketValue DECIMAL(18, 2) NOT NULL DEFAULT 0,
        PostRenewalEstimatedValue DECIMAL(18, 2) NOT NULL DEFAULT 0,
        PropertyArea DECIMAL(18, 2) NOT NULL DEFAULT 0,
        NumberOfRooms INT NOT NULL DEFAULT 0,
        YearBuilt INT NOT NULL DEFAULT 0,
        ValuationNotes NVARCHAR(500) NULL,
        ValuationDate DATETIME2 NOT NULL,
        ValuationMethod NVARCHAR(50) NOT NULL DEFAULT 'Market Comparison',
        ValuedBy NVARCHAR(100) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 NULL,
        ProjectId INT NOT NULL,
        CONSTRAINT FK_PropertyValuations_Projects FOREIGN KEY (ProjectId) REFERENCES Projects(Id) ON DELETE CASCADE
    );
END
GO

-- Reports Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Reports')
BEGIN
    CREATE TABLE Reports (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Title NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        ReportType NVARCHAR(50) NOT NULL DEFAULT 'Progress',
        FilePath NVARCHAR(MAX) NULL,
        FileType NVARCHAR(100) NULL,
        FileSize BIGINT NULL,
        ReportDate DATETIME2 NOT NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Draft',
        Content NVARCHAR(MAX) NULL,
        Author NVARCHAR(100) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 NULL,
        ProjectId INT NULL,
        CreatedById INT NULL,
        CONSTRAINT FK_Reports_Projects FOREIGN KEY (ProjectId) REFERENCES Projects(Id) ON DELETE SET NULL,
        CONSTRAINT FK_Reports_Users FOREIGN KEY (CreatedById) REFERENCES Users(Id) ON DELETE SET NULL
    );
END
GO

-- Seed Admin User
IF NOT EXISTS (SELECT * FROM Users WHERE Username = 'admin')
BEGIN
    INSERT INTO Users (Username, Email, PasswordHash, Role, CreatedAt)
    VALUES ('admin', 'admin@urbanrenewal.com', 'AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==', 'Administrator', GETUTCDATE());
END
GO

-- Create indexes for better performance
CREATE INDEX IX_Documents_ProjectId ON Documents(ProjectId);
CREATE INDEX IX_Tenders_ProjectId ON Tenders(ProjectId);
CREATE INDEX IX_PropertyValuations_ProjectId ON PropertyValuations(ProjectId);
CREATE INDEX IX_Reports_ProjectId ON Reports(ProjectId);
CREATE INDEX IX_Documents_DocumentType ON Documents(DocumentType);
CREATE INDEX IX_Tenders_Status ON Tenders(Status);
CREATE INDEX IX_PropertyValuations_PropertyType ON PropertyValuations(PropertyType);
CREATE INDEX IX_Reports_ReportType ON Reports(ReportType);
GO
