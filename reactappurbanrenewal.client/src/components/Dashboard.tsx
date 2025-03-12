import React from 'react';
import { BarChart3, Users, ShoppingCart, DollarSign, TrendingUp, TrendingDown, Calendar, Clock, Home, Building, MapPin, FileSpreadsheet } from 'lucide-react';
import SimulationButtons from './SimulationButtons';

interface DashboardProps {
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const isRTL = language === 'he';

  const translations = {
    en: {
      dashboard: 'Dashboard',
      summary: 'Summary',
      totalProperties: 'Total Properties',
      totalClients: 'Total Clients',
      totalProjects: 'Total Projects',
      revenue: 'Revenue',
      thisWeek: 'This Week',
      lastWeek: 'Last Week',
      recentSales: 'Recent Sales',
      client: 'Client',
      property: 'Property',
      date: 'Date',
      amount: 'Amount',
      status: 'Status',
      upcomingMeetings: 'Upcoming Meetings',
      time: 'Time',
      with: 'With',
      salesOverview: 'Sales Overview',
      jan: 'Jan',
      feb: 'Feb',
      mar: 'Mar',
      apr: 'Apr',
      may: 'May',
      jun: 'Jun',
      topProperties: 'Top Properties',
      propertyName: 'Property Name',
      sold: 'Sold',
      revenue: 'Revenue',
      paid: 'Paid',
      pending: 'Pending',
      cancelled: 'Cancelled',
      urbanRenewalProjects: 'Urban Renewal Projects',
      projectProgress: 'Project Progress',
      propertyType: 'Property Type',
      residential: 'Residential',
      commercial: 'Commercial',
      mixed: 'Mixed Use',
      industrial: 'Industrial',
      quickActions: 'Quick Actions',
      openTenders: 'Open Tenders',
      tenderName: 'Tender Name',
      publisher: 'Publisher',
      deadline: 'Deadline',
      viewDetails: 'View Details',
      applyNow: 'Apply Now'
    },
    he: {
      dashboard: 'לוח בקרה',
      summary: 'סיכום',
      totalProperties: 'סה"כ נכסים',
      totalClients: 'סה"כ לקוחות',
      totalProjects: 'סה"כ פרויקטים',
      revenue: 'הכנסות',
      thisWeek: 'השבוע',
      lastWeek: 'שבוע שעבר',
      recentSales: 'מכירות אחרונות',
      client: 'לקוח',
      property: 'נכס',
      date: 'תאריך',
      amount: 'סכום',
      status: 'סטטוס',
      upcomingMeetings: 'פגישות קרובות',
      time: 'שעה',
      with: 'עם',
      salesOverview: 'סקירת מכירות',
      jan: 'ינו',
      feb: 'פבר',
      mar: 'מרץ',
      apr: 'אפר',
      may: 'מאי',
      jun: 'יוני',
      topProperties: 'נכסים מובילים',
      propertyName: 'שם הנכס',
      sold: 'נמכר',
      revenue: 'הכנסה',
      paid: 'שולם',
      pending: 'ממתין',
      cancelled: 'בוטל',
      urbanRenewalProjects: 'פרויקטי התחדשות עירונית',
      projectProgress: 'התקדמות פרויקטים',
      propertyType: 'סוג נכס',
      residential: 'מגורים',
      commercial: 'מסחרי',
      mixed: 'שימוש מעורב',
      industrial: 'תעשייתי',
      quickActions: 'פעולות מהירות',
      openTenders: 'מכרזים פתוחים',
      tenderName: 'שם המכרז',
      publisher: 'מפרסם',
      deadline: 'תאריך אחרון',
      viewDetails: 'צפה בפרטים',
      applyNow: 'הגש הצעה'
    }
  };

  const t = translations[language];

