import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Filter, Download, AlertCircle, FileText, X, MapPin, Mail, Phone } from 'lucide-react';
import { tendersApi } from '../lib/api';

interface TendersProps {
  language: string;
  initialTenderId?: number | null;
  userRole?: string;
}

interface Tender {
  id: number;
  name: string;
  publisher: string;
  deadline: string;
  status: string;
  budget: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  projectType: string;
  tenderNumber: string;
  publishDate: string;
  questionDeadline: string;
  applicantsCount: number;
  requirements: string[];
  documents: {
    name: string;
    type: string;
  }[];
}

interface Application {
  id: number;
  tenderId: number;
  tenderName: string;
  companyName: string;
  submissionDate: string;
  status: string;
  proposal: string;
}

const Tenders: React.FC<TendersProps> = ({ language, initialTenderId = null, userRole = 'developer' }) => {
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  // Commented out unused states for now
  // const [showApplicationModal, setShowApplicationModal] = useState(false);
  // const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // New state variables for API data
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch tenders from API
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setLoading(true);
        // In a real app, you'd get the token from auth context
        // For demo, we're using a dummy token
        const tendersData = await tendersApi.getAll("dummy-token");
        if (tendersData && Array.isArray(tendersData)) {
          setTenders(tendersData);
          console.log("Fetched tenders from API:", tendersData);
        } else {
          // Fallback to sample data if API returns empty or invalid data
          console.warn("API returned invalid data, falling back to sample data");
          setTenders(sampleTenders);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching tenders:", err);
        setError("Failed to load tenders from API, using sample data instead");
        // Fallback to sample data if API fails
        setTenders(sampleTenders);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);
  
  const translations = {
    en: {
      tenders: 'Tenders',
      search: 'Search tenders...',
      addTender: 'Add Tender',
      filter: 'Filter',
      export: 'Export',
      name: 'Name',
      publisher: 'Publisher',
      deadline: 'Deadline',
      status: 'Status',
      budget: 'Budget',
      actions: 'Actions',
      open: 'Open',
      closed: 'Closed',
      awarded: 'Awarded',
      draft: 'Draft',
      edit: 'Edit',
      delete: 'Delete',
      apply: 'Apply',
      detailsHeader: 'Tender Details',
      description: 'Description',
      requirements: 'Requirements',
      documents: 'Documents',
      save: 'Save',
      cancel: 'Cancel',
      startDate: 'Start Date',
      endDate: 'End Date',
      location: 'Location',
      contactPerson: 'Contact Person',
      email: 'Email',
      phone: 'Phone',
      projectType: 'Project Type',
      tama38: 'TAMA 38',
      pinuiBinui: 'Pinui-Binui',
      urbanRenewalOther: 'Other Urban Renewal',
      all: 'All Tenders',
      myTenders: 'My Tenders',
      applied: 'Applied',
      published: 'Published',
      applyForTender: 'Apply for Tender',
      companyName: 'Company Name',
      experience: 'Experience',
      proposal: 'Proposal',
      attachments: 'Attachments',
      submit: 'Submit Application',
      applicants: 'Applicants',
      viewApplicants: 'View Applicants',
      downloadDocuments: 'Download Documents',
      publishTender: 'Publish Tender',
      saveDraft: 'Save as Draft',
      requiredDocuments: 'Required Documents',
      eligibilityCriteria: 'Eligibility Criteria',
      evaluationCriteria: 'Evaluation Criteria',
      projectScope: 'Project Scope',
      estimatedValue: 'Estimated Value',
      projectDuration: 'Project Duration',
      months: 'months',
      uploadProposal: 'Upload Proposal',
      browseFiles: 'Browse Files',
      dragAndDrop: 'Drag and drop files here',
      tenderNumber: 'Tender Number',
      publishDate: 'Publish Date',
      questionDeadline: 'Question Deadline',
      applicantsCount: 'Applicants',
      cannotApply: 'As a local authority or government office, you cannot apply for tenders. You can only create and manage tenders.',
      applicationDetails: 'Application Details',
      submissionDate: 'Submission Date',
      tenderDetails: 'Tender Details',
      loading: 'Loading tenders...',
      error: 'Error loading tenders'
    },
    he: {
      tenders: 'מכרזים',
      search: 'חיפוש מכרזים...',
      addTender: 'הוספת מכרז',
      filter: 'סינון',
      export: 'ייצוא',
      name: 'שם',
      publisher: 'מפרסם',
      deadline: 'תאריך אחרון',
      status: 'סטטוס',
      budget: 'תקציב',
      actions: 'פעולות',
      open: 'פתוח',
      closed: 'סגור',
      awarded: 'הוענק',
      draft: 'טיוטה',
      edit: 'עריכה',
      delete: 'מחיקה',
      apply: 'הגש הצעה',
      detailsHeader: 'פרטי מכרז',
      description: 'תיאור',
      requirements: 'דרישות',
      documents: 'מסמכים',
      save: 'שמירה',
      cancel: 'ביטול',
      startDate: 'תאריך פרסום',
      endDate: 'תאריך סיום',
      location: 'מיקום',
      contactPerson: 'איש קשר',
      email: 'אימייל',
      phone: 'טלפון',
      projectType: 'סוג פרויקט',
      tama38: 'תמ"א 38',
      pinuiBinui: 'פינוי-בינוי',
      urbanRenewalOther: 'התחדשות עירונית אחר',
      all: 'כל המכרזים',
      myTenders: 'המכרזים שלי',
      applied: 'הוגשו',
      published: 'פורסמו',
      applyForTender: 'הגשת הצעה למכרז',
      companyName: 'שם החברה',
      experience: 'ניסיון',
      proposal: 'הצעה',
      attachments: 'קבצים מצורפים',
      submit: 'הגש הצעה',
      applicants: 'מגישים',
      viewApplicants: 'צפה במגישים',
      downloadDocuments: 'הורד מסמכים',
      publishTender: 'פרסם מכרז',
      saveDraft: 'שמור כטיוטה',
      requiredDocuments: 'מסמכים נדרשים',
      eligibilityCriteria: 'תנאי סף',
      evaluationCriteria: 'קריטריוני הערכה',
      projectScope: 'היקף הפרויקט',
      estimatedValue: 'ערך משוער',
      projectDuration: 'משך הפרויקט',
      months: 'חודשים',
      uploadProposal: 'העלאת הצעה',
      browseFiles: 'בחר קבצים',
      dragAndDrop: 'גרור ושחרר קבצים כאן',
      tenderNumber: 'מספר מכרז',
      publishDate: 'תאריך פרסום',
      questionDeadline: 'מועד אחרון לשאלות',
      applicantsCount: 'מגישים',
      cannotApply: 'כרשות מקומית או משרד ממשלתי, אינך יכול להגיש הצעות למכרזים. באפשרותך רק ליצור ולנהל מכרזים.',
      applicationDetails: 'פרטי הגשה',
      submissionDate: 'תאריך הגשה',
      tenderDetails: 'פרטי מכרז',
      loading: 'טוען מכרזים...',
      error: 'שגיאה בטעינת מכרזים'
    }
  };

  const t = translations[language as keyof typeof translations];
  const isRTL = language === 'he'; // Used for RTL layout

  // Sample data as a fallback
  const sampleTenders: Tender[] = [
    { 
      id: 1, 
      name: 'פינוי-בינוי מתחם הרצל, תל אביב', 
      publisher: 'עיריית תל אביב-יפו', 
      deadline: '2023-08-15', 
      status: 'open',
      budget: '₪450,000,000',
      description: 'מכרז לביצוע פרויקט פינוי-בינוי במתחם הרצל בתל אביב. הפרויקט כולל הריסת 8 בניינים ישנים ובניית 4 מגדלי מגורים חדשים עם סה"כ 320 יחידות דיור.',
      startDate: '2023-06-01',
      endDate: '2023-08-15',
      location: 'מתחם הרצל, תל אביב',
      contactPerson: 'ישראל ישראלי',
      email: 'israel@tlv.gov.il',
      phone: '03-1234567',
      projectType: 'pinuiBinui',
      tenderNumber: 'TLV-2023-45',
      publishDate: '2023-06-01',
      questionDeadline: '2023-07-15',
      applicantsCount: 12,
      requirements: [
        'ניסיון מוכח של לפחות 5 שנים בפרויקטי פינוי-בינוי',
        'ביצוע של לפחות 3 פרויקטי פינוי-בינוי בהיקף של 200 יחידות דיור ומעלה',
        'איתנות פיננסית - הון עצמי של לפחות 100 מיליון ₪',
        'צוות מקצועי הכולל אדריכל, מהנדס, יועץ תנועה ויועץ חברתי'
      ],
      documents: [
        { name: 'מסמכי המכרז המלאים', type: 'PDF' },
        { name: 'תשריט המתחם', type: 'PDF' },
        { name: 'פרוגרמה תכנונית', type: 'DOCX' },
        { name: 'הסכם התקשרות', type: 'PDF' }
      ]
    },
    { 
      id: 2, 
      name: 'תמ"א 38/2 רחוב ביאליק, רמת גן', 
      publisher: 'עיריית רמת גן', 
      deadline: '2023-07-30', 
      status: 'open',
      budget: '₪85,000,000',
      description: 'מכרז לביצוע פרויקט תמ"א 38/2 (הריסה ובנייה) ברחוב ביאליק ברמת גן. הפרויקט כולל הריסת מבנה בן 4 קומות והקמת בניין חדש בן 9 קומות עם 36 יחידות דיור.',
      startDate: '2023-05-15',
      endDate: '2023-07-30',
      location: 'רחוב ביאליק 45, רמת גן',
      contactPerson: 'רונית כהן',
      email: 'ronit@ramat-gan.gov.il',
      phone: '03-9876543',
      projectType: 'tama38',
      tenderNumber: 'RG-2023-28',
      publishDate: '2023-05-15',
      questionDeadline: '2023-07-01',
      applicantsCount: 8,
      requirements: [
        'ניסיון מוכח של לפחות 3 שנים בפרויקטי תמ"א 38',
        'ביצוע של לפחות 2 פרויקטי תמ"א 38/2 בהיקף של 20 יחידות דיור ומעלה',
        'איתנות פיננסית - הון עצמי של לפחות 30 מיליון ₪',
        'צוות מקצועי הכולל אדריכל ומהנדס'
      ],
      documents: [
        { name: 'מסמכי המכרז המלאים', type: 'PDF' },
        { name: 'תשריט המבנה', type: 'PDF' },
        { name: 'דו"ח קרקע', type: 'PDF' },
        { name: 'הסכם התקשרות', type: 'PDF' }
      ]
    },
    { 
      id: 3, 
      name: 'התחדשות עירונית מתחם העיריה, חולון', 
      publisher: 'עיריית חולון', 
      deadline: '2023-09-30', 
      status: 'open',
      budget: '₪750,000,000',
      description: 'מכרז לביצוע פרויקט התחדשות עירונית במתחם העיריה בחולון. הפרויקט כולל הקמת מתחם מגורים, מסחר ומשרדים. הפרויקט כולל 5 מגדלים עם סה"כ 450 יחידות דיור ו-15,000 מ"ר שטחי מסחר ומשרדים.',
      startDate: '2023-06-15',
      endDate: '2023-09-30',
      location: 'מתחם העיריה, חולון',
      contactPerson: 'משה לוי',
      email: 'moshe@holon.gov.il',
      phone: '03-5654321',
      projectType: 'urbanRenewalOther',
      tenderNumber: 'HOL-2023-56',
      publishDate: '2023-06-15',
      questionDeadline: '2023-08-15',
      applicantsCount: 5,
      requirements: [
        'ניסיון מוכח של לפחות 7 שנים בפרויקטי התחדשות עירונית',
        'ביצוע של לפחות 2 פרויקטים משולבים (מגורים ומסחר) בהיקף של 300 יחידות דיור ומעלה',
        'איתנות פיננסית - הון עצמי של לפחות 200 מיליון ₪',
        'צוות מקצועי הכולל אדריכל, מהנדס, יועץ תנועה, יועץ סביבה ויועץ חברתי'
      ],
      documents: [
        { name: 'מסמכי המכרז המלאים', type: 'PDF' },
        { name: 'תשריט המתחם', type: 'PDF' },
        { name: 'פרוגרמה תכנונית', type: 'DOCX' },
        { name: 'דו"ח כלכלי', type: 'XLSX' },
        { name: 'הסכם התקשרות', type: 'PDF' }
      ]
    },
    { 
      id: 4, 
      name: 'פינוי-בינוי שכונת רייספלד, קרית אונו', 
      publisher: 'עיריית קרית אונו', 
      deadline: '2023-07-15', 
      status: 'closed',
      budget: '₪650,000,000',
      description: 'מכרז לביצוע פרויקט פינוי-בינוי בשכונת רייספלד בקרית אונו. הפרויקט כולל הריסת 12 בניינים ישנים ובניית 6 מגדלי מגורים חדשים עם סה"כ 480 יחידות דיור.',
      startDate: '2023-04-01',
      endDate: '2023-07-15',
      location: 'שכונת רייספלד, קרית אונו',
      contactPerson: 'דוד כהן',
      email: 'david@kiryatono.gov.il',
      phone: '03-7654321',
      projectType: 'pinuiBinui',
      tenderNumber: 'KO-2023-32',
      publishDate: '2023-04-01',
      questionDeadline: '2023-06-01',
      applicantsCount: 15,
      requirements: [
        'ניסיון מוכח של לפחות 5 שנים בפרויקטי פינוי-בינוי',
        'ביצוע של לפחות 2 פרויקטי פינוי-בינוי בהיקף של 300 יחידות דיור ומעלה',
        'איתנות פיננסית - הון עצמי של לפחות 150 מיליון ₪',
        'צוות מקצועי הכולל אדריכל, מהנדס, יועץ תנועה ויועץ חברתי'
      ],
      documents: [
        { name: 'מסמכי המכרז המלאים', type: 'PDF' },
        { name: 'תשריט המתחם', type: 'PDF' },
        { name: 'פרוגרמה תכנונית', type: 'DOCX' },
        { name: 'הסכם התקשרות', type: 'PDF' }
      ]
    },
    { 
      id: 5, 
      name: 'תמ"א 38/1 רחוב ארלוזורוב, תל אביב', 
      publisher: 'עיריית תל אביב-יפו', 
      deadline: '2023-08-30', 
      status: 'open',
      budget: '₪12,000,000',
      description: 'מכרז לביצוע פרויקט תמ"א 38/1 (חיזוק ותוספת) ברחוב ארלוזורוב בתל אביב. הפרויקט כולל חיזוק מבנה קיים, הוספת 2 קומות ותוספת של 8 יחידות דיור חדשות.',
      startDate: '2023-06-01',
      endDate: '2023-08-30',
      location: 'רחוב ארלוזורוב 78, תל אביב',
      contactPerson: 'מיכל לוי',
      email: 'michal@tlv.gov.il',
      phone: '03-1234567',
      projectType: 'tama38',
      tenderNumber: 'TLV-2023-48',
      publishDate: '2023-06-01',
      questionDeadline: '2023-07-30',
      applicantsCount: 6,
      requirements: [
        'ניסיון מוכח של לפחות 3 שנים בפרויקטי תמ"א 38',
        'ביצוע של לפחות 2 פרויקטי תמ"א 38/1 בהיקף של 6 יחידות דיור ומעלה',
        'איתנות פיננסית - הון עצמי של לפחות 10 מיליון ₪',
        'צוות מקצועי הכולל אדריכל ומהנדס'
      ],
      documents: [
        { name: 'מסמכי המכרז המלאים', type: 'PDF' },
        { name: 'תשריט המבנה', type: 'PDF' },
        { name: 'דו"ח קרקע', type: 'PDF' },
        { name: 'הסכם התקשרות', type: 'PDF' }
      ]
    }
  ];

  // Sample applications (kept for future use)
  const _applications: Application[] = [
    {
      id: 1,
      tenderId: 1,
      tenderName: 'פינוי-בינוי מתחם הרצל, תל אביב',
      companyName: 'אלמוגים בנייה בע"מ',
      submissionDate: '2023-06-15',
      status: 'submitted',
      proposal: 'הצעה לביצוע פרויקט פינוי-בינוי במתחם הרצל בתל אביב, כולל תכנון אדריכלי חדשני, לוחות זמנים מפורטים ותקציב מפורט.'
    },
    {
      id: 2,
      tenderId: 1,
      tenderName: 'פינוי-בינוי מתחם הרצל, תל אביב',
      companyName: 'שיכון ובינוי בע"מ',
      submissionDate: '2023-06-20',
      status: 'underReview',
      proposal: 'הצעה לביצוע פרויקט פינוי-בינוי במתחם הרצל בתל אביב, עם דגש על קיימות, יעילות אנרגטית ושטחים ציבוריים איכותיים.'
    }
  ];

  // Effect to handle initialTenderId
  useEffect(() => {
    if (initialTenderId) {
      const tender = tenders.find(t => t.id === initialTenderId);
      if (tender) {
        setSelectedTender(tender);
        setShowApplyModal(true);
      }
    }
  }, [initialTenderId, tenders]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.open}</span>;
      case 'closed':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{t.closed}</span>;
      case 'awarded':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.awarded}</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t.draft}</span>;
      default:
        return null;
    }
  };

  // Utility function for application status badges (kept for future use)
  const _getApplicationStatusBadge = (status: string) => {
    switch(status) {
      case 'submitted':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">הוגש</span>;
      case 'underReview':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">בבדיקה</span>;
      case 'accepted':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">התקבל</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">נדחה</span>;
      default:
        return null;
    }
  };

  const getProjectTypeBadge = (type: string) => {
    switch(type) {
      case 'tama38':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">{t.tama38}</span>;
      case 'pinuiBinui':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.pinuiBinui}</span>;
      case 'urbanRenewalOther':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.urbanRenewalOther}</span>;
      default:
        return null;
    }
  };

  const handleTenderClick = (tender: Tender) => {
    setSelectedTender(tender);
  };

  const handleApplyClick = (e: React.MouseEvent, tender: Tender) => {
    e.stopPropagation();
    setSelectedTender(tender);
    setShowApplyModal(true);
  };

  const filteredTenders = activeTab === 'all' 
    ? tenders 
    : activeTab === 'open' 
      ? tenders.filter(tender => tender.status === 'open')
      : activeTab === 'closed'
        ? tenders.filter(tender => tender.status === 'closed' || tender.status === 'awarded')
        : tenders;

  // Fixed download function that doesn't use document.createElement
  const handleDownloadDocument = (e: React.MouseEvent, doc: { name: string; type: string }) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real application, this would trigger a download of the actual file
    // For this demo, we'll just show an alert
    alert(`מוריד את ${doc.name}`);
  };

  // Function to check if the user can apply for tenders
  const canApplyForTenders = () => {
    // For demo purposes, we'll check if the user role is developer or professional
    return userRole === 'developer' || userRole === 'professional';
  };

  // Function to check if the user can create tenders
  const canCreateTenders = () => {
    // For demo purposes, we'll check if the user role is localAuthority or governmentOffice
    return userRole === 'localAuthority' || userRole === 'governmentOffice';
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    alert('הצעה הוגשה בהצלחה!');
    setShowApplyModal(false);
    setSelectedTender(null);
    // Clear hash if it exists
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname);
    }
  };

  // Handle creating a new tender
  const handleCreateTender = async (tenderData: Record<string, unknown>) => {
    try {
      // In a real app, you'd get the token from auth context
      await tendersApi.create(tenderData, "dummy-token");
      // Refresh the tenders list
      const updatedTenders = await tendersApi.getAll("dummy-token");
      setTenders(updatedTenders);
      alert('מכרז נוצר בהצלחה!');
      setShowAddModal(false);
    } catch (err) {
      console.error("Error creating tender:", err);
      alert('שגיאה ביצירת מכרז. נסה שנית.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.tenders}</h1>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder={t.search}
              className="pl-10 pr-4 py-2 border rounded-md w-full"
            />
            <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          </div>
          {canCreateTenders() && (
            <button 
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={18} />
              <span>{t.addTender}</span>
            </button>
          )}
          <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md">
            <Filter size={18} />
            <span>{t.filter}</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md">
            <Download size={18} />
            <span>{t.export}</span>
          </button>
        </div>
      </div>

      {/* Display warning for local authorities and government offices */}
      {!canApplyForTenders() && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {t.cannotApply}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex overflow-x-auto">
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('all')}
          >
            {t.all}
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'open' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('open')}
          >
            {t.open}
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'closed' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('closed')}
          >
            {t.closed}
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'myTenders' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('myTenders')}
          >
            {t.myTenders}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.name}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.publisher}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.deadline}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.budget}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTenders.map((tender) => (
                <tr 
                  key={tender.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTenderClick(tender)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{tender.name}</div>
                    <div className="text-xs mt-1">{getProjectTypeBadge(tender.projectType)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{tender.publisher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{tender.deadline}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(tender.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{tender.budget}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {canCreateTenders() ? (
                      <>
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle edit
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    ) : (
                      tender.status === 'open' && canApplyForTenders() && (
                        <button 
                          className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                          onClick={(e) => handleApplyClick(e, tender)}
                        >
                          {t.apply}
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tender Details Modal */}
      {selectedTender && !showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.detailsHeader}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedTender(null)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{selectedTender.name}</h3>
                  {getStatusBadge(selectedTender.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{t.tenderNumber}</p>
                    <p className="font-medium">{selectedTender.tenderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.publisher}</p>
                    <p className="font-medium">{selectedTender.publisher}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.publishDate}</p>
                    <p className="font-medium">{selectedTender.publishDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.deadline}</p>
                    <p className="font-medium">{selectedTender.deadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.questionDeadline}</p>
                    <p className="font-medium">{selectedTender.questionDeadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.budget}</p>
                    <p className="font-medium">{selectedTender.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.location}</p>
                    <p className="font-medium">{selectedTender.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.applicantsCount}</p>
                    <p className="font-medium">{selectedTender.applicantsCount}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t.description}</h4>
                  <p className="text-gray-600">{selectedTender.description}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t.requirements}</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedTender.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t.contactPerson}</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">{selectedTender.contactPerson}</p>
                    <div className="flex items-center text-gray-600 mt-2">
                      <Mail size={16} className="mr-2" />
                      <span>{selectedTender.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Phone size={16} className="mr-2" />
                      <span>{selectedTender.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t.documents}</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="space-y-2">
                      {selectedTender.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText size={16} className="text-gray-400 mr-2" />
                            <span>{doc.name}</span>
                          </div>
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => handleDownloadDocument(e, doc)}
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setSelectedTender(null)}
                >
                  {t.cancel}
                </button>
                {selectedTender.status === 'open' && canApplyForTenders() && (
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={() => setShowApplyModal(true)}
                  >
                    {t.apply}
                  </button>
                )}
                {canCreateTenders() && (
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={() => {
                      // Show applicants
                    }}
                  >
                    {t.viewApplicants}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply for Tender Modal */}
      {showApplyModal && selectedTender && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.applyForTender}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowApplyModal(false);
                    // If we came directly to this modal via URL hash, also clear the selected tender
                    if (initialTenderId) {
                      setSelectedTender(null);
                      // Clear hash if it exists
                      if (window.location.hash) {
                        history.pushState("", document.title, window.location.pathname);
                      }
                    }
                  }}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">{selectedTender.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span>{selectedTender.location}</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">{t.requirements}</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedTender.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <form onSubmit={handleSubmitApplication}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.companyName}</label>
                    <input type="text" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.experience}</label>
                    <textarea className="w-full p-2 border rounded-md" rows={3} required></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.proposal}</label>
                    <textarea className="w-full p-2 border rounded-md" rows={5} required></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.attachments}</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText size={36} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">{t.dragAndDrop}</p>
                      <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                        {t.browseFiles}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                    onClick={() => {
                      setShowApplyModal(false);
                      // If we came directly to this modal via URL hash, also clear the selected tender
                      if ( initialTenderId) {
                        setSelectedTender(null);
                        // Clear hash if it exists
                        if (window.location.hash) {
                          history.pushState("", document.title, window.location.pathname);
                        }
                      }
                    }}
                  >
                    {t.cancel}
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {t.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Tender Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.addTender}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAddModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const tenderData = {
                  name: formData.get('name'),
                  tenderNumber: formData.get('tenderNumber'),
                  projectType: formData.get('projectType'),
                  publishDate: formData.get('publishDate'),
                  deadline: formData.get('deadline'),
                  questionDeadline: formData.get('questionDeadline'),
                  budget: formData.get('budget'),
                  location: formData.get('location'),
                  description: formData.get('description'),
                  requirements: formData.get('requirements')?.toString().split('\n'),
                  contactPerson: formData.get('contactPerson'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  status: formData.get('status')
                };
                
                handleCreateTender(tenderData);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                    <input name="name" type="text" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.tenderNumber}</label>
                    <input name="tenderNumber" type="text" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.projectType}</label>
                    <select name="projectType" className="w-full p-2 border rounded-md" required>
                      <option value="tama38">{t.tama38}</option>
                      <option value="pinuiBinui">{t.pinuiBinui}</option>
                      <option value="urbanRenewalOther">{t.urbanRenewalOther}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.publishDate}</label>
                    <input name="publishDate" type="date" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.deadline}</label>
                    <input name="deadline" type="date" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.questionDeadline}</label>
                    <input name="questionDeadline" type="date" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.budget}</label>
                    <input name="budget" type="text" className="w-full p-2 border rounded-md" required placeholder="₪1,000,000" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.location}</label>
                    <input name="location" type="text" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                    <textarea name="description" className="w-full p-2 border rounded-md" rows={3} required></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.requirements}</label>
                    <textarea name="requirements" className="w-full p-2 border rounded-md" rows={4} required placeholder="Enter each requirement on a new line"></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.contactPerson}</label>
                    <input name="contactPerson" type="text" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                    <input name="email" type="email" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                    <input name="phone" type="tel" className="w-full p-2 border rounded-md" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.status}</label>
                    <select name="status" className="w-full p-2 border rounded-md" required>
                      <option value="draft">{t.draft}</option>
                      <option value="open">{t.open}</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.documents}</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText size={36} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">{t.dragAndDrop}</p>
                      <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                        {t.browseFiles}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                    onClick={() => setShowAddModal(false)}
                  >
                    {t.cancel}
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    {t.saveDraft}
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {t.publishTender}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenders;
