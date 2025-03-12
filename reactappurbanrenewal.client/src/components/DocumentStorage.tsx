import React, { useState, useEffect } from 'react';
import { Save, FileText, Folder, Download, Trash2, Upload, X } from 'lucide-react';

interface DocumentStorageProps {
  language: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  content: string; // Base64 content
}

const DocumentStorage: React.FC<DocumentStorageProps> = ({ language }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const translations = {
    en: {
      documentStorage: 'Document Storage',
      localDocuments: 'Local Documents',
      upload: 'Upload Document',
      noDocuments: 'No documents stored locally',
      dragAndDrop: 'Drag and drop files here, or click to select files',
      browse: 'Browse',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      download: 'Download',
      name: 'Name',
      type: 'Type',
      size: 'Size',
      modified: 'Modified',
      actions: 'Actions'
    },
    he: {
      documentStorage: 'אחסון מסמכים',
      localDocuments: 'מסמכים מקומיים',
      upload: 'העלאת מסמך',
      noDocuments: 'אין מסמכים מאוחסנים מקומית',
      dragAndDrop: 'גרור ושחרר קבצים כאן, או לחץ לבחירת קבצים',
      browse: 'עיון',
      cancel: 'ביטול',
      save: 'שמירה',
      delete: 'מחיקה',
      download: 'הורדה',
      name: 'שם',
      type: 'סוג',
      size: 'גודל',
      modified: 'שונה',
      actions: 'פעולות'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';
  
  // Load documents from localStorage on component mount
  useEffect(() => {
    const storedDocuments = localStorage.getItem('localDocuments');
    if (storedDocuments) {
      try {
        setDocuments(JSON.parse(storedDocuments));
      } catch (error) {
        console.error('Error parsing stored documents:', error);
      }
    }
  }, []);
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const newDocument: Document = {
          id: Date.now(),
          name: selectedFile.name,
          type: selectedFile.name.split('.').pop() || 'unknown',
          size: formatFileSize(selectedFile.size),
          modified: new Date().toISOString().split('T')[0],
          content: event.target.result as string
        };
        
        const updatedDocuments = [...documents, newDocument];
        setDocuments(updatedDocuments);
        localStorage.setItem('localDocuments', JSON.stringify(updatedDocuments));
        
        setSelectedFile(null);
        setShowUploadModal(false);
      }
    };
    
    reader.readAsDataURL(selectedFile);
  };
  
  // Handle document download
  const handleDownload = (document: Document) => {
    const link = document.createElement('a');
    link.href = document.content;
    link.download = document.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle document delete
  const handleDelete = (id: number) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem('localDocuments', JSON.stringify(updatedDocuments));
  };
  
  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="text-green-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t.documentStorage}</h2>
        <button 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={18} />
          <span>{t.upload}</span>
        </button>
      </div>
      
      {documents.length > 0 ? (
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
              {documents.map((document) => (
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
                      onClick={() => handleDownload(document)}
                    >
                      <Download size={18} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(document.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
          <Save size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">{t.noDocuments}</p>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowUploadModal(true)}
          >
            {t.upload}
          </button>
        </div>
      )}
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.upload}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowUploadModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                <div className="text-center">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">{t.dragAndDrop}</p>
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
                    {t.browse}
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileSelect}
                    />
                  </label>
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md text-left">
                      <div className="flex items-center">
                        {getFileIcon(selectedFile.name.split('.').pop() || '')}
                        <span className="ml-2 font-medium">{selectedFile.name}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {formatFileSize(selectedFile.size)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setShowUploadModal(false)}
                >
                  {t.cancel}
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentStorage;