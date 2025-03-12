using Microsoft.EntityFrameworkCore;
using ReactAppUrbanRenewal.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppUrbanRenewal.Server.Data
{
    public class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());

            // Check if DB is already seeded
            if (context.Users.Any() && context.Projects.Any())
                return;

            // Seed users
            await SeedUsers(context);

            // Seed projects, customers and related data
            await SeedProjects(context);
        }

        private static async Task SeedUsers(ApplicationDbContext context)
        {
            // Add administrator user if it doesn't exist
            if (!context.Users.Any(u => u.Username == "admin"))
            {
                context.Users.Add(new User
                {
                    Username = "admin",
                    Email = "admin@urbanrenewal.com",
                    PasswordHash = "AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==", // Admin123!
                    Role = "Administrator",
                    CreatedAt = DateTime.UtcNow
                });
            }

            // Add team members as users
            var teamMembers = new List<User>
            {
                new User { Username = "davidcohen", Email = "david.cohen@urbanrenewal.com", Role = "Manager", PasswordHash = "AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==", PhoneNumber = "050-1234567", CreatedAt = DateTime.UtcNow },
                new User { Username = "michallevi", Email = "michal.levi@urbanrenewal.com", Role = "Professional", PasswordHash = "AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==", PhoneNumber = "052-1234567", CreatedAt = DateTime.UtcNow },
                new User { Username = "yosiabraham", Email = "yosi.abraham@urbanrenewal.com", Role = "Professional", PasswordHash = "AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==", PhoneNumber = "053-1234567", CreatedAt = DateTime.UtcNow },
                new User { Username = "ronitsimoni", Email = "ronit.simoni@urbanrenewal.com", Role = "Manager", PasswordHash = "AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==", PhoneNumber = "054-1234567", CreatedAt = DateTime.UtcNow },
                new User { Username = "avigolan", Email = "avi.golan@urbanrenewal.com", Role = "Professional", PasswordHash = "AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==", PhoneNumber = "055-1234567", CreatedAt = DateTime.UtcNow }
            };

            foreach (var user in teamMembers)
            {
                if (!context.Users.Any(u => u.Username == user.Username))
                {
                    context.Users.Add(user);
                }
            }

            await context.SaveChangesAsync();
        }

        private static async Task SeedProjects(ApplicationDbContext context)
        {
            // Get users for reference
            var davidCohen = await context.Users.FirstOrDefaultAsync(u => u.Username == "davidcohen");
            var michalLevi = await context.Users.FirstOrDefaultAsync(u => u.Username == "michallevi");
            var yosiAbraham = await context.Users.FirstOrDefaultAsync(u => u.Username == "yosiabraham");
            var ronitSimoni = await context.Users.FirstOrDefaultAsync(u => u.Username == "ronitsimoni");
            var aviGolan = await context.Users.FirstOrDefaultAsync(u => u.Username == "avigolan");

            // Add projects
            var projects = new List<Project>
            {
                // Pinui-Binui Jaffa
                new Project
                {
                    Name = "פינוי-בינוי, יפו",
                    Description = "פרויקט פינוי-בינוי בשכונת יפו ד׳, הכולל הריסת 8 בניינים ישנים ובניית 4 מגדלי מגורים חדשים עם סה\"כ 320 יחידות דיור.",
                    Location = "שכונת יפו ד׳, תל אביב-יפו",
                    StartDate = DateTime.Parse("2022-03-15"),
                    EndDate = DateTime.Parse("2026-12-31"),
                    Budget = 450000000,
                    Status = "InProgress",
                    City = "תל אביב-יפו",
                    Street = "שכונת יפו ד׳",
                    BuildingNumber = "1-8",
                    TotalUnits = 320,
                    CurrentOccupancy = 85,
                    LandArea = 12000,
                    BuildingArea = 48000,
                    CreatedAt = DateTime.UtcNow
                },
                
                // TAMA 38 Ramat Gan
                new Project
                {
                    Name = "תמ\"א 38/2, רמת גן",
                    Description = "פרויקט תמ\"א 38/2 (הריסה ובנייה) ברחוב ביאליק ברמת גן. הפרויקט כולל הריסת מבנה בן 4 קומות והקמת בניין חדש בן 9 קומות עם 36 יחידות דיור.",
                    Location = "רחוב ביאליק 45, רמת גן",
                    StartDate = DateTime.Parse("2021-08-10"),
                    EndDate = DateTime.Parse("2025-06-30"),
                    Budget = 85000000,
                    Status = "InProgress",
                    City = "רמת גן",
                    Street = "ביאליק",
                    BuildingNumber = "45",
                    TotalUnits = 36,
                    CurrentOccupancy = 0, // Building demolished
                    LandArea = 1200,
                    BuildingArea = 4500,
                    CreatedAt = DateTime.UtcNow
                },
                
                // Urban Renewal Holon
                new Project
                {
                    Name = "התחדשות מרכז העיר, חולון",
                    Description = "פרויקט התחדשות עירונית במתחם העיריה בחולון, הכולל הקמת מתחם מגורים, מסחר ומשרדים. הפרויקט כולל 5 מגדלים עם סה\"כ 450 יחידות דיור ו-15,000 מ\"ר שטחי מסחר ומשרדים.",
                    Location = "מתחם העיריה, חולון",
                    StartDate = DateTime.Parse("2022-01-01"),
                    EndDate = DateTime.Parse("2028-12-31"),
                    Budget = 750000000,
                    Status = "Pending",
                    City = "חולון",
                    Street = "מתחם העיריה",
                    BuildingNumber = "1-10",
                    TotalUnits = 450,
                    CurrentOccupancy = 280,
                    LandArea = 25000,
                    BuildingArea = 90000,
                    CreatedAt = DateTime.UtcNow
                },
                
                // TAMA 38 Tel Aviv
                new Project
                {
                    Name = "תמ\"א 38/1, תל אביב",
                    Description = "פרויקט תמ\"א 38/1 (חיזוק ותוספת) ברחוב ארלוזורוב בתל אביב. הפרויקט כולל חיזוק מבנה קיים, הוספת 2 קומות ותוספת של 8 יחידות דיור חדשות.",
                    Location = "רחוב ארלוזורוב 78, תל אביב",
                    StartDate = DateTime.Parse("2021-05-01"),
                    EndDate = DateTime.Parse("2024-08-31"),
                    Budget = 12000000,
                    Status = "Delayed",
                    City = "תל אביב",
                    Street = "ארלוזורוב",
                    BuildingNumber = "78",
                    TotalUnits = 8,
                    CurrentOccupancy = 16, // Original building residents
                    LandArea = 600,
                    BuildingArea = 1800,
                    CreatedAt = DateTime.UtcNow
                },
                
                // Pinui-Binui Kiryat Ono
                new Project
                {
                    Name = "פינוי-בינוי, קרית אונו",
                    Description = "פרויקט פינוי-בינוי בשכונת רייספלד בקרית אונו, הכולל הריסת 12 בניינים ישנים ובניית 6 מגדלי מגורים חדשים עם סה\"כ 480 יחידות דיור.",
                    Location = "שכונת רייספלד, קרית אונו",
                    StartDate = DateTime.Parse("2022-06-01"),
                    EndDate = DateTime.Parse("2027-10-15"),
                    Budget = 650000000,
                    Status = "InProgress",
                    City = "קרית אונו",
                    Street = "שכונת רייספלד",
                    BuildingNumber = "1-12",
                    TotalUnits = 480,
                    CurrentOccupancy = 180,
                    LandArea = 18000,
                    BuildingArea = 72000,
                    CreatedAt = DateTime.UtcNow
                }
            };

            foreach (var project in projects)
            {
                if (!context.Projects.Any(p => p.Name == project.Name))
                {
                    context.Projects.Add(project);
                }
            }

            await context.SaveChangesAsync();

            // Now seed tenders
            await SeedTenders(context);

            // Add property valuations
            await SeedPropertyValuations(context);

            // Add documents
            await SeedDocuments(context);

            // Add reports
            await SeedReports(context);

            // Add customers
            await SeedCustomers(context);
        }

        private static async Task SeedTenders(ApplicationDbContext context)
        {
            var jaffaProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "פינוי-בינוי, יפו");
            var ramatGanProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "תמ\"א 38/2, רמת גן");
            var holonProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "התחדשות מרכז העיר, חולון");

            var yosiAbraham = await context.Users.FirstOrDefaultAsync(u => u.Username == "yosiabraham");
            var davidCohen = await context.Users.FirstOrDefaultAsync(u => u.Username == "davidcohen");

            var tenders = new List<Tender>
            {
                new Tender
                {
                    Title = "מכרז לבחירת קבלן מבצע - פינוי בינוי יפו",
                    Description = "מכרז לבחירת קבלן מבצע לפרויקט פינוי-בינוי בשכונת יפו ד׳",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-6),
                    SubmissionDeadline = DateTime.UtcNow.AddMonths(1),
                    EstimatedValue = 350000000,
                    Status = "Published",
                    ProjectId = jaffaProject.Id,
                    CreatedById = yosiAbraham?.Id,
                    RequiredQualifications = "ניסיון בפרויקטי פינוי-בינוי בהיקף של מעל 200 יחידות דיור",
                    EvaluationCriteria = "מחיר (50%), ניסיון (30%), איכות (20%)",
                    CreatedAt = DateTime.UtcNow
                },
                new Tender
                {
                    Title = "מכרז לשירותי תכנון אדריכלי - התחדשות מרכז העיר חולון",
                    Description = "מכרז לבחירת משרד אדריכלים לתכנון פרויקט התחדשות עירונית במתחם העיריה בחולון",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                    SubmissionDeadline = DateTime.UtcNow.AddDays(15),
                    EstimatedValue = 5000000,
                    Status = "Published",
                    ProjectId = holonProject.Id,
                    CreatedById = davidCohen?.Id,
                    RequiredQualifications = "ניסיון בתכנון פרויקטי התחדשות עירונית, יתרון לניסיון בעיר חולון",
                    EvaluationCriteria = "איכות (50%), ניסיון (30%), מחיר (20%)",
                    CreatedAt = DateTime.UtcNow
                },
                new Tender
                {
                    Title = "מכרז לביצוע עבודות גמר - תמ\"א 38/2 רמת גן",
                    Description = "מכרז לביצוע עבודות גמר בפרויקט תמ\"א 38/2 ברחוב ביאליק 45, רמת גן",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-1),
                    SubmissionDeadline = DateTime.UtcNow.AddDays(30),
                    EstimatedValue = 15000000,
                    Status = "Published",
                    ProjectId = ramatGanProject.Id,
                    CreatedById = davidCohen?.Id,
                    RequiredQualifications = "ניסיון בעבודות גמר בפרויקטי תמ\"א 38",
                    EvaluationCriteria = "מחיר (60%), איכות (30%), לוח זמנים (10%)",
                    CreatedAt = DateTime.UtcNow
                }
            };

            foreach (var tender in tenders)
            {
                if (!context.Tenders.Any(t => t.Title == tender.Title && t.ProjectId == tender.ProjectId))
                {
                    context.Tenders.Add(tender);
                }
            }

            await context.SaveChangesAsync();
        }

        private static async Task SeedPropertyValuations(ApplicationDbContext context)
        {
            var jaffaProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "פינוי-בינוי, יפו");
            var ramatGanProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "תמ\"א 38/2, רמת גן");
            var holonProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "התחדשות מרכז העיר, חולון");
            var telAvivProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "תמ\"א 38/1, תל אביב");
            var kiryatOnoProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "פינוי-בינוי, קרית אונו");

            var propertyValuations = new List<PropertyValuation>
            {
                new PropertyValuation
                {
                    PropertyAddress = "רחוב יפו 12, תל אביב-יפו",
                    PropertyType = "Residential",
                    AssessedValue = 1200000,
                    MarketValue = 1500000,
                    PostRenewalEstimatedValue = 2800000,
                    PropertyArea = 85,
                    NumberOfRooms = 3,
                    YearBuilt = 1975,
                    ValuationNotes = "דירת 3 חדרים במצב בינוני, תוספת ערך משמעותית לאחר פינוי-בינוי",
                    ValuationDate = DateTime.UtcNow.AddMonths(-3),
                    ValuationMethod = "Market Comparison",
                    ValuedBy = "יובל שמאי",
                    ProjectId = jaffaProject.Id,
                    CreatedAt = DateTime.UtcNow
                },
                new PropertyValuation
                {
                    PropertyAddress = "רחוב ביאליק 45, רמת גן, דירה 12",
                    PropertyType = "Residential",
                    AssessedValue = 1800000,
                    MarketValue = 2000000,
                    PostRenewalEstimatedValue = 3500000,
                    PropertyArea = 75,
                    NumberOfRooms = 3,
                    YearBuilt = 1965,
                    ValuationNotes = "דירת 3 חדרים בקומה 3, זכאות לדירה חדשה של 95 מ\"ר לאחר סיום הפרויקט",
                    ValuationDate = DateTime.UtcNow.AddMonths(-6),
                    ValuationMethod = "Market Comparison",
                    ValuedBy = "אבי שמאי",
                    ProjectId = ramatGanProject.Id,
                    CreatedAt = DateTime.UtcNow
                },
                new PropertyValuation
                {
                    PropertyAddress = "מתחם העיריה, חולון, בניין 3, דירה 8",
                    PropertyType = "Residential",
                    AssessedValue = 1500000,
                    MarketValue = 1700000,
                    PostRenewalEstimatedValue = 2900000,
                    PropertyArea = 65,
                    NumberOfRooms = 3,
                    YearBuilt = 1970,
                    ValuationNotes = "דירת 3 חדרים במתחם המיועד להתחדשות עירונית",
                    ValuationDate = DateTime.UtcNow.AddMonths(-2),
                    ValuationMethod = "Market Comparison",
                    ValuedBy = "דני שמאי",
                    ProjectId = holonProject.Id,
                    CreatedAt = DateTime.UtcNow
                },
                new PropertyValuation
                {
                    PropertyAddress = "רחוב ארלוזורוב 78, תל אביב, דירה 5",
                    PropertyType = "Residential",
                    AssessedValue = 3200000,
                    MarketValue = 3500000,
                    PostRenewalEstimatedValue = 4200000,
                    PropertyArea = 60,
                    NumberOfRooms = 2,
                    YearBuilt = 1960,
                    ValuationNotes = "דירת 2 חדרים בבניין המיועד לחיזוק ותוספת קומות",
                    ValuationDate = DateTime.UtcNow.AddMonths(-1),
                    ValuationMethod = "Market Comparison",
                    ValuedBy = "רונה שמאית",
                    ProjectId = telAvivProject.Id,
                    CreatedAt = DateTime.UtcNow
                },
                new PropertyValuation
                {
                    PropertyAddress = "שכונת רייספלד, קרית אונו, בניין 5, דירה 10",
                    PropertyType = "Residential",
                    AssessedValue = 1600000,
                    MarketValue = 1800000,
                    PostRenewalEstimatedValue = 3200000,
                    PropertyArea = 75,
                    NumberOfRooms = 3,
                    YearBuilt = 1980,
                    ValuationNotes = "דירת 3 חדרים במצב טוב, ערך צפוי לעלות משמעותית לאחר פינוי-בינוי",
                    ValuationDate = DateTime.UtcNow.AddMonths(-4),
                    ValuationMethod = "Market Comparison",
                    ValuedBy = "משה שמאי",
                    ProjectId = kiryatOnoProject.Id,
                    CreatedAt = DateTime.UtcNow
                }
            };

            foreach (var valuation in propertyValuations)
            {
                if (!context.PropertyValuations.Any(p => p.PropertyAddress == valuation.PropertyAddress))
                {
                    context.PropertyValuations.Add(valuation);
                }
            }

            await context.SaveChangesAsync();
        }

        private static async Task SeedDocuments(ApplicationDbContext context)
        {
            var jaffaProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "פינוי-בינוי, יפו");
            var ramatGanProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "תמ\"א 38/2, רמת גן");
            var holonProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "התחדשות מרכז העיר, חולון");

            var documents = new List<Document>
            {
                new Document
                {
                    Name = "תוכנית בינוי - פינוי בינוי יפו",
                    Description = "תוכנית בינוי מפורטת לפרויקט פינוי-בינוי בשכונת יפו ד׳",
                    FilePath = "wwwroot/documents/jaffa_construction_plan.pdf",
                    FileType = "application/pdf",
                    FileSize = 2500000,
                    DocumentType = "Plan",
                    UploadDate = DateTime.UtcNow.AddMonths(-5),
                    ProjectId = jaffaProject?.Id,
                    UploadedById = context.Users.FirstOrDefault(u => u.Username == "davidcohen")?.Id
                },
                new Document
                {
                    Name = "היתר בנייה - תמ\"א 38/2 רמת גן",
                    Description = "היתר בנייה עבור פרויקט תמ\"א 38/2 ברחוב ביאליק 45, רמת גן",
                    FilePath = "wwwroot/documents/ramat_gan_permit.pdf",
                    FileType = "application/pdf",
                    FileSize = 1800000,
                    DocumentType = "Permit",
                    UploadDate = DateTime.UtcNow.AddMonths(-8),
                    ProjectId = ramatGanProject?.Id,
                    UploadedById = context.Users.FirstOrDefault(u => u.Username == "ronitsimoni")?.Id
                },
                new Document
                {
                    Name = "תוכנית אדריכלית - מתחם העיריה חולון",
                    Description = "תוכנית אדריכלית ראשונית לפרויקט התחדשות עירונית במתחם העיריה בחולון",
                    FilePath = "wwwroot/documents/holon_architectural_plan.pdf",
                    FileType = "application/pdf",
                    FileSize = 3200000,
                    DocumentType = "Plan",
                    UploadDate = DateTime.UtcNow.AddMonths(-4),
                    ProjectId = holonProject?.Id,
                    UploadedById = context.Users.FirstOrDefault(u => u.Username == "yosiabraham")?.Id
                },
                new Document
                {
                    Name = "הסכם דיירים - פינוי בינוי יפו",
                    Description = "הסכם חתום עם דיירי הפרויקט בשכונת יפו ד׳",
                    FilePath = "wwwroot/documents/jaffa_residents_agreement.pdf",
                    FileType = "application/pdf",
                    FileSize = 1500000,
                    DocumentType = "Contract",
                    UploadDate = DateTime.UtcNow.AddMonths(-10),
                    ProjectId = jaffaProject?.Id,
                    UploadedById = context.Users.FirstOrDefault(u => u.Username == "michallevi")?.Id
                }
            };

            foreach (var document in documents)
            {
                if (!context.Documents.Any(d => d.Name == document.Name && d.ProjectId == document.ProjectId))
                {
                    context.Documents.Add(document);
                }
            }

            await context.SaveChangesAsync();
        }

        private static async Task SeedReports(ApplicationDbContext context)
        {
            var jaffaProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "פינוי-בינוי, יפו");
            var ramatGanProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "תמ\"א 38/2, רמת גן");

            var reports = new List<Report>
            {
                new Report
                {
                    Title = "דוח התקדמות רבעוני - פינוי בינוי יפו",
                    Description = "דוח התקדמות רבעוני לרבעון האחרון בפרויקט פינוי-בינוי בשכונת יפו ד׳",
                    ReportType = "Progress",
                    ReportDate = DateTime.UtcNow.AddDays(-15),
                    Status = "Published",
                    Content = "פרויקט פינוי-בינוי יפו ד׳ ממשיך להתקדם לפי לוח הזמנים. במהלך הרבעון האחרון הושלמו הסכמי דיירים, והתקבל אישור הוועדה המקומית להפקדת התוכנית. אחוז ההשלמה הכולל של הפרויקט עומד על 45%.",
                    Author = "דוד כהן",
                    ProjectId = jaffaProject?.Id,
                    CreatedById = context.Users.FirstOrDefault(u => u.Username == "davidcohen")?.Id
                },
                new Report
                {
                    Title = "דוח כספי חציוני - תמ\"א 38/2 רמת גן",
                    Description = "דוח כספי לחציון הראשון בפרויקט תמ\"א 38/2 ברמת גן",
                    ReportType = "Financial",
                    ReportDate = DateTime.UtcNow.AddDays(-45),
                    Status = "Published",
                    Content = "ההוצאות בפרויקט תמ\"א 38/2 רמת גן לחציון האחרון עומדות על 28 מיליון ₪, לעומת תקציב מתוכנן של 30 מיליון ₪. החיסכון נובע בעיקר מהתייעלות בתהליכי עבודה ומשא ומתן מוצלח עם קבלני משנה.",
                    Author = "רונית שמעוני",
                    ProjectId = ramatGanProject?.Id,
                    CreatedById = context.Users.FirstOrDefault(u => u.Username == "ronitsimoni")?.Id
                }
            };

            foreach (var report in reports)
            {
                if (!context.Reports.Any(r => r.Title == report.Title && r.ProjectId == report.ProjectId))
                {
                    context.Reports.Add(report);
                }
            }

            await context.SaveChangesAsync();
        }

        private static async Task SeedCustomers(ApplicationDbContext context)
        {
            var jaffaProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "פינוי-בינוי, יפו");
            var ramatGanProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "תמ\"א 38/2, רמת גן");
            var telAvivProject = await context.Projects.FirstOrDefaultAsync(p => p.Name == "תמ\"א 38/1, תל אביב");

            var customers = new List<Customer>
            {
                new Customer
                {
                    FirstName = "ישראל",
                    LastName = "ישראלי",
                    Email = "israel@example.com",
                    PhoneNumber = "050-1234567",
                    Address = "רחוב יפו 12, תל אביב-יפו",
                    City = "תל אביב-יפו",
                    PostalCode = "61000",
                    IdentificationNumber = "123456789",
                    CustomerType = "Resident",
                    CreatedAt = DateTime.UtcNow
                },
                new Customer
                {
                    FirstName = "מיכל",
                    LastName = "כהן",
                    Email = "michal.cohen@example.com",
                    PhoneNumber = "052-7654321",
                    Address = "רחוב ביאליק 45, דירה 12, רמת גן",
                    City = "רמת גן",
                    PostalCode = "52604",
                    IdentificationNumber = "987654321",
                    CustomerType = "Resident",
                    CreatedAt = DateTime.UtcNow
                },
                new Customer
                {
                    FirstName = "יעקב",
                    LastName = "לוי",
                    Email = "yaakov.levi@example.com",
                    PhoneNumber = "053-9876543",
                    Address = "רחוב ארלוזורוב 78, דירה 5, תל אביב",
                    City = "תל אביב",
                    PostalCode = "63827",
                    IdentificationNumber = "567891234",
                    CustomerType = "Resident",
                    CreatedAt = DateTime.UtcNow
                }
            };

            foreach (var customer in customers)
            {
                if (!context.Customers.Any(c => c.IdentificationNumber == customer.IdentificationNumber))
                {
                    context.Customers.Add(customer);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
