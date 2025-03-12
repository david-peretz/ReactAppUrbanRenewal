import React, { useState } from 'react';
import { Search, Plus, Download, Trash2, File, FileText, File as FilePdf, FileImage, Folder, Share2, MoreHorizontal, X } from 'lucide-react';

interface DocumentsProps {
  language: string;
}

const Documents: React.FC<DocumentsProps> = ({ language }) => {
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const translations = {
    en: {
      documents: 'Documents',
      search: 'Search documents...',
      upload: 'Upload',
      all: 'All Documents',
      contracts: 'Contracts',
      invoices: 'Invoices',
      proposals: 'Proposals',
      reports: 'Reports',
      name: 'Name',
      type: 'Type',
      size: 'Size',
      modified: 'Modified',
      actions: 'Actions',
      uploadFiles: 'Upload Files',
      dragAndDrop: 'Drag and drop files here, or click to select files',
      browse: 'Browse',
      cancel: 'Cancel',
      uploadNow: 'Upload Now'
    },
    he: {
      documents: 'מסמכים',
      search: 'חיפוש מסמכים...',
      upload: 'העלאה',
      all: 'כל המסמכים',
      contracts: 'חוזים',
      invoices: 'חשבוניות',
      proposals: 'הצעות',
      reports: 'דוחות',
      name: 'שם',
      type: 'סוג',
      size: 'גודל',
      modified: 'שונה',
      actions: 'פעולות',
      uploadFiles: 'העלאת קבצים',
      dragAndDrop: 'גרור ושחרר קבצים כאן, או לחץ לבחירת קבצים',
      browse: 'עיון',
      cancel: 'ביטול',
      uploadNow: 'העלה עכשיו'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  // Sample data
  const documents = [
    { 
      id: 1, 
      name: 'חוזה התקשרות - דוד כהן.pdf', 
      type: 'pdf', 
      size: '2.4 MB', 
      modified: '2023-06-10',
      folder: 'contracts'
    },
    { 
      id: 2, 
      name: 'חשבונית #1234.pdf', 
      type: 'pdf', 
      size: '1.2 MB', 
      modified: '2023-06-08',
      folder: 'invoices'
    },
    { 
      id: 3, 
      name: 'הצעת מחיר - פרויקט שיווק.docx', 
      type: 'docx', 
      size: '3.5 MB', 
      modified: '2023-06-05',
      folder: 'proposals'
    },
    { 
      id: 4, 
      name: 'דוח מכירות חודשי - מאי 2023.xlsx', 
      type: 'xlsx', 
      size: '4.8 MB', 
      modified: '2023-06-01',
      folder: 'reports'
    },
    { 
      id: 5, 
      name: 'לוגו חברה.png', 
      type: 'png', 
      size: '0.8 MB', 
      modified: '2023-05-20',
      folder: 'all'
    },
    { 
      id: 6, 
      name: 'חוזה שכירות משרד.pdf', 
      type: 'pdf', 
      size: '3.1 MB', 
      modified: '2023-05-15',
      folder: 'contracts'
    },
    { 
      id: 7, 
      name: 'חשבונית #1235.pdf', 
      type: 'pdf', 
      size: '1.1 MB', 
      modified: '2023-06-12',
      folder: 'invoices'
    },
  ];

  const filteredDocuments = selectedFolder === 'all' 
    ? documents 
    : documents.filter(doc => doc.folder === selectedFolder);

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <FilePdf className="text-red-500" />;
      case 'docx':
        return <FileText className="text-blue-500" />;
      case 'xlsx':
        return <FileText className="text-green-500" />;
      case 'png':
      case 'jpg':
        return <FileImage className="text-purple-500" />;
      default:
        return <File className="text-gray-500" />;
    }
  };

  // Fixed download function that doesn't use document.createElement
  const handleDownloadDocument = (e, documentId) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real application, this would trigger a download of the actual file
    // For this demo, we'll just show an alert
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      alert(`Downloading ${doc.name}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.documents}</h1>
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
            onClick={() => setShowUploadModal(true)}
          >
            <Plus size={18} />
            <span>{t.upload}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  className={`flex items-center w-full p-2 rounded-md ${
                    selectedFolder === 'all' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFolder('all')}
                >
                  <Folder className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={18} />
                  <span>{t.all}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full p-2 rounded-md ${
                    selectedFolder === 'contracts' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFolder('contracts')}
                >
                  <Folder className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={18} />
                  <span>{t.contracts}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full p-2 rounded-md ${
                    selectedFolder === 'invoices' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFolder('invoices')}
                >
                  <Folder className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={18} />
                  <span>{t.invoices}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full p-2 rounded-md ${
                    selectedFolder === 'proposals' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFolder('proposals')}
                >
                  <Folder className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={18} />
                  <span>{t.proposals}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full p-2 rounded-md ${
                    selectedFolder === 'reports' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFolder('reports')}
                >
                  <Folder className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={18} />
                  <span>{t.reports}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.name}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.type}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.size}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.modified}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getFileIcon(document.type)}
                          <span className="ml-3">{document.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {document.type.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {document.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {document.modified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={(e) => handleDownloadDocument(e, document.id)}
                        >
                          <Download size={18} />
                        </button>
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          <Share2 size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 mr-3">
                          <Trash2 size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.uploadFiles}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowUploadModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                <div className="text-center">
                  <Plus size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">{t.dragAndDrop}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                    {t.browse}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setShowUploadModal(false)}
                >
                  {t.cancel}
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  {t.uploadNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;