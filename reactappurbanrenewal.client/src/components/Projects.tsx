import React, { useState, useEffect } from 'react';
import { projectsApi } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import { Search, Plus, Edit, Trash2, Filter, Download, Clock, CheckCircle, AlertCircle, Calendar, User, BarChart3, X, MapPin, Home } from 'lucide-react';

interface ProjectsProps {
  language: string;
}

interface Project {
  id: number;
  name: string;
  location: string;
  deadline: string;
  status: string;
  progress: number;
  description: string;
  startDate: string;
  manager: string;
  team: string[];
  tasks: {
    id: number;
    name: string;
    assignedTo: string;
    dueDate: string;
    completed: boolean;
  }[];
  budget: string;
  projectType: string;
  units: number;
  approvalStatus: string;
  constructionStatus: string;
  salesStatus: string;
}

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form state for new project
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    projectType: 'tama38',
    units: 0,
    startDate: '',
    deadline: '',
    status: 'pending',
    budget: '',
    description: ''
  });
  
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const { user: _user } = useAuth();

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Get projects from API without token (using cookies for auth)
        const fetchedProjects = await projectsApi.getAll();
        
        if (fetchedProjects && fetchedProjects.length > 0) {
          // Transform API data to match our component's expected format
          const transformedProjects = fetchedProjects.map(project => ({
            id: project.id,
            name: project.name,
            location: project.location,
            deadline: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : 'N/A',
            status: project.status ? project.status.toLowerCase() : 'pending',
            progress: getProgressByStatus(project.status),
            description: project.description || '',
            startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : 'N/A',
            manager: "דוד כהן", // Default manager
            team: ['מיכל לוי', 'יוסי אברהם'], // Default team members
            tasks: [], // API doesn't provide tasks yet
            budget: `₪${project.budget?.toLocaleString() || '0'}`,
            projectType: getProjectType(project.name),
            units: project.totalUnits || 0,
            approvalStatus: 'בתהליך אישור',
            constructionStatus: project.status === 'InProgress' ? 'בשלבי בנייה' : 'טרם החל',
            salesStatus: getDefaultSalesStatus(project.status)
          }));
          
          setProjectsList(transformedProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper functions for transforming data
  const getProgressByStatus = (status: string): number => {
    switch(status) {
      case 'Completed': return 100;
      case 'InProgress': return 50;
      case 'Delayed': return 25;
      case 'Planning': 
      case 'Pending': 
      default: return 10;
    }
  };

  const getProjectType = (name: string): string => {
    if (name.includes('תמ"א')) return 'tama38';
    if (name.includes('פינוי-בינוי')) return 'pinuiBinui';
    return 'urbanRenewalOther';
  };

  const getDefaultSalesStatus = (status: string): string => {
    switch(status) {
      case 'Completed': return '100% נמכר';
      case 'InProgress': return '50% נמכר';
      default: return 'טרם החל';
    }
  };
  
  const translations = {
    en: {
      projects: 'Urban Renewal Projects',
      search: 'Search projects...',
      addProject: 'Add Project',
      filter: 'Filter',
      export: 'Export',
      name: 'Name',
      location: 'Location',
      deadline: 'Deadline',
      status: 'Status',
      progress: 'Progress',
      actions: 'Actions',
      completed: 'Completed',
      inProgress: 'In Progress',
      pending: 'Pending',
      delayed: 'Delayed',
      edit: 'Edit',
      delete: 'Delete',
      projectDetails: 'Project Details',
      description: 'Description',
      team: 'Team',
      tasks: 'Tasks',
      budget: 'Budget',
      save: 'Save',
      cancel: 'Cancel',
      startDate: 'Start Date',
      endDate: 'End Date',
      manager: 'Project Manager',
      taskName: 'Task Name',
      assignedTo: 'Assigned To',
      dueDate: 'Due Date',
      complete: 'Complete',
      incomplete: 'Incomplete',
      projectType: 'Project Type',
      tama38: 'TAMA 38',
      pinuiBinui: 'Pinui-Binui',
      urbanRenewalOther: 'Other Urban Renewal',
      units: 'Units',
      approvalStatus: 'Approval Status',
      constructionStatus: 'Construction Status',
      salesStatus: 'Sales Status'
    },
    he: {
      projects: 'פרויקטי התחדשות עירונית',
      search: 'חיפוש פרויקטים...',
      addProject: 'הוספת פרויקט',
      filter: 'סינון',
      export: 'ייצוא',
      name: 'שם',
      location: 'מיקום',
      deadline: 'תאריך יעד',
      status: 'סטטוס',
      progress: 'התקדמות',
      actions: 'פעולות',
      completed: 'הושלם',
      inProgress: 'בתהליך',
      pending: 'ממתין',
      delayed: 'באיחור',
      edit: 'עריכה',
      delete: 'מחיקה',
      projectDetails: 'פרטי פרויקט',
      description: 'תיאור',
      team: 'צוות',
      tasks: 'משימות',
      budget: 'תקציב',
      save: 'שמירה',
      cancel: 'ביטול',
      startDate: 'תאריך התחלה',
      endDate: 'תאריך סיום',
      manager: 'מנהל פרויקט',
      taskName: 'שם המשימה',
      assignedTo: 'הוקצה ל',
      dueDate: 'תאריך יעד',
      complete: 'הושלם',
      incomplete: 'לא הושלם',
      projectType: 'סוג פרויקט',
      tama38: 'תמ"א 38',
      pinuiBinui: 'פינוי-בינוי',
      urbanRenewalOther: 'התחדשות עירונית אחר',
      units: 'יחידות דיור',
      approvalStatus: 'סטטוס אישורים',
      constructionStatus: 'סטטוס בנייה',
      salesStatus: 'סטטוס מכירות'
    }
  };

  const t = translations[language as keyof typeof translations];
  const _isRTL = language === 'he';

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.completed}</span>;
      case 'inProgress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.inProgress}</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t.pending}</span>;
      case 'delayed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">{t.delayed}</span>;
      default:
        return null;
    }
  };

  const getProjectTypeBadge = (type: string) => {
    switch(type) {
      case 'tama38':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">{t.tama38}</span>;
      case 'pinuiBinui':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.pinuiBinui}</span>;
      case 'urbanRenewalOther':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.urbanRenewalOther}</span>;
      default:
        return null;
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  // Function to handle form submission for new project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new project object
    const newProjectObj = {
      id: projectsList.length + 1,
      name: newProject.name,
      location: newProject.location,
      deadline: newProject.deadline,
      status: newProject.status,
      progress: newProject.status === 'completed' ? 100 : 
               newProject.status === 'inProgress' ? 50 : 
               newProject.status === 'pending' ? 10 : 25,
      description: newProject.description,
      startDate: newProject.startDate,
      manager: 'דוד כהן', // Default manager
      team: ['מיכל לוי', 'יוסי אברהם'], // Default team
      tasks: [
        { id: 1, name: 'הכנת תוכנית ראשונית', assignedTo: 'דוד כהן', dueDate: newProject.startDate, completed: false }
      ],
      budget: newProject.budget,
      projectType: newProject.projectType,
      units: parseInt(newProject.units.toString()),
      approvalStatus: 'טרם הוגש',
      constructionStatus: 'טרם החל',
      salesStatus: 'טרם החל'
    };
    
    // Add the new project to the list
    setProjectsList([...projectsList, newProjectObj]);
    
    // Reset form and close modal
    setNewProject({
      name: '',
      location: '',
      projectType: 'tama38',
      units: 0,
      startDate: '',
      deadline: '',
      status: 'pending',
      budget: '',
      description: ''
    });
    setShowAddModal(false);
    
    // Show success message
    alert('פרויקט נוסף בהצלחה!');
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.projects}</h1>
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
            data-action="add-project"
          >
            <Plus size={18} />
            <span>{t.addProject}</span>
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
                  {t.deadline}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.progress}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectsList.map((project) => (
                <tr 
                  key={project.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{project.name}</div>
                    <div className="mt-1">{getProjectTypeBadge(project.projectType)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{project.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{project.deadline}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(project.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          project.status === 'completed' ? 'bg-green-500' :
                          project.status === 'inProgress' ? 'bg-blue-500' :
                          project.status === 'pending' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={(e: React.MouseEvent) => {
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

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.projectDetails}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">{selectedProject.name}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>{selectedProject.deadline}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>{selectedProject.startDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BarChart3 size={16} className="mr-2" />
                    <span>{selectedProject.budget}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home size={16} className="mr-2" />
                    <span>{selectedProject.units} יח"ד</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t.description}</h4>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h5 className="font-medium text-blue-700 mb-2">{t.approvalStatus}</h5>
                    <p className="text-blue-600">{selectedProject.approvalStatus}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <h5 className="font-medium text-green-700 mb-2">{t.constructionStatus}</h5>
                    <p className="text-green-600">{selectedProject.constructionStatus}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-md">
                    <h5 className="font-medium text-purple-700 mb-2">{t.salesStatus}</h5>
                    <p className="text-purple-600">{selectedProject.salesStatus}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">{t.team}</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-3">
                    <User size={16} className="mr-2 text-blue-600" />
                    <span className="font-medium">{selectedProject.manager}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2">{t.manager}</span>
                  </div>
                  <div className="space-y-2">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="flex items-center">
                        <User size={16} className="mr-2 text-gray-500" />
                        <span>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">{t.tasks}</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">{t.taskName}</th>
                        <th className="text-left py-2">{t.assignedTo}</th>
                        <th className="text-left py-2">{t.dueDate}</th>
                        <th className="text-left py-2">{t.status}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.tasks.map((task) => (
                        <tr key={task.id} className="border-b">
                          <td className="py-2">{task.name}</td>
                          <td className="py-2">{task.assignedTo}</td>
                          <td className="py-2">{task.dueDate}</td>
                          <td className="py-2">
                            {task.completed ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle size={16} className="mr-1" />
                                {t.complete}
                              </span>
                            ) : (
                              <span className="flex items-center text-yellow-600">
                                <AlertCircle size={16} className="mr-1" />
                                {t.incomplete}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setSelectedProject(null)}
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

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.addProject}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAddModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddProject}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                    <input 
                      type="text" 
                      name="name"
                      value={newProject.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.location}</label>
                    <input 
                      type="text" 
                      name="location"
                      value={newProject.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.projectType}</label>
                    <select 
                      name="projectType"
                      value={newProject.projectType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    >
                      <option value="tama38">{t.tama38}</option>
                      <option value="pinuiBinui">{t.pinuiBinui}</option>
                      <option value="urbanRenewalOther">{t.urbanRenewalOther}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.units}</label>
                    <input 
                      type="number" 
                      name="units"
                      value={newProject.units}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.startDate}</label>
                    <input 
                      type="date" 
                      name="startDate"
                      value={newProject.startDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.deadline}</label>
                    <input 
                      type="date" 
                      name="deadline"
                      value={newProject.deadline}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.status}</label>
                    <select 
                      name="status"
                      value={newProject.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required
                    >
                      <option value="pending">{t.pending}</option>
                      <option value="inProgress">{t.inProgress}</option>
                      <option value="completed">{t.completed}</option>
                      <option value="delayed">{t.delayed}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.budget}</label>
                    <input 
                      type="text" 
                      name="budget"
                      value={newProject.budget}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      required 
                      placeholder="₪1,000,000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                    <textarea 
                      name="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md" 
                      rows={3} 
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
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

export default Projects;
