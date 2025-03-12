import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter, Download, Tag, MapPin, DollarSign, X, Home, Building, Square, Users, Calendar, Phone, Mail, Globe } from 'lucide-react';

interface ProductsProps {
  language: string;
}

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  status: string;
  type: string;
  size: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  yearBuilt: number;
  description: string;
  features: string[];
  neighborhood: string;
  city: string;
  urbanRenewal: boolean;
  projectType?: string;
  projectStatus?: string;
  completionDate?: string;
  developer?: string;
  architect?: string;
  contractor?: string;
  unitsTotal?: number;
  unitsSold?: number;
  salesOffice?: string;
  salesPhone?: string;
  salesEmail?: string;
  website?: string;
}

const Products: React.FC<ProductsProps> = ({ language }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form state for new property
  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    price: '',
    status: 'forSale',
    type: 'residential',
    size: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: new Date().getFullYear(),
    description: '',
    features: '',
    neighborhood: '',
    city: '',
    urbanRenewal: 'false',
    projectType: 'tama38'
  });
  
  // State for properties list
  const [properties, setProperties] = useState([
    { 
      id: 1, 
      name: 'דירת 4 חדרים, רמת גן', 
      location: 'רחוב ביאליק 15, רמת גן', 
      price: '₪2,450,000', 
      status: 'forSale',
      type: 'residential',
      size: '110 מ"ר',
      bedrooms: 4,
      bathrooms: 2,
      yearBuilt: 2015,
      description: 'דירת 4 חדרים מרווחת ומוארת ברמת גן, קרובה לפארק הלאומי ולמרכז העיר. הדירה כוללת מרפסת שמש, חניה ומחסן.',
      features: ['מרפסת שמש', 'חניה', 'מחסן', 'מיזוג אוויר מרכזי', 'מעלית', 'ממ"ד'],
      neighborhood: 'מרכז רמת גן',
      city: 'רמת גן',
      urbanRenewal: false
    },
    { 
      id: 2, 
      name: 'פרויקט פינוי-בינוי, חולון', 
      location: 'רחוב הבנים, חולון', 
      price: 'החל מ-₪1,800,000', 
      status: 'underConstruction',
      type: 'residential',
      size: '80-140 מ"ר',
      bedrooms: '3-5',
      bathrooms: '2-3',
      yearBuilt: 2025,
      description: 'פרויקט פינוי-בינוי חדש בחולון, הכולל 120 יחידות דיור ב-3 בניינים. הפרויקט כולל שטחים ירוקים, חניון תת-קרקעי ומרכז מסחרי.',
      features: ['לובי מפואר', 'חניון תת-קרקעי', 'גינה משותפת', 'מועדון דיירים', 'חדר כושר'],
      neighborhood: 'מרכז חולון',
      city: 'חולון',
      urbanRenewal: true,
      projectType: 'pinuiBinui',
      projectStatus: '30% מכור',
      completionDate: '2025',
      developer: 'אלמוגים בנייה',
      architect: 'משרד אדריכלים ישראלי',
      contractor: 'אלמוגים בנייה',
      unitsTotal: 120,
      unitsSold: 36,
      salesOffice: 'רחוב הבנים 10, חולון',
      salesPhone: '03-1234567',
      salesEmail: 'sales@almogim.co.il',
      website: 'www.almogim-holonproject.co.il'
    },
    { 
      id: 3, 
      name: 'משרדים להשכרה, הרצליה פיתוח', 
      location: 'רחוב אבא אבן 10, הרצליה פיתוח', 
      price: '₪120 למ"ר', 
      status: 'forRent',
      type: 'commercial',
      size: '200-1000 מ"ר',
      yearBuilt: 2018,
      description: 'משרדים להשכרה במגדל יוקרתי בהרצליה פיתוח. המשרדים מאובזרים ברמה גבוהה וכוללים חניות, שירותי אבטחה 24/7 ושירותי ניהול.',
      features: ['לובי מפואר', 'חניון', 'אבטחה 24/7', 'מיזוג אוויר מרכזי', 'חדרי ישיבות משותפים'],
      neighborhood: 'הרצליה פיתוח',
      city: 'הרצליה',
      urbanRenewal: false
    },
    { 
      id: 4, 
      name: 'בית פרטי, סביון', 
      location: 'רחוב האלון, סביון', 
      price: '₪12,500,000', 
      status: 'forSale',
      type: 'residential',
      size: '350 מ"ר',
      bedrooms: 6,
      bathrooms: 4,
      yearBuilt: 2010,
      description: 'בית פרטי מפואר בסביון על מגרש של 800 מ"ר. הבית כולל בריכת שחייה, גינה מטופחת, חניה ל-4 רכבים ומערכות בית חכם.',
      features: ['בריכת שחייה', 'גינה', 'חניה ל-4 רכבים', 'בית חכם', 'מרתף', 'חדר כושר'],
      neighborhood: 'סביון',
      city: 'סביון',
      urbanRenewal: false
    },
    { 
      id: 5, 
      name: 'פרויקט תמ"א 38, תל אביב', 
      location: 'רחוב ארלוזורוב, תל אביב', 
      price: 'החל מ-₪3,200,000', 
      status: 'underConstruction',
      type: 'residential',
      size: '90-120 מ"ר',
      bedrooms: '3-4',
      bathrooms: '2',
      yearBuilt: 2024,
      description: 'פרויקט תמ"א 38/2 (הריסה ובנייה) ברחוב ארלוזורוב בתל אביב. הפרויקט כולל 24 יחידות דיור בבניין בן 8 קומות עם חניון תת-קרקעי.',
      features: ['מרפסות שמש', 'חניון תת-קרקעי', 'לובי מפואר', 'מעלית', 'ממ"ד'],
      neighborhood: 'מרכז העיר',
      city: 'תל אביב',
      urbanRenewal: true,
      projectType: 'tama38',
      projectStatus: '50% מכור',
      completionDate: '2024',
      developer: 'י.ח. דמרי',
      architect: 'בר אוריין אדריכלים',
      contractor: 'י.ח. דמרי',
      unitsTotal: 24,
      unitsSold: 12,
      salesOffice: 'רחוב ארלוזורוב 100, תל אביב',
      salesPhone: '03-9876543',
      salesEmail: 'sales@dimri.co.il',
      website: 'www.dimri-tlv.co.il'
    },
  ]);

  const translations = {
    en: {
      properties: 'Properties',
      search: 'Search properties...',
      addProperty: 'Add Property',
      filter: 'Filter',
      export: 'Export',
      name: 'Name',
      location: 'Location',
      price: 'Price',
      status: 'Status',
      type: 'Type',
      actions: 'Actions',
      forSale: 'For Sale',
      forRent: 'For Rent',
      sold: 'Sold',
      rented: 'Rented',
      underConstruction: 'Under Construction',
      edit: 'Edit',
      delete: 'Delete',
      propertyDetails: 'Property Details',
      description: 'Description',
      specifications: 'Specifications',
      save: 'Save',
      cancel: 'Cancel',
      id: 'ID',
      size: 'Size',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      yearBuilt: 'Year Built',
      features: 'Features',
      address: 'Address',
      neighborhood: 'Neighborhood',
      city: 'City',
      propertyType: 'Property Type',
      residential: 'Residential',
      commercial: 'Commercial',
      industrial: 'Industrial',
      land: 'Land',
      urbanRenewal: 'Urban Renewal',
      projectType: 'Project Type',
      tama38: 'TAMA 38',
      pinuiBinui: 'Pinui-Binui',
      urbanRenewalOther: 'Other Urban Renewal',
      projectStatus: 'Project Status',
      completionDate: 'Completion Date',
      developer: 'Developer',
      architect: 'Architect',
      contractor: 'Contractor',
      unitsTotal: 'Total Units',
      unitsSold: 'Units Sold',
      floorPlans: 'Floor Plans',
      gallery: 'Gallery',
      documents: 'Documents',
      contactInfo: 'Contact Information',
      salesOffice: 'Sales Office',
      salesPhone: 'Sales Phone',
      salesEmail: 'Sales Email',
      website: 'Website',
      amenities: 'Amenities',
      parking: 'Parking',
      elevator: 'Elevator',
      storage: 'Storage',
      balcony: 'Balcony',
      garden: 'Garden',
      accessibility: 'Accessibility',
      securitySystem: 'Security System',
      airConditioning: 'Air Conditioning',
      heating: 'Heating',
      furnished: 'Furnished'
    },
    he: {
      properties: 'נכסים',
      search: 'חיפוש נכסים...',
      addProperty: 'הוספת נכס',
      filter: 'סינון',
      export: 'ייצוא',
      name: 'שם',
      location: 'מיקום',
      price: 'מחיר',
      status: 'סטטוס',
      type: 'סוג',
      actions: 'פעולות',
      forSale: 'למכירה',
      forRent: 'להשכרה',
      sold: 'נמכר',
      rented: 'הושכר',
      underConstruction: 'בבנייה',
      edit: 'עריכה',
      delete: 'מחיקה',
      propertyDetails: 'פרטי נכס',
      description: 'תיאור',
      specifications: 'מפרט טכני',
      save: 'שמירה',
      cancel: 'ביטול',
      id: 'מזהה',
      size: 'שטח',
      bedrooms: 'חדרי שינה',
      bathrooms: 'חדרי רחצה',
      yearBuilt: 'שנת בנייה',
      features: 'מאפיינים',
      address: 'כתובת',
      neighborhood: 'שכונה',
      city: 'עיר',
      propertyType: 'סוג נכס',
      residential: 'מגורים',
      commercial: 'מסחרי',
      industrial: 'תעשייתי',
      land: 'קרקע',
      urbanRenewal: 'התחדשות עירונית',
      projectType: 'סוג פרויקט',
      tama38: 'תמ"א 38',
      pinuiBinui: 'פינוי-בינוי',
      urbanRenewalOther: 'התחדשות עירונית אחר',
      projectStatus: 'סטטוס פרויקט',
      completionDate: 'תאריך סיום משוער',
      developer: 'יזם',
      architect: 'אדריכל',
      contractor: 'קבלן מבצע',
      unitsTotal: 'סה"כ יחידות',
      unitsSold: 'יחידות שנמכרו',
      floorPlans: 'תוכניות דירה',
      gallery: 'גלריה',
      documents: 'מסמכים',
      contactInfo: 'פרטי התקשרות',
      salesOffice: 'משרד מכירות',
      salesPhone: 'טלפון מכירות',
      salesEmail: 'אימייל מכירות',
      website: 'אתר אינטרנט',
      amenities: 'מתקנים ותשתיות',
      parking: 'חניה',
      elevator: 'מעלית',
      storage: 'מחסן',
      balcony: 'מרפסת',
      garden: 'גינה',
      accessibility: 'נגישות',
      securitySystem: 'מערכת אבטחה',
      airConditioning: 'מיזוג אוויר',
      heating: 'חימום',
      furnished: 'מרוהט'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  const getStatusBadge = (status) => {
    switch(status) {
      case 'forSale':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.forSale}</span>;
      case 'forRent':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.forRent}</span>;
      case 'sold':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{t.sold}</span>;
      case 'rented':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{t.rented}</span>;
      case 'underConstruction':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t.underConstruction}</span>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'residential':
        return <Home className="text-blue-500" size={20} />;
      case 'commercial':
        return <Building className="text-purple-500" size={20} />;
      case 'industrial':
        return <Building className="text-gray-500" size={20} />;
      case 'land':
        return <Square className="text-green-500" size={20} />;
      default:
        return <Home className="text-gray-500" size={20} />;
    }
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  // Function to handle form submission for new property
  const handleAddProperty = (e) => {
    e.preventDefault();
    
    // Create a new property object
    const newPropertyObj = {
      id: properties.length + 1,
      name: newProperty.name,
      location: newProperty.location,
      price: newProperty.price,
      status: newProperty.status,
      type: newProperty.type,
      size: newProperty.size,
      bedrooms: newProperty.bedrooms,
      bathrooms: newProperty.bathrooms,
      yearBuilt: parseInt(newProperty.yearBuilt),
      description: newProperty.description,
      features: newProperty.features.split(',').map(item => item.trim()),
      neighborhood: newProperty.neighborhood,
      city: newProperty.city,
      urbanRenewal: newProperty.urbanRenewal === 'true',
      projectType: newProperty.urbanRenewal === 'true' ? newProperty.projectType : undefined
    };
    
    // If it's an urban renewal project, add additional fields
    if (newPropertyObj.urbanRenewal) {
      newPropertyObj.projectStatus = '0% מכור';
      newPropertyObj.completionDate = (new Date().getFullYear() + 3).toString();
      newPropertyObj.developer = 'חברת בנייה';
      newPropertyObj.architect = 'משרד אדריכלים';
      newPropertyObj.contractor = 'חברת בנייה';
      newPropertyObj.unitsTotal = 24;
      newPropertyObj.unitsSold = 0;
    }
    
    // Add the new property to the list
    setProperties([...properties, newPropertyObj]);
    
    // Reset form and close modal
    setNewProperty({
      name: '',
      location: '',
      price: '',
      status: 'forSale',
      type: 'residential',
      size: '',
      bedrooms: '',
      bathrooms: '',
      yearBuilt: new Date().getFullYear(),
      description: '',
      features: '',
      neighborhood: '',
      city: '',
      urbanRenewal: 'false',
      projectType: 'tama38'
    });
    setShowAddModal(false);
    
    // Show success message
    alert('נכס נוסף בהצלחה!');
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.properties}</h1>
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
            data-action="add-property"
          >
            <Plus size={18} />
            <span>{t.addProperty}</span>
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.name}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.location}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.price}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.type}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr 
                  key={property.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handlePropertyClick(property)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{property.name}</div>
                    {property.urbanRenewal && (
                      <div className="text-xs mt-1">
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                          {property.projectType === 'tama38' ? t.tama38 : 
                           property.projectType === 'pinuiBinui' ? t.pinuiBinui : t.urbanRenewalOther}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-1" />
                      <span className="text-gray-500">{property.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-medium">{property.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(property.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(property.type)}
                      <span className="ml-2">{t[property.type]}</span>
                    </div>
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
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.propertyDetails}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedProperty(null)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">{selectedProperty.name}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{selectedProperty.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={16} className="mr-2" />
                    <span>{selectedProperty.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Square size={16} className="mr-2" />
                    <span>{selectedProperty.size}</span>
                  </div>
                  {selectedProperty.urbanRenewal && (
                    <div className="flex items-center text-purple-600">
                      <Building size={16} className="mr-2" />
                      <span>{selectedProperty.projectType === 'tama38' ? t.tama38 : 
                             selectedProperty.projectType === 'pinuiBinui' ? t.pinuiBinui : t.urbanRenewalOther}</span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t.description}</h4>
                  <p className="text-gray-600">{selectedProperty.description}</p>
                </div>
              </div>
              
              {/* Property Specifications */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">{t.specifications}</h4>
                <div className="bg-gray-50 p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProperty.type === 'residential' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.bedrooms}:</span>
                        <span>{selectedProperty.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.bathrooms}:</span>
                        <span>{selectedProperty.bathrooms}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.size}:</span>
                    <span>{selectedProperty.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.yearBuilt}:</span>
                    <span>{selectedProperty.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.neighborhood}:</span>
                    <span>{selectedProperty.neighborhood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.city}:</span>
                    <span>{selectedProperty.city}</span>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">{t.features}</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedProperty.features && selectedProperty.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Urban Renewal Project Details */}
              {selectedProperty.urbanRenewal && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">{t.urbanRenewal} - {t.projectDetails}</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.projectType}:</span>
                        <span>{selectedProperty.projectType === 'tama38' ? t.tama38 : 
                               selectedProperty.projectType === 'pinuiBinui' ? t.pinuiBinui : t.urbanRenewalOther}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.projectStatus}:</span>
                        <span>{selectedProperty.projectStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.completionDate}:</span>
                        <span>{selectedProperty.completionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.developer}:</span>
                        <span>{selectedProperty.developer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.architect}:</span>
                        <span>{selectedProperty.architect}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.contractor}:</span>
                        <span>{selectedProperty.contractor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.unitsTotal}:</span>
                        <span>{selectedProperty.unitsTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.unitsSold}:</span>
                        <span>{selectedProperty.unitsSold}</span>
                      </div>
                    </div>
                    
                    {/* Project Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">התקדמות מכירות</span>
                        <span className="text-sm">{Math.round((selectedProperty.unitsSold / selectedProperty.unitsTotal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(selectedProperty.unitsSold / selectedProperty.unitsTotal) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">{t.contactInfo}</h5>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                          <span>{selectedProperty.salesOffice}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone size={16} className="mr-2 flex-shrink-0" />
                          <span>{selectedProperty.salesPhone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail size={16} className="mr-2 flex-shrink-0" />
                          <span>{selectedProperty.salesEmail}</span>
                        </div>
                        {selectedProperty.website && (
                          <div className="flex items-center">
                            <Globe size={16} className="mr-2 flex-shrink-0" />
                            <span>{selectedProperty.website}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setSelectedProperty(null)}
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

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.addProperty}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAddModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddProperty}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                    <input 
                      type="text" 
                      name="name"
                      value={newProperty.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label>
                    <input 
                      type="text" 
                      name="location"
                      value={newProperty.location}
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
                      value={newProperty.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.neighborhood}</label>
                    <input 
                      type="text" 
                      name="neighborhood"
                      value={newProperty.neighborhood}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.price}</label>
                    <input 
                      type="text" 
                      name="price"
                      value={newProperty.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                      placeholder="₪1,000,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.size}</label>
                    <input 
                      type="text" 
                      name="size"
                      value={newProperty.size}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                      placeholder="100 מ״ר"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.status}</label>
                    <select 
                      name="status"
                      value={newProperty.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    >
                      <option value="forSale">{t.forSale}</option>
                      <option value="forRent">{t.forRent}</option>
                      <option value="sold">{t.sold}</option>
                      <option value="rented">{t.rented}</option>
                      <option value="underConstruction">{t.underConstruction}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.type}</label>
                    <select 
                      name="type"
                      value={newProperty.type}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    >
                      <option value="residential">{t.residential}</option>
                      <option value="commercial">{t.commercial}</option>
                      <option value="industrial">{t.industrial}</option>
                      <option value="land">{t.land}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.bedrooms}</label>
                    <input 
                      type="number" 
                      name="bedrooms"
                      value={newProperty.bedrooms}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.bathrooms}</label>
                    <input 
                      type="number" 
                      name="bathrooms"
                      value={newProperty.bathrooms}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.yearBuilt}</label>
                    <input 
                      type="number" 
                      name="yearBuilt"
                      value={newProperty.yearBuilt}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.urbanRenewal}</label>
                    <select 
                      name="urbanRenewal"
                      value={newProperty.urbanRenewal}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="false">לא</option>
                      <option value="true">כן</option>
                    </select>
                  </div>
                  {newProperty.urbanRenewal === 'true' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.projectType}</label>
                      <select 
                        name="projectType"
                        value={newProperty.projectType}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="tama38">{t.tama38}</option>
                        <option value="pinuiBinui">{t.pinuiBinui}</option>
                        <option value="urbanRenewalOther">{t.urbanRenewalOther}</option>
                      </select>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                    <textarea 
                      name="description"
                      value={newProperty.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      rows={3} 
                      required
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.features}</label>
                    <input 
                      type="text" 
                      name="features"
                      value={newProperty.features}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      placeholder="הפרד תכונות בפסיקים" 
                      required
                    />
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

export default Products;