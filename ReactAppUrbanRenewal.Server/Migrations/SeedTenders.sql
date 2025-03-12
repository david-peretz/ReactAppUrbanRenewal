-- Script to directly seed Tenders data

-- Make sure we have projects and users first
IF EXISTS (SELECT * FROM dbo.Projects WHERE Name = N'פינוי-בינוי, יפו') AND
   EXISTS (SELECT * FROM dbo.Projects WHERE Name = N'תמ"א 38/2, רמת גן') AND
   EXISTS (SELECT * FROM dbo.Projects WHERE Name = N'התחדשות מרכז העיר, חולון') AND
   EXISTS (SELECT * FROM dbo.Users WHERE Username = 'davidcohen') AND
   EXISTS (SELECT * FROM dbo.Users WHERE Username = 'yosiabraham')
BEGIN
    DECLARE @JaffaProjectId INT = (SELECT Id FROM dbo.Projects WHERE Name = N'פינוי-בינוי, יפו');
    DECLARE @RamatGanProjectId INT = (SELECT Id FROM dbo.Projects WHERE Name = N'תמ"א 38/2, רמת גן');
    DECLARE @HolonProjectId INT = (SELECT Id FROM dbo.Projects WHERE Name = N'התחדשות מרכז העיר, חולון');
    DECLARE @DavidCohenId INT = (SELECT Id FROM dbo.Users WHERE Username = 'davidcohen');
    DECLARE @YosiAbrahamId INT = (SELECT Id FROM dbo.Users WHERE Username = 'yosiabraham');
    
    -- Only insert if the tenders don't already exist
    IF NOT EXISTS (SELECT * FROM dbo.Tenders WHERE Title = N'מכרז לבחירת קבלן מבצע - פינוי בינוי יפו' AND ProjectId = @JaffaProjectId)
    BEGIN
        INSERT INTO dbo.Tenders (
            Title, 
            Description, 
            ReleaseDate, 
            SubmissionDeadline, 
            EstimatedValue, 
            Status, 
            ProjectId, 
            CreatedById, 
            RequiredQualifications, 
            EvaluationCriteria, 
            CreatedAt
        )
        VALUES (
            N'מכרז לבחירת קבלן מבצע - פינוי בינוי יפו',
            N'מכרז לבחירת קבלן מבצע לפרויקט פינוי-בינוי בשכונת יפו ד׳',
            DATEADD(MONTH, -6, GETUTCDATE()),
            DATEADD(MONTH, 1, GETUTCDATE()),
            350000000,
            'Published',
            @JaffaProjectId,
            @YosiAbrahamId,
            N'ניסיון בפרויקטי פינוי-בינוי בהיקף של מעל 200 יחידות דיור',
            N'מחיר (50%), ניסיון (30%), איכות (20%)',
            GETUTCDATE()
        );
    END

    -- Holon Tender
    IF NOT EXISTS (SELECT * FROM dbo.Tenders WHERE Title = N'מכרז לשירותי תכנון אדריכלי - התחדשות מרכז העיר חולון' AND ProjectId = @HolonProjectId)
    BEGIN
        INSERT INTO dbo.Tenders (
            Title, 
            Description, 
            ReleaseDate, 
            SubmissionDeadline, 
            EstimatedValue, 
            Status, 
            ProjectId, 
            CreatedById, 
            RequiredQualifications, 
            EvaluationCriteria, 
            CreatedAt
        )
        VALUES (
            N'מכרז לשירותי תכנון אדריכלי - התחדשות מרכז העיר חולון',
            N'מכרז לבחירת משרד אדריכלים לתכנון פרויקט התחדשות עירונית במתחם העיריה בחולון',
            DATEADD(MONTH, -2, GETUTCDATE()),
            DATEADD(DAY, 15, GETUTCDATE()),
            5000000,
            'Published',
            @HolonProjectId,
            @DavidCohenId,
            N'ניסיון בתכנון פרויקטי התחדשות עירונית, יתרון לניסיון בעיר חולון',
            N'איכות (50%), ניסיון (30%), מחיר (20%)',
            GETUTCDATE()
        );
    END

    -- Ramat Gan Tender
    IF NOT EXISTS (SELECT * FROM dbo.Tenders WHERE Title = N'מכרז לביצוע עבודות גמר - תמ"א 38/2 רמת גן' AND ProjectId = @RamatGanProjectId)
    BEGIN
        INSERT INTO dbo.Tenders (
            Title, 
            Description, 
            ReleaseDate, 
            SubmissionDeadline, 
            EstimatedValue, 
            Status, 
            ProjectId, 
            CreatedById, 
            RequiredQualifications, 
            EvaluationCriteria, 
            CreatedAt
        )
        VALUES (
            N'מכרז לביצוע עבודות גמר - תמ"א 38/2 רמת גן',
            N'מכרז לביצוע עבודות גמר בפרויקט תמ"א 38/2 ברחוב ביאליק 45, רמת גן',
            DATEADD(MONTH, -1, GETUTCDATE()),
            DATEADD(DAY, 30, GETUTCDATE()),
            15000000,
            'Published',
            @RamatGanProjectId,
            @DavidCohenId,
            N'ניסיון בעבודות גמר בפרויקטי תמ"א 38',
            N'מחיר (60%), איכות (30%), לוח זמנים (10%)',
            GETUTCDATE()
        );
    END
    
    PRINT 'Tenders seeded successfully';
END
ELSE
BEGIN
    PRINT 'Required projects or users not found. Cannot seed tenders.';
END
