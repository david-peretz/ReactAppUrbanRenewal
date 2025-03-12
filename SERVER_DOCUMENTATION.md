# תיעוד צד שרת - פרויקט התחדשות עירונית

תיעוד טכני מפורט עבור צד השרת של מערכת ניהול פרויקטי התחדשות עירונית.

## ארכיטקטורה

מערכת השרת מבוססת על ASP.NET Core 8 ומאורגנת לפי מודל שכבות:

1. **שכבת המודל (Models)**

   - מחלקות מודל עבור ישויות עסקיות
   - אובייקטי העברת נתונים (DTOs)

2. **שכבת נתונים (Data)**

   - ApplicationDbContext (Entity Framework Core)
   - מיפויי ישויות
   - הגדרות מסד נתונים

3. **שכבת השירותים (Services)**

   - לוגיקה עסקית
   - ממשקי שירות והטמעות

4. **שכבת בקרה (Controllers)**
   - בקרי API מבוססי REST
   - סינון והרשאות

## תלויות ומערכות חיצוניות

- **Entity Framework Core**: גישה למסד נתונים
- **SQL Server**: מסד נתונים רלציוני
- **JWT**: אימות וזיהוי
- **Swagger**: תיעוד API

## מודלים

### User

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLogin { get; set; }
}
```

### Project

```csharp
public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Location { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal Budget { get; set; }
    public string Status { get; set; } = "Planning";
    public string City { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string BuildingNumber { get; set; } = string.Empty;
    public int TotalUnits { get; set; }
    public int CurrentOccupancy { get; set; }
    public decimal LandArea { get; set; }
    public decimal BuildingArea { get; set; }

    // Navigation properties
    public virtual ICollection<Document> Documents { get; set; }
    public virtual ICollection<Tender> Tenders { get; set; }
    public virtual ICollection<PropertyValuation> PropertyValuations { get; set; }
}
```

### Customer, Document, Tender, PropertyValuation, Report

(מיפוי מפורט ויחסים בין המודלים מוגדרים במחלקות המודל הנפרדות)

## שכבת הנתונים

### ApplicationDbContext

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Document> Documents { get; set; }
    public DbSet<Tender> Tenders { get; set; }
    public DbSet<PropertyValuation> PropertyValuations { get; set; }
    public DbSet<Report> Reports { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // יחסים בין ישויות והגדרות נוספות כאן
        // ...

        // נתוני אתחול
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Username = "admin", Email = "admin@urbanrenewal.com", PasswordHash = "...", Role = "Administrator" }
        );
    }
}
```

## שירותים

### IUserService / UserService

```csharp
public interface IUserService
{
    Task<User?> GetUserByIdAsync(int id);
    Task<List<User>> GetAllUsersAsync();
    Task<User?> GetUserByUsernameAsync(string username);
    Task<User?> GetUserByEmailAsync(string email);
    Task<User> CreateUserAsync(User user, string password);
    Task UpdateUserAsync(User user);
    Task<bool> DeleteUserAsync(int id);
    Task<bool> VerifyUserCredentialsAsync(string username, string password);
    Task<string> GenerateJwtTokenAsync(User user);
}

// הטמעת השירות כוללת:
// - ניהול משתמשים
// - אימות וסיסמאות
// - ניהול טוקנים
```

### שירותים נוספים

(שירותים נוספים עבור ניהול פרויקטים, לקוחות, מסמכים, מכרזים, הערכות וסקירות)

## בקרי API

### AuthController

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest loginRequest)
    {
        // אימות, יצירת טוקן והחזרת מידע משתמש
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest registerRequest)
    {
        // בדיקת תקינות, יצירת משתמש והחזרת טוקן
    }
}
```

### ProjectsController

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    // נקודות קצה לניהול פרויקטים:
    // - קבלת רשימת פרויקטים
    // - יצירה/עדכון/מחיקה
    // - סינון לפי מיקום/סטטוס
    // - נקודות קצה מיוחדות למסמכים/מכרזים/הערכות/דוחות
}
```

### נקודות קצה נוספות

- DocumentsController
- CustomersController
- TendersController
- PropertyValuationsController
- ReportsController

## אבטחה

### אימות JWT

```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
        };
    });
```

### הרשאות תפקידים

```csharp
[HttpPost]
[Authorize(Roles = "Administrator,Manager")]
public async Task<ActionResult<Project>> CreateProject(Project project)
{
    // פעולות מוגנות לפי תפקיד משתמש
}
```

## ניהול קבצים

### שמירת מסמכים

```csharp
public async Task<Document> CreateDocumentAsync(Document document, IFormFile file)
{
    // שמירת מסמך בדיסק וקישור למסד הנתונים
    string filePath = Path.Combine(_configuration["Storage:DocumentsPath"], uniqueFileName);
    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    document.FilePath = filePath;
    document.FileSize = file.Length;
    document.FileType = file.ContentType;

    // ...
}
```

## הגדרות תצורה

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=UrbanRenewalDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "ThisIsASecretKeyForUrbanRenewalApplication123!@#",
    "Issuer": "UrbanRenewalApp",
    "Audience": "UrbanRenewalUsers",
    "DurationInMinutes": 60
  },
  "Storage": {
    "DocumentsPath": "wwwroot/documents"
  }
}
```

## התקנת התשתית

### רישום שירותים (Program.cs)

```csharp
// רישום DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// רישום שירותים
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<ITenderService, TenderService>();
builder.Services.AddScoped<IPropertyValuationService, PropertyValuationService>();
builder.Services.AddScoped<IReportService, ReportService>();
```

## API מרכזיים

### משתמשים ואימות

- `POST /api/auth/login` - התחברות
- `POST /api/auth/register` - רישום משתמש חדש

### פרויקטים

- `GET /api/projects` - רשימת פרויקטים
- `GET /api/projects/{id}` - פרטי פרויקט
- `POST /api/projects` - יצירת פרויקט חדש
- `PUT /api/projects/{id}` - עדכון פרויקט
- `DELETE /api/projects/{id}` - מחיקת פרויקט
- `GET /api/projects/status/{status}` - סינון לפי סטטוס
- `GET /api/projects/location/{location}` - סינון לפי מיקום

### מסמכים

- `GET /api/documents` - כל המסמכים
- `GET /api/documents/{id}` - פרטי מסמך
- `GET /api/documents/project/{projectId}` - מסמכי פרויקט
- `POST /api/documents` - העלאת מסמך
- `GET /api/documents/{id}/download` - הורדת מסמך

### נקודות קצה נוספות

(לכל ישות יש נקודות קצה מותאמות לפעולות נדרשות וסינון)

## טיפול בשגיאות ויוצאים מן הכלל

```csharp
try
{
    var createdDocument = await _documentService.CreateDocumentAsync(document, request.File);
    return CreatedAtAction(nameof(GetDocument), new { id = createdDocument.Id }, createdDocument);
}
catch (Exception ex)
{
    return StatusCode(500, $"Internal server error: {ex.Message}");
}
```

## יצירת הגירות מסד נתונים

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## סיכום

מערכת השרת מספקת תשתית מלאה לניהול פרויקטי התחדשות עירונית באמצעות API מודרני, מאובטח וגמיש. היא תוכננה עם דגש על הפרדת שכבות, יכולת הרחבה ותחזוקה, וכוללת את כל היכולות הנדרשות לניהול פרויקטים, מסמכים, לקוחות, מכרזים, הערכות שווי ודוחות.
