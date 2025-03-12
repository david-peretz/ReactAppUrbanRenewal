import React from 'react';
import { Save, Globe, Bell, Lock, User, CreditCard } from 'lucide-react';

interface SettingsProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ language, setLanguage }) => {
  const translations = {
    en: {
      settings: 'Settings',
      general: 'General',
      notifications: 'Notifications',
      security: 'Security',
      profile: 'Profile',
      billing: 'Billing',
      language: 'Language',
      theme: 'Theme',
      dateFormat: 'Date Format',
      timeFormat: 'Time Format',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      smsNotifications: 'SMS Notifications',
      changePassword: 'Change Password',
      twoFactorAuth: 'Two-Factor Authentication',
      personalInfo: 'Personal Information',
      companyInfo: 'Company Information',
      paymentMethods: 'Payment Methods',
      billingHistory: 'Billing History',
      save: 'Save Changes',
      cancel: 'Cancel',
      english: 'English',
      hebrew: 'Hebrew',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      enabled: 'Enabled',
      disabled: 'Disabled',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password'
    },
    he: {
      settings: 'הגדרות',
      general: 'כללי',
      notifications: 'התראות',
      security: 'אבטחה',
      profile: 'פרופיל',
      billing: 'חיוב',
      language: 'שפה',
      theme: 'ערכת נושא',
      dateFormat: 'פורמט תאריך',
      timeFormat: 'פורמט שעה',
      emailNotifications: 'התראות אימייל',
      pushNotifications: 'התראות דחיפה',
      smsNotifications: 'התראות SMS',
      changePassword: 'שינוי סיסמה',
      twoFactorAuth: 'אימות דו-שלבי',
      personalInfo: 'פרטים אישיים',
      companyInfo: 'פרטי חברה',
      paymentMethods: 'אמצעי תשלום',
      billingHistory: 'היסטוריית חיובים',
      save: 'שמור שינויים',
      cancel: 'ביטול',
      english: 'אנגלית',
      hebrew: 'עברית',
      light: 'בהיר',
      dark: 'כהה',
      system: 'מערכת',
      enabled: 'מופעל',
      disabled: 'כבוי',
      currentPassword: 'סיסמה נוכחית',
      newPassword: 'סיסמה חדשה',
      confirmPassword: 'אימות סיסמה'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t.settings}</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b">
          <div className="w-64 border-r bg-gray-50">
            <nav className="p-4 space-y-1">
              <a href="#general" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                <Globe className="mr-3 h-5 w-5" />
                {t.general}
              </a>
              <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Bell className="mr-3 h-5 w-5" />
                {t.notifications}
              </a>
              <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Lock className="mr-3 h-5 w-5" />
                {t.security}
              </a>
              <a href="#profile" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <User className="mr-3 h-5 w-5" />
                {t.profile}
              </a>
              <a href="#billing" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <CreditCard className="mr-3 h-5 w-5" />
                {t.billing}
              </a>
            </nav>
          </div>
          
          <div className="flex-1 p-6">
            <div id="general">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{t.general}</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.language}</label>
                  <select 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <option value="en">{t.english}</option>
                    <option value="he">{t.hebrew}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.theme}</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>{t.light}</option>
                    <option>{t.dark}</option>
                    <option>{t.system}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.dateFormat}</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.timeFormat}</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>12 Hour (AM/PM)</option>
                    <option>24 Hour</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {t.cancel}
              </button>
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Save className="mr-2 -ml-1 h-5 w-5" />
                {t.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;