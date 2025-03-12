import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Info, Check, Play, Pause, FileSpreadsheet, Calculator } from 'lucide-react';

interface UserGuideProps {
  language: string;
  userRole: string;
  onClose: () => void;
}

const UserGuide: React.FC<UserGuideProps> = ({ language, userRole, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  
  const translations = {
    en: {
      guide: 'Interactive Guide',
      next: 'Next',
      previous: 'Previous',
      skip: 'Skip',
      finish: 'Finish',
      step: 'Step',
      of: 'of',
      autoplay: 'Autoplay',
      developer: {
        title: 'Developer Guide',
        steps: [
          {
            title: 'Welcome to the Developer Dashboard',
            content: 'As a developer, you can manage urban renewal projects, track progress, and communicate with stakeholders.',
            highlight: null
          },
          {
            title: 'Adding a New Project',
            content: 'Click on "Projects" in the sidebar, then click the "Add Project" button to create a new urban renewal project.',
            highlight: 'projects-menu'
          },
          {
            title: 'Managing Properties',
            content: 'Click on "Properties" to view and manage all properties in your projects. You can add new properties by clicking "Add Property".',
            highlight: 'products-menu'
          },
          {
            title: 'Tracking Project Progress',
            content: 'The dashboard shows you real-time progress of all your projects, including approval status, construction phase, and sales metrics.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'Communicating with Stakeholders',
            content: 'Use the "Customers" section to manage communications with residents, authorities, and other stakeholders.',
            highlight: 'customers-menu'
          },
          {
            title: 'Participating in Tenders',
            content: 'View and apply for urban renewal tenders published by local authorities and government offices in the "Tenders" section.',
            highlight: 'tenders-menu'
          }
        ]
      },
      lawyer: {
        title: 'Lawyer Guide',
        steps: [
          {
            title: 'Welcome to the Lawyer Dashboard',
            content: 'As a lawyer, you can manage legal documents, track project approvals, and communicate with clients.',
            highlight: null
          },
          {
            title: 'Managing Documents',
            content: 'Click on "Documents" in the sidebar to upload, organize, and share legal documents related to urban renewal projects.',
            highlight: 'documents-menu'
          },
          {
            title: 'Client Management',
            content: 'Use the "Customers" section to manage your clients, track communications, and schedule meetings.',
            highlight: 'customers-menu'
          },
          {
            title: 'Calendar and Deadlines',
            content: 'The "Calendar" section helps you track important dates, court appearances, and filing deadlines.',
            highlight: 'calendar-menu'
          },
          {
            title: 'Generating Reports',
            content: 'Use the "Reports" section to generate legal status reports for clients and project stakeholders.',
            highlight: 'reports-menu'
          }
        ]
      },
      resident: {
        title: 'Resident Guide',
        steps: [
          {
            title: 'Welcome to the Resident Dashboard',
            content: 'As a resident, you can track project progress, participate in votes, and access important documents.',
            highlight: null
          },
          {
            title: 'Tracking Project Progress',
            content: 'Your dashboard shows the current status of your building\'s renewal project, including approvals, construction phases, and timelines.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'Accessing Documents',
            content: 'Click on "Documents" to view and download important project documents, contracts, and plans.',
            highlight: 'documents-menu'
          },
          {
            title: 'Viewing Properties',
            content: 'The "Properties" section shows details about your building and other properties in the renewal project.',
            highlight: 'products-menu'
          },
          {
            title: 'Project Details',
            content: 'Click on "Projects" to see detailed information about your urban renewal project, including timelines and updates.',
            highlight: 'projects-menu'
          }
        ]
      },
      appraiser: {
        title: 'Appraiser Guide',
        steps: [
          {
            title: 'Welcome to the Appraiser Dashboard',
            content: 'As an appraiser, you can manage property valuations, generate reports, and track market data.',
            highlight: null
          },
          {
            title: 'Property Valuation',
            content: 'Click on "Property Valuation" to create and manage detailed property valuation reports. This is your main workspace.',
            highlight: 'propertyValuation-menu'
          },
          {
            title: 'Property Management',
            content: 'Click on "Properties" to view and manage properties that need valuation. You can see details and history for each property.',
            highlight: 'products-menu'
          },
          {
            title: 'Creating Valuation Reports',
            content: 'In the Property Valuation section, you can create new valuations, apply different methodologies, and generate professional reports.',
            highlight: 'propertyValuation-menu'
          },
          {
            title: 'Dashboard Overview',
            content: 'Your dashboard provides key metrics and pending valuations that require your attention.',
            highlight: 'dashboard-menu'
          }
        ]
      },
      financialAdvisor: {
        title: 'Financial Advisor Guide',
        steps: [
          {
            title: 'Welcome to the Financial Advisor Dashboard',
            content: 'As a financial advisor, you can analyze project finances, create financial models, and advise stakeholders.',
            highlight: null
          },
          {
            title: 'Financial Reports',
            content: 'Use the "Reports" section to generate financial analyses, cash flow projections, and ROI calculations for urban renewal projects.',
            highlight: 'reports-menu'
          },
          {
            title: 'Project Analysis',
            content: 'The dashboard provides key financial metrics for all projects you\'re advising on.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'Client Management',
            content: 'Manage your clients and their financial consultations through the "Customers" section.',
            highlight: 'customers-menu'
          },
          {
            title: 'Document Management',
            content: 'Store and organize financial models, projections, and other financial documents in the "Documents" section.',
            highlight: 'documents-menu'
          }
        ]
      },
      professional: {
        title: 'Professional Consultant Guide',
        steps: [
          {
            title: 'Welcome to the Professional Consultant Dashboard',
            content: 'As a professional consultant, you can manage your expertise areas, track projects, and communicate with clients.',
            highlight: null
          },
          {
            title: 'Client Management',
            content: 'Use the "Customers" section to manage your clients and track consultations.',
            highlight: 'customers-menu'
          },
          {
            title: 'Project Tracking',
            content: 'View all projects you\'re consulting on and their current status.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'Document Management',
            content: 'Store and share professional reports, analyses, and other documents in the "Documents" section.',
            highlight: 'documents-menu'
          },
          {
            title: 'Calendar Management',
            content: 'Schedule consultations, site visits, and meetings using the "Calendar" section.',
            highlight: 'calendar-menu'
          }
        ]
      },
      localAuthority: {
        title: 'Local Authority Guide',
        steps: [
          {
            title: 'Welcome to the Local Authority Dashboard',
            content: 'As a local authority representative, you can track urban renewal projects in your jurisdiction, manage approvals, and monitor compliance.',
            highlight: null
          },
          {
            title: 'Project Overview',
            content: 'Your dashboard shows all urban renewal projects in your jurisdiction and their current status.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'Property Management',
            content: 'View all properties involved in urban renewal projects through the "Properties" section.',
            highlight: 'products-menu'
          },
          {
            title: 'Document Management',
            content: 'Access, review, and approve project documents, permits, and plans in the "Documents" section.',
            highlight: 'documents-menu'
          },
          {
            title: 'Reports and Analytics',
            content: 'Generate reports on urban renewal progress, economic impact, and other metrics using the "Reports" section.',
            highlight: 'reports-menu'
          },
          {
            title: 'Tender Management',
            content: 'Create and manage tenders for urban renewal projects in the "Tenders" section. You can publish new tenders, review applications, and award contracts.',
            highlight: 'tenders-menu'
          }
        ]
      },
      governmentOffice: {
        title: 'Government Office Guide',
        steps: [
          {
            title: 'Welcome to the Government Office Dashboard',
            content: 'As a government representative, you can monitor urban renewal projects nationwide, track policy implementation, and analyze trends.',
            highlight: null
          },
          {
            title: 'National Project Overview',
            content: 'Your dashboard provides a high-level view of urban renewal projects across the country.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'Project Details',
            content: 'Click on "Projects" to view detailed information about specific urban renewal initiatives.',
            highlight: 'projects-menu'
          },
          {
            title: 'Property Database',
            content: 'The "Properties" section gives you access to the national database of properties in urban renewal projects.',
            highlight: 'products-menu'
          },
          {
            title: 'Reports and Analytics',
            content: 'Generate comprehensive reports on urban renewal progress, challenges, and outcomes using the "Reports" section.',
            highlight: 'reports-menu'
          },
          {
            title: 'Tender Management',
            content: 'Create and manage national tenders for urban renewal projects in the "Tenders" section. You can publish new tenders, review applications, and award contracts.',
            highlight: 'tenders-menu'
          }
        ]
      }
    },
    he: {
      guide: 'מדריך אינטראקטיבי',
      next: 'הבא',
      previous: 'הקודם',
      skip: 'דלג',
      finish: 'סיים',
      step: 'שלב',
      of: 'מתוך',
      autoplay: 'הפעלה אוטומטית',
      developer: {
        title: 'מדריך ליזם',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של היזם',
            content: 'כיזם, באפשרותך לנהל פרויקטי התחדשות עירונית, לעקוב אחר התקדמות ולתקשר עם בעלי עניין.',
            highlight: null
          },
          {
            title: 'הוספת פרויקט חדש',
            content: 'לחץ על "פרויקטים" בסרגל הצד, ואז לחץ על כפתור "הוספת פרויקט" כדי ליצור פרויקט התחדשות עירונית חדש.',
            highlight: 'projects-menu'
          },
          {
            title: 'ניהול נכסים',
            content: 'לחץ על "נכסים" כדי לצפות ולנהל את כל הנכסים בפרויקטים שלך. תוכל להוסיף נכסים חדשים על ידי לחיצה על "הוספת נכס".',
            highlight: 'products-menu'
          },
          {
            title: 'מעקב אחר התקדמות הפרויקט',
            content: 'לוח הבקרה מציג לך התקדמות בזמן אמת של כל הפרויקטים שלך, כולל סטטוס אישורים, שלב בנייה ומדדי מכירות.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'תקשורת עם בעלי עניין',
            content: 'השתמש בסעיף "לקוחות" כדי לנהל תקשורת עם דיירים, רשויות ובעלי עניין אחרים.',
            highlight: 'customers-menu'
          },
          {
            title: 'השתתפות במכרזים',
            content: 'צפה והגש הצעות למכרזי התחדשות עירונית שפורסמו על ידי רשויות מקומיות ומשרדי ממשלה בסעיף "מכרזים".',
            highlight: 'tenders-menu'
          }
        ]
      },
      lawyer: {
        title: 'מדריך לעורך דין',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של עורך הדין',
            content: 'כעורך דין, באפשרותך לנהל מסמכים משפטיים, לעקוב אחר אישורי פרויקטים ולתקשר עם לקוחות.',
            highlight: null
          },
          {
            title: 'ניהול מסמכים',
            content: 'לחץ על "מסמכים" בסרגל הצד כדי להעלות, לארגן ולשתף מסמכים משפטיים הקשורים לפרויקטי התחדשות עירונית.',
            highlight: 'documents-menu'
          },
          {
            title: 'ניהול לקוחות',
            content: 'השתמש בסעיף "לקוחות" כדי לנהל את הלקוחות שלך, לעקוב אחר תקשורת ולתזמן פגישות.',
            highlight: 'customers-menu'
          },
          {
            title: 'יומן ומועדי סיום',
            content: 'סעיף "יומן" עוזר לך לעקוב אחר תאריכים חשובים, הופעות בבית משפט ומועדי הגשה.',
            highlight: 'calendar-menu'
          },
          {
            title: 'יצירת דוחות',
            content: 'השתמש בסעיף "דוחות" כדי ליצור דוחות סטטוס משפטיים עבור לקוחות ובעלי עניין בפרויקט.',
            highlight: 'reports-menu'
          }
        ]
      },
      resident: {
        title: 'מדריך לדייר',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של הדייר',
            content: 'כדייר, באפשרותך לעקוב אחר התקדמות הפרויקט, להשתתף בהצבעות ולגשת למסמכים חשובים.',
            highlight: null
          },
          {
            title: 'מעקב אחר התקדמות הפרויקט',
            content: 'לוח הבקרה שלך מציג את הסטטוס הנוכחי של פרויקט ההתחדשות של הבניין שלך, כולל אישורים, שלבי בנייה ולוחות זמנים.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'גישה למסמכים',
            content: 'לחץ על "מסמכים" כדי לצפות ולהוריד מסמכי פרויקט חשובים, חוזים ותוכניות.',
            highlight: 'documents-menu'
          },
          {
            title: 'צפייה בנכסים',
            content: 'סעיף "נכסים" מציג פרטים על הבניין שלך ונכסים אחרים בפרויקט ההתחדשות.',
            highlight: 'products-menu'
          },
          {
            title: 'פרטי פרויקט',
            content: 'לחץ על "פרויקטים" כדי לראות מידע מפורט על פרויקט ההתחדשות העירונית שלך, כולל לוחות זמנים ועדכונים.',
            highlight: 'projects-menu'
          }
        ]
      },
      appraiser: {
        title: 'מדריך לשמאי',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של השמאי',
            content: 'כשמאי, באפשרותך לנהל הערכות שווי נכסים, ליצור דוחות שמאות ולעקוב אחר נתוני שוק.',
            highlight: null
          },
          {
            title: 'הערכת שווי נכסים',
            content: 'לחץ על "הערכת שווי נכסים" כדי ליצור ולנהל דוחות הערכת שווי מפורטים. זהו מרחב העבודה העיקרי שלך.',
            highlight: 'propertyValuation-menu'
          },
          {
            title: 'ניהול נכסים',
            content: 'לחץ על "נכסים" כדי לצפות ולנהל נכסים הזקוקים להערכה. תוכל לראות פרטים והיסטוריה עבור כל נכס.',
            highlight: 'products-menu'
          },
          {
            title: 'יצירת דוחות הערכה',
            content: 'בסעיף הערכת שווי נכסים, תוכל ליצור הערכות חדשות, להשתמש בשיטות הערכה שונות ולהפיק דוחות מקצועיים.',
            highlight: 'propertyValuation-menu'
          },
          {
            title: 'סקירת לוח הבקרה',
            content: 'לוח הבקרה שלך מספק מדדים מרכזיים והערכות ממתינות הדורשות את תשומת לבך.',
            highlight: 'dashboard-menu'
          }
        ]
      },
      financialAdvisor: {
        title: 'מדריך ליועץ פיננסי',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של היועץ הפיננסי',
            content: 'כיועץ פיננסי, באפשרותך לנתח את כספי הפרויקט, ליצור מודלים פיננסיים ולייעץ לבעלי עניין.',
            highlight: null
          },
          {
            title: 'דוחות פיננסיים',
            content: 'השתמש בסעיף "דוחות" כדי ליצור ניתוחים פיננסיים, תחזיות תזרים מזומנים וחישובי ROI עבור פרויקטי התחדשות עירונית.',
            highlight: 'reports-menu'
          },
          {
            title: 'ניתוח פרויקטים',
            content: 'לוח הבקרה מספק מדדים פיננסיים מרכזיים עבור כל הפרויקטים שאתה מייעץ להם.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'ניהול לקוחות',
            content: 'נהל את הלקוחות שלך ואת הייעוץ הפיננסי שלהם באמצעות סעיף "לקוחות".',
            highlight: 'customers-menu'
          },
          {
            title: 'ניהול מסמכים',
            content: 'אחסן וארגן מודלים פיננסיים, תחזיות ומסמכים פיננסיים אחרים בסעיף "מסמכים".',
            highlight: 'documents-menu'
          }
        ]
      },
      professional: {
        title: 'מדריך ליועץ מקצועי',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של היועץ המקצועי',
            content: 'כיועץ מקצועי, באפשרותך לנהל את תחומי המומחיות שלך, לעקוב אחר פרויקטים ולתקשר עם לקוחות.',
            highlight: null
          },
          {
            title: 'ניהול לקוחות',
            content: 'השתמש בסעיף "לקוחות" כדי לנהל את הלקוחות שלך ולעקוב אחר ייעוץ.',
            highlight: 'customers-menu'
          },
          {
            title: 'מעקב אחר פרויקטים',
            content: 'צפה בכל הפרויקטים שאתה מייעץ להם ובסטטוס הנוכחי שלהם.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'ניהול מסמכים',
            content: 'אחסן ושתף דוחות מקצועיים, ניתוחים ומסמכים אחרים בסעיף "מסמכים".',
            highlight: 'documents-menu'
          },
          {
            title: 'ניהול יומן',
            content: 'תזמן ייעוץ, ביקורים באתר ופגישות באמצעות סעיף "יומן".',
            highlight: 'calendar-menu'
          }
        ]
      },
      localAuthority: {
        title: 'מדריך לרשות מקומית',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של הרשות המקומית',
            content: 'כנציג רשות מקומית, באפשרותך לעקוב אחר פרויקטי התחדשות עירונית בתחום השיפוט שלך, לנהל אישורים ולפקח על עמידה בדרישות.',
            highlight: null
          },
          {
            title: 'סקירת פרויקטים',
            content: 'לוח הבקרה שלך מציג את כל פרויקטי ההתחדשות העירונית בתחום השיפוט שלך ואת הסטטוס הנוכחי שלהם.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'ניהול נכסים',
            content: 'צפה בכל הנכסים המעורבים בפרויקטי התחדשות עירונית באמצעות סעיף "נכסים".',
            highlight: 'products-menu'
          },
          {
            title: 'ניהול מסמכים',
            content: 'גש, סקור ואשר מסמכי פרויקט, היתרים ותוכניות בסעיף "מסמכים".',
            highlight: 'documents-menu'
          },
          {
            title: 'דוחות וניתוחים',
            content: 'צור דוחות על התקדמות ההתחדשות העירונית, השפעה כלכלית ומדדים אחרים באמצעות סעיף "דוחות".',
            highlight: 'reports-menu'
          },
          {
            title: 'ניהול מכרזים',
            content: 'צור ונהל מכרזים לפרויקטי התחדשות עירונית בסעיף "מכרזים". תוכל לפרסם מכרזים חדשים, לבחון הצעות ולהעניק חוזים.',
            highlight: 'tenders-menu'
          }
        ]
      },
      governmentOffice: {
        title: 'מדריך למשרד ממשלתי',
        steps: [
          {
            title: 'ברוכים הבאים ללוח הבקרה של המשרד הממשלתי',
            content: 'כנציג ממשלתי, באפשרותך לפקח על פרויקטי התחדשות עירונית ברחבי המדינה, לעקוב אחר יישום מדיניות ולנתח מגמות.',
            highlight: null
          },
          {
            title: 'סקירת פרויקטים ארצית',
            content: 'לוח הבקרה שלך מספק תצוגה ברמה גבוהה של פרויקטי התחדשות עירונית ברחבי המדינה.',
            highlight: 'dashboard-menu'
          },
          {
            title: 'פרטי פרויקט',
            content: 'לחץ על "פרויקטים" כדי לצפות במידע מפורט על יוזמות התחדשות עירונית ספציפיות.',
            highlight: 'projects-menu'
          },
          {
            title: 'מאגר נכסים',
            content: 'סעיף "נכסים" נותן לך גישה למאגר הנתונים הלאומי של נכסים בפרויקטי התחדשות עירונית.',
            highlight: 'products-menu'
          },
          {
            title: 'דוחות וניתוחים',
            content: 'צור דוחות מקיפים על התקדמות ההתחדשות העירונית, אתגרים ותוצאות באמצעות סעיף "דוחות".',
            highlight: 'reports-menu'
          },
          {
            title: 'ניהול מכרזים',
            content: 'צור ונהל מכרזים ארציים לפרויקטי התחדשות עירונית בסעיף "מכרזים". תוכל לפרסם מכרזים חדשים, לבחון הצעות ולהעניק חוזים.',
            highlight: 'tenders-menu'
          }
        ]
      }
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';
  
  // Get the appropriate guide based on user role
  const roleGuide = t[userRole as keyof typeof t] || t.developer;
  const steps = roleGuide.steps;
  
  // Auto-advance steps
  useEffect(() => {
    let timer: number | null = null;
    
    if (isPlaying && currentStep < steps.length - 1) {
      timer = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 5000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStep, isPlaying, steps.length]);
  
  // Handle highlighting elements
  useEffect(() => {
    // Remove any existing highlights
    document.querySelectorAll('.guide-highlight').forEach(el => {
      el.classList.remove('guide-highlight');
    });
    
    // Add highlight to current element if specified
    const currentHighlight = steps[currentStep]?.highlight;
    if (currentHighlight) {
      const element = document.getElementById(currentHighlight);
      if (element) {
        element.classList.add('guide-highlight');
        setHighlightedElement(currentHighlight);
      }
    } else {
      setHighlightedElement(null);
    }
    
    return () => {
      // Clean up highlights when component unmounts
      document.querySelectorAll('.guide-highlight').forEach(el => {
        el.classList.remove('guide-highlight');
      });
    };
  }, [currentStep, steps]);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{roleGuide.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">{steps[currentStep].title}</h3>
            <p className="text-gray-600">{steps[currentStep].content}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={toggleAutoplay}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              {isPlaying ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
              {t.autoplay}
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4">
              {t.step} {currentStep + 1} {t.of} {steps.length}
            </span>
            
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`p-2 rounded-md mr-2 ${
                currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {currentStep < steps.length - 1 ? t.next : t.finish}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;