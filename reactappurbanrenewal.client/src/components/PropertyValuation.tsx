import React, { useState } from 'react';
import { Calculator, Save, FileText, Map, Home, Building, DollarSign, Trash2, Plus, Download, X } from 'lucide-react';

interface PropertyValuationProps {
  language: string;
}

interface ValuationReport {
  id: number;
  propertyId: number;
  propertyName: string;
  date: string;
  value: string;
  status: string;
  method: string;
  appraiser: string;
  notes: string;
}

const PropertyValuation: React.FC<PropertyValuationProps> = ({ language }) => {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [showNewValuationModal, setShowNewValuationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ValuationReport | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  
  const translations = {
    en: {
      propertyValuation: 'Property Valuation',
      pendingValuations: 'Pending Valuations',
      completedValuations: 'Completed Valuations',
      allProperties: 'All Properties',
      newValuation: 'New Valuation',
      propertyDetails: 'Property Details',
      valuationMethod: 'Valuation Method',
      comparableMethod: 'Comparable Sales Method',
      incomeMethod: 'Income Capitalization Method',
      costMethod: 'Cost Approach Method',
      developmentMethod: 'Development Method',
      propertyValue: 'Property Value',
      notes: 'Notes',
      save: 'Save Valuation',
      cancel: 'Cancel',
      property: 'Property',
      location: 'Location',
      size: 'Size',
      type: 'Type',
      status: 'Status',
      lastValuation: 'Last Valuation',
      actions: 'Actions',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      residential: 'Residential',
      commercial: 'Commercial',
      industrial: 'Industrial',
      land: 'Land',
      valuationReport: 'Valuation Report',
      date: 'Date',
      appraiser: 'Appraiser',
      method: 'Method',
      value: 'Value',
      comparables: 'Comparable Properties',
      addComparable: 'Add Comparable',
      propertyFactors: 'Property Factors',
      locationFactor: 'Location Factor',
      conditionFactor: 'Condition Factor',
      sizeFactor: 'Size Factor',
      ageFactor: 'Age Factor',
      viewFactor: 'View Factor',
      otherFactors: 'Other Factors',
      finalValuation: 'Final Valuation',
      generateReport: 'Generate Report',
      downloadReport: 'Download Report',
      viewReport: 'View Report',
      deleteReport: 'Delete Report',
      createValuation: 'Create Valuation'
    },
    he: {
      propertyValuation: 'הערכת שווי נכסים',
      pendingValuations: 'הערכות ממתינות',
      completedValuations: 'הערכות שהושלמו',
      allProperties: 'כל הנכסים',
      newValuation: 'הערכה חדשה',
      propertyDetails: 'פרטי הנכס',
      valuationMethod: 'שיטת הערכה',
      comparableMethod: 'שיטת ההשוואה',
      incomeMethod: 'שיטת היוון הכנסות',
      costMethod: 'גישת העלות',
      developmentMethod: 'שיטת החילוץ',
      propertyValue: 'שווי הנכס',
      notes: 'הערות',
      save: 'שמור הערכה',
      cancel: 'ביטול',
      property: 'נכס',
      location: 'מיקום',
      size: 'שטח',
      type: 'סוג',
      status: 'סטטוס',
      lastValuation: 'הערכה אחרונה',
      actions: 'פעולות',
      pending: 'ממתין',
      inProgress: 'בתהליך',
      completed: 'הושלם',
      residential: 'מגורים',
      commercial: 'מסחרי',
      industrial: 'תעשייתי',
      land: 'קרקע',
      valuationReport: 'דוח שמאות',
      date: 'תאריך',
      appraiser: 'שמאי',
      method: 'שיטה',
      value: 'שווי',
      comparables: 'נכסים להשוואה',
      addComparable: 'הוסף נכס להשוואה',
      propertyFactors: 'גורמי השפעה',
      locationFactor: 'מקדם מיקום',
      conditionFactor: 'מקדם מצב פיזי',
      sizeFactor: 'מקדם גודל',
      ageFactor: 'מקדם גיל',
      viewFactor: 'מקדם נוף',
      otherFactors: 'גורמים נוספים',
      finalValuation: 'הערכת שווי סופית',
      generateReport: 'הפק דוח',
      downloadReport: 'הורד דוח',
      viewReport: 'צפה בדוח',
      deleteReport: 'מחק דוח',
      createValuation: 'צור הערכת שווי'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  // Sample properties data
  const properties = [
    { 
      id: 1, 
      name: 'דירת 4 חדרים, רמת גן', 
      location: 'רחוב ביאליק 15, רמת גן', 
      size: '110 מ"ר',
      type: 'residential',
      status: 'pending',
      lastValuation: '-'
    },
    { 
      id: 2, 
      name: 'משרדים להשכרה, הרצליה פיתוח', 
      location: 'רחוב אבא אבן 10, הרצליה פיתוח', 
      size: '200 מ"ר',
      type: 'commercial',
      status: 'inProgress',
      lastValuation: '-'
    },
    { 
      id: 3, 
      name: 'בית פרטי, סביון', 
      location: 'רחוב האלון, סביון', 
      size: '350 מ"ר',
      type: 'residential',
      status: 'completed',
      lastValuation: '₪12,500,000'
    },
    { 
      id: 4, 
      name: 'מתחם מסחרי, תל אביב', 
      location: 'רחוב דיזנגוף 50, תל אביב', 
      size: '500 מ"ר',
      type: 'commercial',
      status: 'pending',
      lastValuation: '-'
    },
    { 
      id: 5, 
      name: 'מגרש לבנייה, ראשון לציון', 
      location: 'שכונת נחלת יהודה, ראשון לציון', 
      size: '800 מ"ר',
      type: 'land',
      status: 'pending',
      lastValuation: '-'
    },
  ];

  // Sample valuation reports
  const valuationReports: ValuationReport[] = [
    {
      id: 1,
      propertyId: 3,
      propertyName: 'בית פרטי, סביון',
      date: '2023-05-15',
      value: '₪12,500,000',
      status: 'completed',
      method: 'comparableMethod',
      appraiser: 'דוד כהן',
      notes: 'הערכת שווי בוצעה על בסיס עסקאות דומות באזור. הנכס במצב מצוין ובאזור יוקרתי.'
    }
  ];

  const getPropertyTypeIcon = (type: string) => {
    switch(type) {
      case 'residential':
        return <Home className="text-blue-500" size={20} />;
      case 'commercial':
        return <Building className="text-purple-500" size={20} />;
      case 'industrial':
        return <Building className="text-gray-500" size={20} />;
      case 'land':
        return <Map className="text-green-500" size={20} />;
      default:
        return <Home className="text-gray-500" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t.pending}</span>;
      case 'inProgress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.inProgress}</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.completed}</span>;
      default:
        return null;
    }
  };

  const getMethodTranslation = (method: string) => {
    switch(method) {
      case 'comparableMethod':
        return t.comparableMethod;
      case 'incomeMethod':
        return t.incomeMethod;
      case 'costMethod':
        return t.costMethod;
      case 'developmentMethod':
        return t.developmentMethod;
      default:
        return method;
    }
  };

  const handleCreateValuation = (propertyId: number) => {
    setSelectedProperty(propertyId);
    setShowNewValuationModal(true);
  };

  const handleViewReport = (report: ValuationReport) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleSaveValuation = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save the valuation to the database
    alert('הערכת השווי נשמרה בהצלחה!');
    setShowNewValuationModal(false);
    setSelectedProperty(null);
  };

  const filteredProperties = activeTab === 'all' 
    ? properties 
    : properties.filter(property => property.status === activeTab);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.propertyValuation}</h1>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <button 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowNewValuationModal(true)}
          >
            <Plus size={18} />
            <span>{t.newValuation}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex overflow-x-auto">
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'pending' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            {t.pendingValuations}
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'inProgress' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('inProgress')}
          >
            {t.inProgress}
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'completed' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            {t.completedValuations}
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('all')}
          >
            {t.allProperties}
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.property}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.location}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.size}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.type}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.lastValuation}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{property.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{property.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{property.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getPropertyTypeIcon(property.type)}
                      <span className="ml-2">{t[property.type]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(property.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-medium">{property.lastValuation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {property.status === 'completed' ? (
                      <button 
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-100 rounded-md"
                        onClick={() => {
                          const report = valuationReports.find(r => r.propertyId === property.id);
                          if (report) {
                            handleViewReport(report);
                          }
                        }}
                      >
                        {t.viewReport}
                      </button>
                    ) : (
                      <button 
                        className="text-green-600 hover:text-green-900 px-3 py-1 bg-green-100 rounded-md"
                        onClick={() => handleCreateValuation(property.id)}
                      >
                        {t.createValuation}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Valuation Modal */}
      {showNewValuationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.newValuation}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowNewValuationModal(false);
                    setSelectedProperty(null);
                  }}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSaveValuation}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{t.propertyDetails}</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedProperty ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{t.property}</p>
                          <p className="font-medium">{properties.find(p => p.id === selectedProperty)?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t.location}</p>
                          <p className="font-medium">{properties.find(p => p.id === selectedProperty)?.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t.size}</p>
                          <p className="font-medium">{properties.find(p => p.id === selectedProperty)?.size}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t.type}</p>
                          <p className="font-medium">{t[properties.find(p => p.id === selectedProperty)?.type || 'residential']}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.property}</label>
                        <select className="w-full p-2 border rounded-md" required>
                          <option value="">-- {t.property} --</option>
                          {properties.map(property => (
                            <option key={property.id} value={property.id}>{property.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{t.valuationMethod}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="comparableMethod" name="valuationMethod" value="comparableMethod" defaultChecked />
                      <label htmlFor="comparableMethod">{t.comparableMethod}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="incomeMethod" name="valuationMethod" value="incomeMethod" />
                      <label htmlFor="incomeMethod">{t.incomeMethod}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="costMethod" name="valuationMethod" value="costMethod" />
                      <label htmlFor="costMethod">{t.costMethod}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="developmentMethod" name="valuationMethod" value="developmentMethod" />
                      <label htmlFor="developmentMethod">{t.developmentMethod}</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{t.comparables}</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">נכס 1</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="כתובת" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שטח (מ"ר)</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="שטח" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">מחיר (₪)</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="מחיר" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">נכס 2</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="כתובת" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שטח (מ"ר)</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="שטח" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">מחיר (₪)</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="מחיר" />
                      </div>
                    </div>
                  </div>
                  <button type="button" className="flex items-center text-blue-600 hover:text-blue-800">
                    <Plus size={16} className="mr-1" />
                    <span>{t.addComparable}</span>
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{t.propertyFactors}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.locationFactor}</label>
                      <input type="number" step="0.01" min="0.5" max="1.5" className="w-full p-2 border rounded-md" defaultValue="1.0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.conditionFactor}</label>
                      <input type="number" step="0.01" min="0.5" max="1.5" className="w-full p-2 border rounded-md" defaultValue="1.0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.sizeFactor}</label>
                      <input type="number" step="0.01" min="0.5" max="1.5" className="w-full p-2 border rounded-md" defaultValue="1.0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.ageFactor}</label>
                      <input type="number" step="0.01" min="0.5" max="1.5" className="w-full p-2 border rounded-md" defaultValue="1.0" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{t.finalValuation}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.propertyValue}</label>
                      <div className="relative">
                        <input type="text" className="w-full p-2 pl-8 border rounded-md" required />
                        <DollarSign className="absolute top-2.5 left-2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.date}</label>
                      <input type="date" className="w-full p-2 border rounded-md" defaultValue={new Date().toISOString().split('T')[0]} required />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.notes}</label>
                  <textarea className="w-full p-2 border rounded-md" rows={4}></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                    onClick={() => {
                      setShowNewValuationModal(false);
                      setSelectedProperty(null);
                    }}
                  >
                    {t.cancel}
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {t.save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Valuation Report Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.valuationReport}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowReportModal(false);
                    setSelectedReport(null);
                  }}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{selectedReport.propertyName}</h3>
                  {getStatusBadge(selectedReport.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{t.date}</p>
                    <p className="font-medium">{selectedReport.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.appraiser}</p>
                    <p className="font-medium">{selectedReport.appraiser}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.method}</p>
                    <p className="font-medium">{getMethodTranslation(selectedReport.method)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.value}</p>
                    <p className="font-medium">{selectedReport.value}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t.notes}</h4>
                  <p className="text-gray-600">{selectedReport.notes}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => {
                    setShowReportModal(false);
                    setSelectedReport(null);
                  }}
                >
                  {t.cancel}
                </button>
                <button 
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => alert('מוריד את הדוח...')}
                >
                  <Download size={18} className="mr-2" />
                  {t.downloadReport}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyValuation;