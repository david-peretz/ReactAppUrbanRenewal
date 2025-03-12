import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BarChart3, 
  ShoppingCart, 
  Settings, 
  Home, 
  Bell, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Calendar as CalendarIcon, 
  FileText,
  Briefcase,
  PieChart,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  FileSpreadsheet,
  Building
} from 'lucide-react';

// Dashboard components
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Reports from './components/Reports';
import Products from './components/Products';
import SettingsComponent from './components/Settings';
import Calendar from './components/Calendar';
import Documents from './components/Documents';
import Projects from './components/Projects';
import Login from './components/Login';
import UserGuide from './components/UserGuide';
import Tenders from './components/Tenders';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('he'); // 'he' for Hebrew, 'en' for English
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('developer'); // Changed default to developer for testing
  const [showGuide, setShowGuide] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [selectedTenderId, setSelectedTenderId] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setActiveTab('dashboard');
    
    // Show guide automatically on first login
    if (isFirstLogin) {
      setShowGuide(true);
      setIsFirstLogin(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
  };

  // Check for hash changes to handle navigation from dashboard to tenders
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#tenders-')) {
        const tenderId = hash.split('-')[1];
        setActiveTab('tenders');
        setSelectedTenderId(parseInt(tenderId));
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check on initial load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={language} />;
      case 'customers':
        return <Customers language={language} />;
      case 'reports':
        return <Reports language={language} />;
      case 'products':
        return <Products language={language} />;
      case 'settings':
        return <SettingsComponent language={language} setLanguage={setLanguage} />;
      case 'calendar':
        return <Calendar language={language} />;
      case 'documents':
        return <Documents language={language} />;
      case 'projects':
        return <Projects language={language} />;
      case 'tenders':
        return <Tenders language={language} initialTenderId={selectedTenderId} userRole={userRole} />;
      default:
        return <Dashboard language={language} />;
    }
  };

  const translations = {
    en: {
      dashboard: 'Dashboard',
      customers: 'Customers',
      products: 'Properties',
      reports: 'Reports',
      settings: 'Settings',
      calendar: 'Calendar',
      documents: 'Documents',
      projects: 'Projects',
      tenders: 'Tenders',
      search: 'Search...',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Logout',
      businessSystem: 'Urban Renewal Management System',
      showGuide: 'Interactive Guide',
      collapseSidebar: 'Collapse Sidebar',
      expandSidebar: 'Expand Sidebar'
    },
    he: {
      dashboard: 'לוח בקרה',
      customers: 'לקוחות',
      products: 'נכסים',
      reports: 'דוחות',
      settings: 'הגדרות',
      calendar: 'יומן',
      documents: 'מסמכים',
      projects: 'פרויקטים',
      tenders: 'מכרזים',
      search: 'חיפוש...',
      notifications: 'התראות',
      profile: 'פרופיל',
      logout: 'התנתקות',
      businessSystem: 'מערכת ניהול התחדשות עירונית',
      showGuide: 'מדריך אינטראקטיבי',
      collapseSidebar: 'כווץ תפריט',
      expandSidebar: 'הרחב תפריט'
    }
  };

  // Define which menu items are visible for each role
  const getVisibleMenuItems = () => {
    const allMenuItems = [
      { id: 'dashboard', icon: <Home size={20} />, label: t.dashboard, visible: true },
      { id: 'customers', icon: <Users size={20} />, label: t.customers, 
        visible: ['developer', 'lawyer', 'appraiser', 'financialAdvisor', 'professional'].includes(userRole) },
      { id: 'products', icon: <ShoppingCart size={20} />, label: t.products, 
        visible: ['developer', 'resident', 'appraiser', 'localAuthority', 'governmentOffice'].includes(userRole) },
      { id: 'reports', icon: <BarChart3 size={20} />, label: t.reports, 
        visible: ['developer', 'financialAdvisor', 'localAuthority', 'governmentOffice'].includes(userRole) },
      { id: 'calendar', icon: <CalendarIcon size={20} />, label: t.calendar, 
        visible: ['developer', 'resident', 'lawyer', 'professional'].includes(userRole) },
      { id: 'documents', icon: <FileText size={20} />, label: t.documents, 
        visible: ['developer', 'resident', 'lawyer', 'localAuthority', 'governmentOffice'].includes(userRole) },
      { id: 'projects', icon: <Briefcase size={20} />, label: t.projects, 
        visible: ['developer', 'resident', 'localAuthority', 'governmentOffice'].includes(userRole) },
      { id: 'tenders', icon: <FileSpreadsheet size={20} />, label: t.tenders, 
        visible: ['localAuthority', 'governmentOffice', 'developer', 'professional'].includes(userRole) },
      { id: 'settings', icon: <Settings size={20} />, label: t.settings, visible: true }
    ];

    return allMenuItems.filter(item => item.visible);
  };

  const t = translations[language];
  const isRTL = language === 'he';
  const visibleMenuItems = getVisibleMenuItems();

  if (!isLoggedIn) {
    return <Login language={language} onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Header */}
      <div className="bg-white shadow-sm lg:hidden">
        <div className="flex items-center justify-between p-4">
          <button onClick={toggleSidebar} className="p-2 rounded-md">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">{t.businessSystem}</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        } lg:translate-x-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className={`p-4 border-b flex ${sidebarCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
            {!sidebarCollapsed && <h2 className="text-xl font-bold">{t.businessSystem}</h2>}
            <button 
              onClick={toggleSidebarCollapse}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
              title={sidebarCollapsed ? t.expandSidebar : t.collapseSidebar}
            >
              {isRTL ? 
                (sidebarCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />) : 
                (sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />)
              }
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {visibleMenuItems.map(item => (
              <button
                key={item.id}
                id={`${item.id}-menu`}
                onClick={() => {
                  setActiveTab(item.id);
                  // Clear selected tender when navigating to tenders page directly
                  if (item.id === 'tenders') {
                    setSelectedTenderId(null);
                    // Clear hash if it exists
                    if (window.location.hash) {
                      history.pushState("", document.title, window.location.pathname);
                    }
                  }
                }}
                className={`flex items-center w-full p-3 ${sidebarCollapsed ? 'justify-center' : `space-x-3 ${isRTL ? 'space-x-reverse' : ''}`} rounded-md ${
                  activeTab === item.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
                title={sidebarCollapsed ? item.label : ''}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
            
            {/* Interactive Guide Button */}
            {!sidebarCollapsed && (
              <button
                onClick={() => setShowGuide(true)}
                className="flex items-center w-full p-3 space-x-3 mt-4 border-t pt-4 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <FileText size={20} />
                <span>{t.showGuide}</span>
              </button>
            )}
            {sidebarCollapsed && (
              <button
                onClick={() => setShowGuide(true)}
                className="flex items-center justify-center w-full p-3 mt-4 border-t pt-4 text-blue-600 hover:bg-blue-50 rounded-md"
                title={t.showGuide}
              >
                <FileText size={20} />
              </button>
            )}
          </nav>
          <div className={`p-4 border-t ${sidebarCollapsed ? 'text-center' : ''}`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : `space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}`}>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <p className="font-medium">
                    {userRole === 'resident' ? 'דייר / נציג ועד בית' :
                     userRole === 'developer' ? 'יזם / קבלן' :
                     userRole === 'lawyer' ? 'עורך דין' :
                     userRole === 'appraiser' ? 'שמאי' :
                     userRole === 'financialAdvisor' ? 'יועץ פיננסי' :
                     userRole === 'professional' ? 'איש מקצוע' :
                     userRole === 'localAuthority' ? 'רשות מקומית' :
                     userRole === 'governmentOffice' ? 'משרד ממשלתי' : 'משתמש'}
                  </p>
                  <p className="text-sm text-gray-500">user@example.com</p>
                </div>
              )}
              {!sidebarCollapsed && (
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>
            {sidebarCollapsed && (
              <button 
                className="mt-2 p-2 rounded-full hover:bg-gray-100"
                onClick={handleLogout}
                title={t.logout}
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed 
            ? isRTL ? 'mr-20' : 'ml-20' 
            : isRTL ? 'mr-64' : 'ml-64'
        } lg:block`}
      >
        {/* Desktop Header */}
        <header className="hidden lg:block bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.search}
                  className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="font-medium">
                  {userRole === 'resident' ? 'דייר' :
                   userRole === 'developer' ? 'יזם' :
                   userRole === 'lawyer' ? 'עו"ד' :
                   userRole === 'appraiser' ? 'שמאי' :
                   userRole === 'financialAdvisor' ? 'יועץ' :
                   userRole === 'professional' ? 'מקצועי' :
                   userRole === 'localAuthority' ? 'רשות' :
                   userRole === 'governmentOffice' ? 'ממשלה' : 'משתמש'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 md:p-6">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Interactive User Guide */}
      {showGuide && (
        <UserGuide 
          language={language} 
          userRole={userRole} 
          onClose={() => setShowGuide(false)} 
        />
      )}
    </div>
  );
}

export default App;