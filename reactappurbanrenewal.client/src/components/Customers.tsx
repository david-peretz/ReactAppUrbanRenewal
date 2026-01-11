import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Download, Mail, Phone, X } from 'lucide-react';

interface CustomersProps {
  language: string;
}

interface Customer {
  id: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  status?: string;
  lastContact?: string;
  totalDeals?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
  customerType: string;
  budget?: string;
  preferredLocation?: string;
  propertyType?: string;
  identificationNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Customers: React.FC<CustomersProps> = ({ language }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state for new customer
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    customerType: 'buyer',
    budget: '',
    preferredLocation: '',
    propertyType: '',
    notes: ''
  });
  
  // State for customers list
  const [customersList, setCustomersList] = useState([
    { 
      id: 1, 
      name: 'דוד כהן', 
      email: 'david@example.com', 
      phone: '050-1234567', 
      status: 'active', 
      lastContact: '2023-06-10', 
      totalDeals: '3',
      address: 'רחוב הרצל 15, תל אביב',
      notes: 'מחפש דירת 4 חדרים באזור המרכז, תקציב עד 2.5 מיליון ₪',
      customerType: 'buyer',
      budget: '₪2,500,000',
       preferredLocation: 'תל אביב, רמת גן',
      propertyType: 'דירת 4 חדרים'
    },
    { 
      id: 2, 
      name: 'מיכל לוי', 
      email: 'michal@example.com', 
      phone: '052-7654321', 
      status: 'active', 
      lastContact: '2023-06-05', 
      totalDeals: '1',
      address: 'רחוב ויצמן 42, חיפה',
      notes: 'מעוניינת למכור דירת 3 חדרים בחיפה',
      customerType: 'seller',
      budget: '',
      preferredLocation: 'חיפה',
      propertyType: 'דירת 3 חדרים'
    },
    { 
      id: 3, 
      name: 'יוסי אברהם', 
      email: 'yossi@example.com', 
      phone: '054-9876543', 
      status: 'inactive', 
      lastContact: '2023-05-20', 
      totalDeals: '0',
      address: 'רחוב הנביאים 8, ירושלים',
      notes: 'מחפש להשקיע בנכסים להשכרה',
      customerType: 'investor',
      budget: '₪5,000,000',
      preferredLocation: 'ירושלים, תל אביב',
      propertyType: 'דירות להשקעה'
    },
    { 
      id: 4, 
      name: 'רונית שמעוני', 
      email: 'ronit@example.com', 
      phone: '053-1472583', 
      status: 'active', 
      lastContact: '2023-06-12', 
      totalDeals: '2',
      address: 'שדרות רוטשילד 67, תל אביב',
      notes: 'מעוניינת בדירה בפרויקט פינוי-בינוי',
      customerType: 'buyer',
      budget: '₪3,200,000',
      preferredLocation: 'תל אביב',
      propertyType: 'דירה בפרויקט התחדשות עירונית'
    },
    { 
      id: 5, 
      name: 'אבי גולן', 
      email: 'avi@example.com', 
      phone: '050-9638527', 
      status: 'active', 
      lastContact: '2023-06-08', 
      totalDeals: '4',
      address: 'רחוב סוקולוב 23, רמת גן',
      notes: 'משקיע בפרויקטים של תמ"א 38',
      customerType: 'investor',
      budget: '₪10,000,000',
      preferredLocation: 'גוש דן',
      propertyType: 'פרויקטי תמ"א 38'
    },
  ]);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/customers');
        console.log('Customers response:', response.data);
        // Handle both regular array and $values format from ASP.NET Core
        let customersData = response.data;
        if (customersData && customersData.$values) {
          customersData = customersData.$values;
        }
        // Ensure we have an array
        customersData = Array.isArray(customersData) ? customersData : [];
        // Map server data to match UI expectations
        const mappedCustomers = customersData.map((customer: Customer) => ({
          ...customer,
          name: customer.name || `${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
          phone: customer.phone || customer.phoneNumber,
        }));
        setCustomersList(mappedCustomers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again later.');
        setLoading(false);
        // Keep demo data as fallback
      }
    };

    fetchCustomers();
  }, []);
  
  const translations = {
    en: {
      customers: 'Customers',
      search: 'Search customers...',
      addCustomer: 'Add Customer',
      filter: 'Filter',
      export: 'Export',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      status: 'Status',
      lastContact: 'Last Contact',
      totalDeals: 'Total Deals',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      customerDetails: 'Customer Details',
      address: 'Address',
      deals: 'Deals',
      notes: 'Notes',
      save: 'Save',
      cancel: 'Cancel',
      firstName: 'First Name',
      lastName: 'Last Name',
      city: 'City',
      postalCode: 'Postal Code',
      country: 'Country',
      buyer: 'Buyer',
      seller: 'Seller',
      investor: 'Investor',
      tenant: 'Tenant',
      budget: 'Budget',
      preferredLocation: 'Preferred Location',
      propertyType: 'Property Type'
    },
    he: {
      customers: 'לקוחות',
      search: 'חיפוש לקוחות...',
      addCustomer: 'הוספת לקוח',
      filter: 'סינון',
      export: 'ייצוא',
      name: 'שם',
      email: 'אימייל',
      phone: 'טלפון',
      status: 'סטטוס',
      lastContact: 'קשר אחרון',
      totalDeals: 'סה"כ עסקאות',
      actions: 'פעולות',
      active: 'פעיל',
      inactive: 'לא פעיל',
      edit: 'עריכה',
      delete: 'מחיקה',
      customerDetails: 'פרטי לקוח',
      address: 'כתובת',
      deals: 'עסקאות',
      notes: 'הערות',
      save: 'שמירה',
      cancel: 'ביטול',
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      city: 'עיר',
      postalCode: 'מיקוד',
      country: 'מדינה',
      buyer: 'קונה',
      seller: 'מוכר',
      investor: 'משקיע',
      tenant: 'שוכר',
      budget: 'תקציב',
      preferredLocation: 'אזור מועדף',
      propertyType: 'סוג נכס'
    }
  };

  const t = translations[language as keyof typeof translations];
  const isRTL = language === 'he';

  const getStatusBadge = (status: string): JSX.Element => {
    if (status === 'active') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.active}</span>;
    } else {
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{t.inactive}</span>;
    }
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  // Function to handle form submission for new customer
  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create a new customer object
    const newCustomerObj = {
      id: customersList.length + 1,
      name: `${newCustomer.firstName} ${newCustomer.lastName}`,
      email: newCustomer.email,
      phone: newCustomer.phone,
      status: 'active',
      lastContact: new Date().toISOString().split('T')[0],
      totalDeals: '0',
      address: `${newCustomer.address}, ${newCustomer.city}`,
      notes: newCustomer.notes,
      customerType: newCustomer.customerType,
      budget: newCustomer.budget,
      preferredLocation: newCustomer.preferredLocation,
      propertyType: newCustomer.propertyType
    };
    
    // Add the new customer to the list
    setCustomersList([...customersList, newCustomerObj]);
    
    // Reset form and close modal
    setNewCustomer({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      customerType: 'buyer',
      budget: '',
      preferredLocation: '',
      propertyType: '',
      notes: ''
    });
    setShowAddModal(false);
    
    // Show success message
    alert('לקוח נוסף בהצלחה!');
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.customers}</h1>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder={t.search}
              className="pl-10 pr-4 py-2 border rounded-md w-full"
            />
            <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          </div>
          <button 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowAddModal(true)}
            data-action="add-customer"
          >
            <Plus size={18} />
            <span>{t.addCustomer}</span>
          </button>
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

      {/* Loading State */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-4">
          <p>Loading customers...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm underline"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.name}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.email}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.phone}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.lastContact}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.totalDeals}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customersList.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.totalDeals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
              {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.customerDetails}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedCustomer(null)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">{selectedCustomer.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Mail size={16} className="mr-2" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">{t.address}</h3>
                  <p className="text-gray-600">{selectedCustomer.address}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">{t.deals}</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t.lastContact}:</span>
                    <span>{selectedCustomer.lastContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.totalDeals}:</span>
                    <span className="font-medium">{selectedCustomer.totalDeals}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">פרטי התעניינות</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">סוג לקוח:</span>
                    <span>{selectedCustomer.customerType === 'buyer' ? t.buyer : 
                           selectedCustomer.customerType === 'seller' ? t.seller :
                           selectedCustomer.customerType === 'investor' ? t.investor : t.tenant}</span>
                  </div>
                  {selectedCustomer.budget && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.budget}:</span>
                      <span>{selectedCustomer.budget}</span>
                    </div>
                  )}
                  {selectedCustomer.preferredLocation && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.preferredLocation}:</span>
                      <span>{selectedCustomer.preferredLocation}</span>
                    </div>
                  )}
                  {selectedCustomer.propertyType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.propertyType}:</span>
                      <span>{selectedCustomer.propertyType}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">{t.notes}</h3>
                <p className="text-gray-600">{selectedCustomer.notes || 'No notes available.'}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setSelectedCustomer(null)}
                >
                  {t.cancel}
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  {t.edit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.addCustomer}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAddModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddCustomer}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName}</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={newCustomer.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.lastName}</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={newCustomer.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={newCustomer.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={newCustomer.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label>
                    <input 
                      type="text" 
                      name="address"
                      value={newCustomer.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.city}</label>
                    <input 
                      type="text" 
                      name="city"
                      value={newCustomer.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.postalCode}</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={newCustomer.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">סוג לקוח</label>
                    <select 
                      name="customerType"
                      value={newCustomer.customerType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="buyer">{t.buyer}</option>
                      <option value="seller">{t.seller}</option>
                      <option value="investor">{t.investor}</option>
                      <option value="tenant">{t.tenant}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.budget}</label>
                    <input 
                      type="text" 
                      name="budget"
                      value={newCustomer.budget}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.preferredLocation}</label>
                    <input 
                      type="text" 
                      name="preferredLocation"
                      value={newCustomer.preferredLocation}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.propertyType}</label>
                    <input 
                      type="text" 
                      name="propertyType"
                      value={newCustomer.propertyType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.notes}</label>
                    <textarea 
                      name="notes"
                      value={newCustomer.notes}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      rows={3}
                    ></textarea>
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
    </div>
  );
};

export default Customers;