  // Sample data
  const recentSales = [
    { id: 1, client: 'דוד כהן', property: 'דירת 4 חדרים, רמת גן', date: '2023-06-15', amount: '₪2,450,000', status: 'paid' },
    { id: 2, client: 'מיכל לוי', property: 'דירת 3 חדרים, תל אביב', date: '2023-06-14', amount: '₪1,980,000', status: 'paid' },
    { id: 3, client: 'יוסי אברהם', property: 'משרד 120 מ"ר, הרצליה', date: '2023-06-13', amount: '₪3,200,000', status: 'pending' },
    { id: 4, client: 'רונית שמעוני', property: 'דירת גן, רעננה', date: '2023-06-12', amount: '₪4,100,000', status: 'cancelled' },
    { id: 5, client: 'אבי גולן', property: 'חנות, קניון איילון', date: '2023-06-11', amount: '₪1,750,000', status: 'paid' },
  ];

  const upcomingMeetings = [
    { id: 1, time: '09:00', with: 'דוד כהן', subject: 'הצגת דירה ברמת גן' },
    { id: 2, time: '11:30', with: 'מיכל לוי', subject: 'חתימת חוזה - פרויקט תמ"א 38' },
    { id: 3, time: '14:00', with: 'יוסי אברהם', subject: 'פגישת התקדמות - פינוי בינוי' },
    { id: 4, time: '16:30', with: 'ועד דיירים', subject: 'הצגת תוכניות התחדשות' },
  ];

  const topProperties = [
    { id: 1, name: 'מגדל המגורים, רמת גן', sold: 42, revenue: '₪89,000,000' },
    { id: 2, name: 'פרויקט פינוי-בינוי, חולון', sold: 38, revenue: '₪83,600,000' },
    { id: 3, name: 'תמ"א 38, גבעתיים', sold: 29, revenue: '₪52,200,000' },
    { id: 4, name: 'מתחם מסחרי, תל אביב', sold: 23, revenue: '₪121,850,000' },
  ];

  // Sample open tenders data
  const openTenders = [
    { 
      id: 1, 
      name: 'פינוי-בינוי מתחם הרצל, תל אביב', 
      publisher: 'עיריית תל אביב-יפו', 
      deadline: '2023-08-15'
    },
    { 
      id: 2, 
      name: 'תמ"א 38/2 רחוב ביאליק, רמת גן', 
      publisher: 'עיריית רמת גן', 
      deadline: '2023-07-30'
    },
    { 
      id: 3, 
      name: 'התחדשות עירונית מתחם העיריה, חולון', 
      publisher: 'עיריית חולון', 
      deadline: '2023-09-30'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return t.paid;
      case 'pending':
        return t.pending;
      case 'cancelled':
        return t.cancelled;
      default:
        return status;
    }
  };

