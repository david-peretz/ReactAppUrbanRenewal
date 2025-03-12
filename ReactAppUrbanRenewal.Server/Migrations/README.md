# הנחיות יצירת מסד הנתונים

מסמך זה מכיל הוראות להקמת מסד הנתונים עבור פרויקט התחדשות עירונית.

## דרישות מקדימות

- SQL Server (LocalDB, Express, או גרסה מלאה)
- הרשאות מתאימות ליצירת מסד נתונים חדש

## הגדרות חיבור מסד הנתונים

חיבור מסד הנתונים מוגדר בקובץ `appsettings.json` במשתנה `ConnectionStrings:DefaultConnection`.
ברירת המחדל היא LocalDB:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=UrbanRenewalDb;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```

## אפשרויות להקמת מסד הנתונים

### אפשרות 1: הקמת המסד באמצעות Entity Framework (מומלץ)

Entity Framework משולב במערכת והוא יכול ליצור ולעדכן את מסד הנתונים באופן אוטומטי.

1. ודאו שהכלי `dotnet-ef` מותקן:

   ```
   dotnet tool install --global dotnet-ef
   ```

2. בצעו את פקודת ההגירה מתיקיית הפרויקט:
   ```
   cd ReactAppUrbanRenewal.Server
   dotnet ef database update
   ```

### אפשרות 2: הקמת המסד באמצעות קובץ SQL ישירות

ניתן להריץ את קובץ ה-SQL הבא ישירות מול שרת ה-SQL:

```
ReactAppUrbanRenewal.Server/Migrations/InitialMigration.sql
```

ניתן להריץ את הקובץ באחת מהדרכים הבאות:

1. באמצעות SQL Server Management Studio
2. באמצעות Azure Data Studio
3. באמצעות הכלי `sqlcmd`:
   ```
   sqlcmd -S (localdb)\mssqllocaldb -i InitialMigration.sql
   ```

## מבנה מסד הנתונים

המיגרציה מקימה את הטבלאות הבאות:

- **Users** - משתמשי המערכת
- **Projects** - פרויקטי התחדשות עירונית
- **Customers** - לקוחות ומשתתפי פרויקטים
- **CustomerProjects** - קשר רבים-לרבים בין לקוחות לפרויקטים
- **Documents** - מסמכים מקושרים לפרויקטים
- **Tenders** - מכרזים
- **PropertyValuations** - הערכות שווי נכסים
- **Reports** - דוחות וסקירות

## נתוני אתחול

המיגרציה מאתחלת משתמש מנהל מערכת אחד:

- **שם משתמש**: admin
- **אימייל**: admin@urbanrenewal.com
- **סיסמה**: Admin123! (מוצפנת במסד הנתונים)
- **תפקיד**: Administrator

## פתרון בעיות

אם מתרחשות שגיאות במהלך יצירת מסד הנתונים:

1. ודאו שיש לכם הרשאות מתאימות לשרת ה-SQL
2. ודאו שהחיבור בקובץ ה-`appsettings.json` תקין
3. בדקו שאין כבר מסד נתונים קיים עם אותו שם, או מחקו אותו אם התחלתם מחדש
