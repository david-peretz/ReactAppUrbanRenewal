import React, { useState } from 'react';
import { User, Lock, Building, Gavel, Calculator, Briefcase, Users, Landmark, LogIn } from 'lucide-react';

interface LoginProps {
  language: string;
  onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ language, onLogin }) => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [selectedRole, setSelectedRole] = useState('');
  
  const translations = {
    en: {
      login: 'Login',
      email: 'Email',
      password: 'Password',
      selectRole: 'Select Your Role',
      resident: 'Resident / Committee Representative',
      developer: 'Developer / Contractor',
      lawyer: 'Lawyer',
      appraiser: 'Appraiser',
      financialAdvisor: 'Financial Advisor',
      professional: 'Professional Consultant',
      localAuthority: 'Local Authority',
      governmentOffice: 'Government Office',
      loginButton: 'Login',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: 'Don\'t have an account?',
      signUp: 'Sign Up',
      urbanRenewalSystem: 'Urban Renewal Management System',
      welcomeBack: 'Welcome Back',
      loginToYourAccount: 'Login to your account to access your dashboard'
    },
    he: {
      login: 'התחברות',
      email: 'אימייל',
      password: 'סיסמה',
      selectRole: 'בחר את התפקיד שלך',
      resident: 'דייר / נציג ועד בית',
      developer: 'יזם / קבלן',
      lawyer: 'עורך דין',
      appraiser: 'שמאי',
      financialAdvisor: 'יועץ פיננסי',
      professional: 'איש מקצוע / יועץ',
      localAuthority: 'רשות מקומית',
      governmentOffice: 'משרד ממשלתי',
      loginButton: 'התחבר',
      forgotPassword: 'שכחת סיסמה?',
      dontHaveAccount: 'אין לך חשבון?',
      signUp: 'הרשם',
      urbanRenewalSystem: 'מערכת ניהול התחדשות עירונית',
      welcomeBack: 'ברוכים השבים',
      loginToYourAccount: 'התחבר לחשבונך כדי לגשת ללוח הבקרה שלך'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  const roles = [
    { id: 'resident', name: t.resident, icon: <Users size={20} /> },
    { id: 'developer', name: t.developer, icon: <Building size={20} /> },
    { id: 'lawyer', name: t.lawyer, icon: <Gavel size={20} /> },
    { id: 'appraiser', name: t.appraiser, icon: <Calculator size={20} /> },
    { id: 'financialAdvisor', name: t.financialAdvisor, icon: <Briefcase size={20} /> },
    { id: 'professional', name: t.professional, icon: <User size={20} /> },
    { id: 'localAuthority', name: t.localAuthority, icon: <Landmark size={20} /> },
    { id: 'governmentOffice', name: t.governmentOffice, icon: <Landmark size={20} /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onLogin(selectedRole);
    } else {
      alert('אנא בחר תפקיד לפני ההתחברות');
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image and branding */}
          <div className="bg-blue-600 text-white p-8 md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{t.urbanRenewalSystem}</h1>
            <p className="text-blue-100 mb-6">{t.loginToYourAccount}</p>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Urban Renewal" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className="p-8 md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">{t.welcomeBack}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectRole}</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <div 
                      key={role.id}
                      className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        selectedRole === role.id 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="mr-2">{role.icon}</div>
                      <span className="text-sm">{role.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    {t.forgotPassword}
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogIn className="mr-2" size={18} />
                {t.loginButton}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.dontHaveAccount}{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  {t.signUp}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;