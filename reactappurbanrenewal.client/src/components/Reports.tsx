import React, { useState } from 'react';
import { BarChart3, PieChart, LineChart, Download, Calendar, Filter } from 'lucide-react';

interface ReportsProps {
  language: string;
}

const Reports: React.FC<ReportsProps> = ({ language }) => {
  const [activeReport, setActiveReport] = useState('sales');
  const [dateRange, setDateRange] = useState('month');
  
  
  const translations = {
    en: {
      reports: 'Reports',
      salesReport: 'Sales Report',
      customerReport: 'Customer Report',
      inventoryReport: 'Inventory Report',
      financialReport: 'Financial Report',
      export: 'Export',
      filter: 'Filter',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly',
      custom: 'Custom',
      totalSales: 'Total Sales',
      averageOrderValue: 'Average Order Value',
      topSellingProducts: 'Top Selling Products',
      salesByCategory: 'Sales by Category',
      revenueOverTime: 'Revenue Over Time',
      product: 'Product',
      quantity: 'Quantity',
      revenue: 'Revenue',
      category: 'Category',
      percentage: 'Percentage',
      date: 'Date',
      amount: 'Amount'
    },
    he: {
      reports: 'דוחות',
      salesReport: 'דוח מכירות',
      customerReport: 'דוח לקוחות',
      inventoryReport: 'דוח מלאי',
      financialReport: 'דוח פיננסי',
      export: 'ייצוא',
      filter: 'סינון',
      daily: 'יומי',
      weekly: 'שבועי',
      monthly: 'חודשי',
      yearly: 'שנתי',
      custom: 'מותאם אישית',
      totalSales: 'סה"כ מכירות',
      averageOrderValue: 'ערך הזמנה ממוצע',
      topSellingProducts: 'מוצרים נמכרים ביותר',
      salesByCategory: 'מכירות לפי קטגוריה',
      revenueOverTime: 'הכנסות לאורך זמן',
      product: 'מוצר',
      quantity: 'כמות',
      revenue: 'הכנסה',
      category: 'קטגוריה',
      percentage: 'אחוז',
      date: 'תאריך',
      amount: 'סכום'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  // Sample data
  const topSellingProducts = [
    { id: 1, name: 'מחשב נייד דל XPS 15', quantity: 42, revenue: '₪272,958' },
    { id: 2, name: 'אייפון 14 פרו', quantity: 38, revenue: '₪163,362' },
    { id: 3, name: 'מסך מחשב סמסונג 27"', quantity: 29, revenue: '₪34,771' },
    { id: 4, name: 'אוזניות אלחוטיות סוני WH-1000XM4', quantity: 23, revenue: '₪25,277' },
    { id: 5, name: 'מדפסת לייזר HP LaserJet Pro', quantity: 18, revenue: '₪16,182' },
  ];

  const salesByCategory = [
    { id: 1, name: 'מחשבים ניידים', percentage: 35, revenue: '₪312,465' },
    { id: 2, name: 'סמארטפונים', percentage: 28, revenue: '₪249,972' },
    { id: 3, name: 'צגים', percentage: 15, revenue: '₪133,845' },
    { id: 4, name: 'אוזניות', percentage: 12, revenue: '₪107,076' },
    { id: 5, name: 'מדפסות', percentage: 10, revenue: '₪89,230' },
  ];

  const revenueOverTime = [
    { id: 1, date: '2023-01', amount: '₪72,500' },
    { id: 2, date: '2023-02', amount: '₪81,200' },
    { id: 3, date: '2023-03', amount: '₪65,800' },
    { id: 4, date: '2023-04', amount: '₪97,300' },
    { id: 5, date: '2023-05', amount: '₪92,100' },
    { id: 6, date: '2023-06', amount: '₪108,400' }
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

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.reports}</h1>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <div className="flex">
            <button 
              className={`px-4 py-2 ${activeReport === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-l-md`}
              onClick={() => setActiveReport('sales')}
            >
              {t.salesReport}
            </button>
            <button 
              className={`px-4 py-2 ${activeReport === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveReport('customer')}
            >
              {t.customerReport}
            </button>
            <button 
              className={`px-4 py-2 ${activeReport === 'inventory' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveReport('inventory')}
            >
              {t.inventoryReport}
            </button>
            <button 
              className={`px-4 py-2 ${activeReport === 'financial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-r-md`}
              onClick={() => setActiveReport('financial')}
            >
              {t.financialReport}
            </button>
          </div>
          <div className="flex gap-2">
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
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === 'day' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setDateRange('day')}
          >
            {t.daily}
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === 'week' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setDateRange('week')}
          >
            {t.weekly}
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === 'month' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setDateRange('month')}
          >
            {t.monthly}
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === 'year' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setDateRange('year')}
          >
            {t.yearly}
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === 'custom' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setDateRange('custom')}
          >
            {t.custom}
          </button>
          {dateRange === 'custom' && (
            <div className="flex gap-2 items-center">
              <input type="date" className="border rounded-md p-2" />
              <span>-</span>
              <input type="date" className="border rounded-md p-2" />
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.totalSales}</h2>
            <BarChart3 className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">₪892,588</p>
          <div className="flex items-center text-green-600">
            <span className="text-sm">+12.5% {t.monthly}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.averageOrderValue}</h2>
            <LineChart className="text-purple-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">₪42,504</p>
          <div className="flex items-center text-green-600">
            <span className="text-sm">+5.2% {t.monthly}</span>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">{t.topSellingProducts}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t.product}</th>
                  <th className="text-center py-3 px-4">{t.quantity}</th>
                  <th className="text-right py-3 px-4">{t.revenue}</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="text-center py-3 px-4">{product.quantity}</td>
                    <td className="text-right py-3 px-4">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Sales by Category */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">{t.salesByCategory}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t.category}</th>
                  <th className="text-center py-3 px-4">{t.percentage}</th>
                  <th className="text-right py-3 px-4">{t.revenue}</th>
                </tr>
              </thead>
              <tbody>
                {salesByCategory.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="py-3 px-4">{category.name}</td>
                    <td className="text-center py-3 px-4">{category.percentage}%</td>
                    <td className="text-right py-3 px-4">{category.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Revenue Over Time */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t.revenueOverTime}</h2>
        <div className="h-64 flex items-end space-x-6 px-4">
          {revenueOverTime.map((data) => {
            // Calculate height percentage (assuming max is 120,000)
            const heightPercentage = parseInt(data.amount.replace(/[₪,]/g, '')) / 1200;
            return (
              <div key={data.id} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t-md" 
                  style={{ height: `${heightPercentage}%` }}
                ></div>
                <span className="text-xs mt-2">{data.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;