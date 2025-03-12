using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAppUrbanRenewal.Server.Migrations
{
    /// <summary>
    /// Migration to seed tenders data
    /// </summary>
    public partial class SeedTendersData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Check if Projects and Users tables exist before attempting to access them
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Projects') 
                AND EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
                AND EXISTS (SELECT * FROM Projects WHERE Name = N'פינוי-בינוי, יפו')
                AND EXISTS (SELECT * FROM Projects WHERE Name = N'תמ""א 38/2, רמת גן')
                AND EXISTS (SELECT * FROM Projects WHERE Name = N'התחדשות מרכז העיר, חולון')
                BEGIN
                    DECLARE @JaffaProjectId INT = (SELECT Id FROM Projects WHERE Name = N'פינוי-בינוי, יפו');
                    DECLARE @RamatGanProjectId INT = (SELECT Id FROM Projects WHERE Name = N'תמ""א 38/2, רמת גן');
                    DECLARE @HolonProjectId INT = (SELECT Id FROM Projects WHERE Name = N'התחדשות מרכז העיר, חולון');
                    DECLARE @YosiAbrahamId INT = (SELECT Id FROM Users WHERE Username = 'yosiabraham');
                    DECLARE @DavidCohenId INT = (SELECT Id FROM Users WHERE Username = 'davidcohen');

                    IF @JaffaProjectId IS NOT NULL AND @RamatGanProjectId IS NOT NULL AND @HolonProjectId IS NOT NULL
                    BEGIN
                        -- Insert Jaffa Tender
                        INSERT INTO Tenders (
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
                        VALUES 
                        (
                            N'מכרז לבחירת קבלן מבצע - פינוי בינוי יפו',
                            N'מכרז לבחירת קבלן מבצע לפרויקט פינוי-בינוי בשכונת יפו ד׳',
                            DATEADD(MONTH, -6, GETUTCDATE()),
                            DATEADD(MONTH, 1, GETUTCDATE()),
                            350000000,
                            'Published',
                            @JaffaProjectId,
                            ISNULL(@YosiAbrahamId, NULL),
                            N'ניסיון בפרויקטי פינוי-בינוי בהיקף של מעל 200 יחידות דיור',
                            N'מחיר (50%), ניסיון (30%), איכות (20%)',
                            GETUTCDATE()
                        ),
                        (
                            N'מכרז לשירותי תכנון אדריכלי - התחדשות מרכז העיר חולון',
                            N'מכרז לבחירת משרד אדריכלים לתכנון פרויקט התחדשות עירונית במתחם העיריה בחולון',
                            DATEADD(MONTH, -2, GETUTCDATE()),
                            DATEADD(DAY, 15, GETUTCDATE()),
                            5000000,
                            'Published',
                            @HolonProjectId,
                            ISNULL(@DavidCohenId, NULL),
                            N'ניסיון בתכנון פרויקטי התחדשות עירונית, יתרון לניסיון בעיר חולון',
                            N'איכות (50%), ניסיון (30%), מחיר (20%)',
                            GETUTCDATE()
                        ),
                        (
                            N'מכרז לביצוע עבודות גמר - תמ""א 38/2 רמת גן',
                            N'מכרז לביצוע עבודות גמר בפרויקט תמ""א 38/2 ברחוב ביאליק 45, רמת גן',
                            DATEADD(MONTH, -1, GETUTCDATE()),
                            DATEADD(DAY, 30, GETUTCDATE()),
                            15000000,
                            'Published',
                            @RamatGanProjectId,
                            ISNULL(@DavidCohenId, NULL),
                            N'ניסיון בעבודות גמר בפרויקטי תמ""א 38',
                            N'מחיר (60%), איכות (30%), לוח זמנים (10%)',
                            GETUTCDATE()
                        );
                        PRINT 'Added tenders successfully';
                    END
                    ELSE
                    BEGIN
                        PRINT 'One or more project IDs could not be found';
                    END
                END
                ELSE
                BEGIN
                    PRINT 'Required tables or projects do not exist yet';
                END
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Tenders')
                BEGIN
                    DELETE FROM Tenders WHERE Title IN (
                        N'מכרז לבחירת קבלן מבצע - פינוי בינוי יפו', 
                        N'מכרז לשירותי תכנון אדריכלי - התחדשות מרכז העיר חולון', 
                        N'מכרז לביצוע עבודות גמר - תמ""א 38/2 רמת גן'
                    );
                END
            ");
        }
    }
}
