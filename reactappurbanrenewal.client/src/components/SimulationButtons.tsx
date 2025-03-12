import React from 'react';
import { Plus, FileText, Users, Calendar, BarChart3, FileSpreadsheet } from 'lucide-react';

interface SimulationButtonsProps {
  userRole: string;
  language: string;
}

const SimulationButtons: React.FC<SimulationButtonsProps> = ({ userRole, language }) => {
  const translations = {
    en: {
      addProject: 'Add Project',
      addProperty: 'Add Property',
      addDocument: 'Add Document',
      addClient: 'Add Client',
      scheduleAppointment: 'Schedule Appointment',
      generateReport: 'Generate Report',
      createTender: 'Create Tender',
      applyForTender: 'Apply for Tender'
    },
    he: {
      addProject: 'הוסף פרויקט',
      addProperty: 'הוסף נכס',
      addDocument: 'הוסף מסמך',
      addClient: 'הוסף לקוח',
      scheduleAppointment: 'קבע פגישה',
      generateReport: 'הפק דוח',
      createTender: 'צור מכרז',
      applyForTender: 'הגש הצעה למכרז'
    }
  };

  const t = translations[language];

  const handleAction = (action: string) => {
    const menuElement = document.getElementById('tenders-menu');
    
    switch(action) {
      case 'addProject':
        document.getElementById('projects-menu')?.click();
        break;
      case 'addProperty':
        document.getElementById('products-menu')?.click();
        break;
      case 'addDocument':
        document.getElementById('documents-menu')?.click();
        break;
      case 'addClient':
        document.getElementById('customers-menu')?.click();
        break;
      case 'scheduleAppointment':
        document.getElementById('calendar-menu')?.click();
        break;
      case 'generateReport':
        document.getElementById('reports-menu')?.click();
        break;
      case 'createTender':
      case 'applyForTender':
        if (menuElement) {
          menuElement.click();
        }
        break;
      default:
        console.log(`Action triggered: ${action}`);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {(userRole === 'developer' || userRole === 'localAuthority' || userRole === 'governmentOffice') && (
        <button
          className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
          onClick={() => handleAction('addProject')}
        >
          <Plus className="h-8 w-8 text-blue-600 mb-2" />
          <span className="text-sm text-center">{t.addProject}</span>
        </button>
      )}
      
      {(userRole === 'developer' || userRole === 'appraiser') && (
        <button
          className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100"
          onClick={() => handleAction('addProperty')}
        >
          <Plus className="h-8 w-8 text-green-600 mb-2" />
          <span className="text-sm text-center">{t.addProperty}</span>
        </button>
      )}
      
      <button
        className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
        onClick={() => handleAction('addDocument')}
      >
        <FileText className="h-8 w-8 text-purple-600 mb-2" />
        <span className="text-sm text-center">{t.addDocument}</span>
      </button>
      
      {(userRole === 'developer' || userRole === 'lawyer') && (
        <button
          className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100"
          onClick={() => handleAction('addClient')}
        >
          <Users className="h-8 w-8 text-yellow-600 mb-2" />
          <span className="text-sm text-center">{t.addClient}</span>
        </button>
      )}
      
      <button
        className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100"
        onClick={() => handleAction('scheduleAppointment')}
      >
        <Calendar className="h-8 w-8 text-red-600 mb-2" />
        <span className="text-sm text-center">{t.scheduleAppointment}</span>
      </button>
      
      {(userRole === 'developer' || userRole === 'financialAdvisor' || userRole === 'localAuthority' || userRole === 'governmentOffice') && (
        <button
          className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100"
          onClick={() => handleAction('generateReport')}
        >
          <BarChart3 className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm text-center">{t.generateReport}</span>
        </button>
      )}
      
      {(userRole === 'localAuthority' || userRole === 'governmentOffice') && (
        <button
          className="flex flex-col items-center justify-center p-4 bg-cyan-50 rounded-lg hover:bg-cyan-100"
          onClick={() => handleAction('createTender')}
        >
          <FileSpreadsheet className="h-8 w-8 text-cyan-600 mb-2" />
          <span className="text-sm text-center">{t.createTender}</span>
        </button>
      )}
      
      {(userRole === 'developer' || userRole === 'professional') && (
        <button
          className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100"
          onClick={() => handleAction('applyForTender')}
        >
          <FileSpreadsheet className="h-8 w-8 text-orange-600 mb-2" />
          <span className="text-sm text-center">{t.applyForTender}</span>
        </button>
      )}
    </div>
  );
};

export default SimulationButtons;