  const handleApplyForTender = (tenderId) => {
    // Navigate to tenders page with the selected tender
    window.location.hash = `tenders-${tenderId}`;
    // In a real application, this would use a router to navigate
    // and pass the tender ID as a parameter
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t.dashboard}</h1>
      
      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">{t.quickActions}</h2>
        <SimulationButtons language={language} userRole="developer" />
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.totalProperties}</p>
              <p className="text-2xl font-bold">284</p>
              <div className="flex items-center mt-2 text-green-600">
                <TrendingUp size={16} />
                <span className="text-sm ml-1">+8.5%</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Home className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.totalClients}</p>
              <p className="text-2xl font-bold">843</p>
              <div className="flex items-center mt-2 text-green-600">
                <TrendingUp size={16} />
                <span className="text-sm ml-1">+4.3%</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.totalProjects}</p>
              <p className="text-2xl font-bold">56</p>
              <div className="flex items-center mt-2 text-green-600">
                <TrendingUp size={16} />
                <span className="text-sm ml-1">+12.1%</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Building className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.revenue}</p>
              <p className="text-2xl font-bold">₪346,856,000</p>
              <div className="flex items-center mt-2 text-green-600">
                <TrendingUp size={16} />
                <span className="text-sm ml-1">+8.7%</span>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Open Tenders */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t.openTenders}</h2>
          <a href="#tenders" className="text-blue-600 text-sm">{t.viewDetails}</a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">{t.tenderName}</th>
                <th className="text-left py-3 px-4">{t.publisher}</th>
                <th className="text-left py-3 px-4">{t.deadline}</th>
                <th className="text-right py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {openTenders.map((tender) => (
                <tr key={tender.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <FileSpreadsheet className="text-blue-500 mr-2" size={18} />
                      <span>{tender.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{tender.publisher}</td>
                  <td className="py-3 px-4">{tender.deadline}</td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => handleApplyForTender(tender.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                      id="apply-tender-button"
                    >
                      {t.applyNow}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t.salesOverview}</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">{t.thisWeek}</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">{t.lastWeek}</button>
            </div>
          </div>
          <div className="h-64 flex items-end space-x-6 px-4">
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '40%' }}></div>
              <span className="text-xs mt-2">{t.jan}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '65%' }}></div>
              <span className="text-xs mt-2">{t.feb}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '50%' }}></div>
              <span className="text-xs mt-2">{t.mar}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '80%' }}></div>
              <span className="text-xs mt-2">{t.apr}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '75%' }}></div>
              <span className="text-xs mt-2">{t.may}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: '90%' }}></div>
              <span className="text-xs mt-2">{t.jun}</span>
            </div>
          </div>
        </div>
        
        {/* Urban Renewal Projects */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">{t.urbanRenewalProjects}</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>פינוי-בינוי, יפו</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>תמ"א 38, רמת גן</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>התחדשות מרכז העיר, חולון</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>מתחם מסחרי, הרצליה</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>שכונת מגורים חדשה, ראשל"צ</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Property Types and Top Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Property Types */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">{t.propertyType}</h2>
          <div className="h-64 flex items-center justify-center">
            {/* Simplified pie chart visualization */}
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0)' }}></div>
              <div className="absolute inset-0 rounded-full bg-purple-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%)' }}></div>
              <div className="absolute inset-0 rounded-full bg-green-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 0 50%, 0 100%, 50% 100%)' }}></div>
              <div className="absolute inset-0 rounded-full bg-yellow-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 0 50%)' }}></div>
              <div className="absolute inset-0 rounded-full bg-red-500" style={{ clipPath: 'polygon(50% 50%, 0 0)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">{t.residential} (65%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm">{t.commercial} (20%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">{t.mixed} (10%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm">{t.industrial} (5%)</span>
            </div>
          </div>
        </div>
        
        {/* Top Properties */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">{t.topProperties}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t.propertyName}</th>
                  <th className="text-center py-3 px-4">{t.sold}</th>
                  <th className="text-right py-3 px-4">{t.revenue}</th>
                </tr>
              </thead>
              <tbody>
                {topProperties.map((property) => (
                  <tr key={property.id} className="border-b">
                    <td className="py-3 px-4">{property.name}</td>
                    <td className="text-center py-3 px-4">{property.sold}</td>
                    <td className="text-right py-3 px-4">{property.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Sales and Upcoming Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">{t.recentSales}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t.client}</th>
                  <th className="text-left py-3 px-4">{t.property}</th>
                  <th className="text-center py-3 px-4">{t.date}</th>
                  <th className="text-right py-3 px-4">{t.amount}</th>
                  <th className="text-right py-3 px-4">{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b">
                    <td className="py-3 px-4">{sale.client}</td>
                    <td className="py-3 px-4">{sale.property}</td>
                    <td className="text-center py-3 px-4">{sale.date}</td>
                    <td className="text-right py-3 px-4">{sale.amount}</td>
                    <td className="text-right py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(sale.status)}`}>
                        {getStatusText(sale.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Upcoming Meetings */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">{t.upcomingMeetings}</h2>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center p-3 border rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{meeting.subject}</p>
                  <p className="text-sm text-gray-500">{t.with}: {meeting.with}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{meeting.time}</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;