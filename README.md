# פרויקט התחדשות עירונית (Urban Renewal Project)

מערכת ניהול לפרויקטי התחדשות עירונית המשלבת צד שרת ב-.NET 8 וצד לקוח ב-React עם TypeScript.

## מבנה הפרויקט

הפרויקט מורכב משני חלקים עיקריים:

### צד לקוח (Client)

מיקום: `reactappurbanrenewal.client/`

- **טכנולוגיות**: React, TypeScript, Vite, Tailwind CSS
- **ניהול מצב**: Context API
- **אחסון נתונים**: Supabase
- **רכיבים**: לוח מחוונים, ניהול פרויקטים, לקוחות, מסמכים, מכרזים, הערכות שווי, דוחות

### צד שרת (Server)

מיקום: `ReactAppUrbanRenewal.Server/`

- **טכנולוגיות**: ASP.NET Core 8, Entity Framework Core
- **מסד נתונים**: MS SQL Server
- **אבטחה**: JWT, תפקידים והרשאות
- **API מלא**: ניהול משתמשים, פרויקטים, מסמכים, מכרזים, הערכות שווי, דוחות

## מודלים עיקריים

### User (משתמש)

- מידע משתמש בסיסי
- אימות וניהול הרשאות
- תפקידים: מנהל, מנהל פרויקט, משתמש רגיל

### Project (פרויקט)

- נתוני פרויקט בסיסיים
- מיקום ומידע גיאוגרפי
- פרטי בניין ונכסים
- סטטוס ולוחות זמנים
- תקציב ומדדים כלכליים

### Customer (לקוח)

- נתוני לקוח בסיסיים
- סוגי לקוחות (דיירים, עסקים, רשויות)
- קשר לפרויקטים

### Document (מסמך)

- ניהול קבצים ומסמכים
- קישור לפרויקטים
- סוגי מסמכים (חוזים, היתרים, רישיונות)
- מעקב תוקף

### Tender (מכרז)

- מידע מכרז
- תהליך פרסום והגשה
- הענקת מכרזים וניהול זוכים

### PropertyValuation (הערכת שווי)

- הערכות שווי נכסים
- השוואת מחירים לפני/אחרי התחדשות
- שיטות הערכה שונות

### Report (דוח)

- דוחות סטטוס וביצוע
- דוחות כלכליים ופיננסיים
- דוחות השפעה חברתית וסביבתית

## ארכיטקטורה

### צד שרת

```
ReactAppUrbanRenewal.Server/
├── Controllers/       # בקרים לניהול בקשות API
├── Models/            # מודלים ואובייקטי נתונים
├── Data/              # הגדרות מסד נתונים וקונטקסט
├── Services/          # שירותים עסקיים
├── Program.cs         # הגדרות אפליקציה
└── appsettings.json   # הגדרות תצורה
```

### צד לקוח

```
reactappurbanrenewal.client/
├── src/
│   ├── components/    # רכיבי React
│   ├── context/       # ניהול מצב אפליקציה
│   ├── hooks/         # הוקים מותאמים אישית
│   ├── lib/           # ספריות ושירותים
│   └── types/         # הגדרות TypeScript
└── supabase/          # הגדרות Supabase
```

## תכונות עיקריות

1. **ניהול פרויקטים**

   - יצירה, עריכה וניהול פרויקטי התחדשות עירונית
   - מעקב אחר מצב הפרויקט, תקציב ולוחות זמנים

2. **ניהול לקוחות**

   - ניהול דיירים, בעלי עסקים ורשויות
   - קישור לקוחות לפרויקטים
   - ניהול פרטי קשר ותקשורת

3. **ניהול מסמכים**

   - העלאה וארגון מסמכים
   - חיפוש וסינון
   - ניהול גרסאות ותוקף

4. **ניהול מכרזים**

   - פרסום והפצת מכרזים
   - מעקב אחר הגשות
   - ניהול זוכי מכרזים

5. **הערכות שווי נכסים**

   - תיעוד הערכות שווי
   - ניתוח השוואתי
   - חיזוי ערך לאחר התחדשות

6. **דוחות וניתוח**

   - דוחות ביצוע
   - מדדים פיננסיים
   - הערכת השפעה חברתית וסביבתית

7. **אבטחה**
   - אימות משתמשים
   - ניהול הרשאות מבוסס תפקידים
   - אבטחת נתונים ופרטיות

## התקנה והפעלה

### דרישות מקדימות

- .NET 8 SDK
- Node.js 18+
- SQL Server (או שימוש ב-LocalDB)
- חשבון Supabase (אופציונלי)

### הפעלת השרת

```bash
cd ReactAppUrbanRenewal.Server
dotnet restore
dotnet run
```

### הפעלת צד הלקוח

```bash
cd reactappurbanrenewal.client
npm install
npm run dev
```

## עמודים וממשק משתמש

1. **התחברות ורישום**

   - מסך התחברות
   - מסך רישום משתמש חדש
   - איפוס סיסמה

2. **לוח מחוונים ראשי**

   - סקירת פרויקטים
   - מדדים מרכזיים
   - התראות ותזכורות

3. **ניהול פרויקטים**

   - צפייה ועריכת פרטי פרויקט
   - ניהול משימות ולוחות זמנים
   - מעקב תקציבי

4. **ניהול מסמכים**

   - גלריית מסמכים
   - העלאה וארגון
   - חיפוש וסינון

5. **ניהול מכרזים**

   - יצירה ועריכת מכרזים
   - מעקב אחר הגשות
   - ניהול החלטות

6. **הערכות שווי**

   - רישום וניהול הערכות
   - גרפים ונתונים השוואתיים
   - חיזויים וסימולציות

7. **דוחות**
   - יצירת דוחות
   - ניתוח נתונים
   - ייצוא ושיתוף

## טכנולוגיות נוספות

- **Tailwind CSS** - עיצוב ממשק משתמש
- **JWT** - אימות ואבטחה
- **Entity Framework Core** - גישה למסד נתונים
- **Swagger** - תיעוד API
- **Supabase** - אחסון ענן ואימות

## תוכניות עתידיות

1. **יכולות GIS ומיפוי**

   - הצגת פרויקטים על מפה
   - ניתוח מרחבי

2. **אינטגרציה עם רשויות**

   - ממשקים למערכות עירוניות
   - הגשת מסמכים אוטומטית

3. **שימוש בבינה מלאכותית**

   - חיזוי ערכי נדל"ן
   - המלצות תכנון

4. **תמיכה במובייל**
   - אפליקציית מובייל מלאה
   - התראות בזמן אמת

## תרומה ופיתוח

הפרויקט מפותח כמערכת פנימית ואינו פתוח לתרומות חיצוניות בשלב זה.
