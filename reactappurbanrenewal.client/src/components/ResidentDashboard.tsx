import React from 'react';
import { Building, FileText, Calendar, Users, Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ResidentDashboardProps {
  language: string;
}

const ResidentDashboard: React.FC<ResidentDashboardProps> = ({ language }) => {
  const translations = {
    en: {
      myProjects: 'My Projects',
      projectUpdates: 'Project Updates',
      upcomingMeetings: 'Upcoming Meetings',
      committeeMembers: 'Committee Members',
      projectDocuments: 'Project Documents',
      votingAndPolls: 'Voting & Polls',
      projectStatus: 'Project Status',
      viewAll: 'View All',
      projectName: 'Project Name',
      address: 'Address',
      status: 'Status',
      lastUpdate: 'Last Update',
      planning: 'Planning',
      approval: 'Approval',
      construction: 'Construction',
      completed: 'Completed',
      time: 'Time',
      date: 'Date',
      subject: 'Subject',
      location: 'Location',
      name: 'Name',
      role: 'Role',
      contact: 'Contact',
      documentName: 'Document Name',
      type: 'Type',
      uploadDate: 'Upload Date',
      question: 'Question',
      deadline: 'Deadline',
      voted: 'Voted',
      notVoted: 'Not Voted'
    },
    he: {
      myProjects: 'הפרויקטים שלי',
      projectUpdates: 'עדכוני פרויקט',
      upcomingMeetings: 'פגישות קרובות',
      committeeMembers: 'חברי ועד',
      projectDocuments: 'מסמכי פרויקט',
      votingAndPolls: 'הצבעות וסקרים',
      projectStatus: 'סטטוס פרויקט',
      viewAll: 'צפה בהכל',
      projectName: 'שם הפרויקט',
      address: 'כתובת',
      status: 'סטטוס',
      lastUpdate: 'עדכון אחרון',
      planning: 'תכנון',
      approval: 'אישור',
      construction: 'בנייה',
      completed: 'הושלם',
      time: 'שעה',
      date: 'תאריך',
      subject: 'נושא',
      location: 'מיקום',
      name: 'שם',
      role: 'תפקיד',
      contact: 'יצירת קשר',
      documentName: 'שם המסמך',
      type: 'סוג',
      uploadDate: 'תאריך העלאה',
      question: 'שאלה',
      deadline: 'תאריך אחרון',
      voted: 'הצביע',
      notVoted: 'לא הצביע'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  // Sample data
  const projects = [
    {
      id: 1,
      name: 'פינוי-בינוי רחוב הרצל',
      address: 'רחוב הרצל 15-25, תל אביב',
      status: 'approval',
      lastUpdate: '2023-06-15'
    },
    {
      id: 2,
      name: 'תמ"א 38 בניין מגורים',
      address: 'רחוב ויצמן 42, רמת גן',
      status: 'planning',
      lastUpdate: '2023-06-10'
    }
  ];

  const updates = [
    {
      id: 1,
      projectId: 1,
      title: 'הוגשה בקשה להיתר בנייה',
      date: '2023-06-15',
      content: 'הוגשה בקשה להיתר בנייה לוועדה המקומית. צפי לקבלת תשובה: 60 יום.'
    },
    {
      id: 2,
      projectId: 1,
      title: 'עדכון תוכניות אדריכליות',
      date: '2023-06-10',
      content: 'עודכנו התוכניות האדריכליות בהתאם להערות הדיירים מהפגישה האחרונה.'
    },
    {
      id: 3,
      projectId: 2,
      title: 'פגישה עם היזם',
      date: '2023-06-08',
      content: 'התקיימה פגישה עם היזם לדיון בלוחות זמנים ובשינויים בתוכנית.'
    }
  ];

  const meetings = [
    {
      id: 1,
      projectId: 1,
      date: '2023-06-20',
      time: '18:00',
      subject: 'הצגת תוכניות מעודכנות',
      location: 'מתנ"ס שכונתי, רחוב הרצל 30'
    },
    {
      id: 2,
      projectId: 1,
      date: '2023-06-25',
      time: '19:30',
      subject: 'פגישה עם עורך הדין של הפרויקט',
      location: 'זום (קישור יישלח במייל)'
    },
    {
      id: 3,
      projectId: 2,
      date: '2023-06-22',
      time: '20:00',
      subject: 'הצבעה על הצעת היזם',
      location: 'חדר ישיבות, בניין העירייה'
    }
  ];

  const committeeMembers = [
    {
      id: 1,
      projectId: 1,
      name: 'ישראל ישראלי',
      role: 'יו"ר ועד',
      contact: '050-1234567'
    },
    {
      id: 2,
      projectId: 1,
      name: 'חיים כהן',
      role: 'גזבר',
      contact: '052-7654321'
    },
    {
      id: 3,
      projectId: 1,
      name: 'שרה לוי',
      role: 'חברת ועד',
      contact: '054-9876543'
    }
  ];

  const documents = [
    {
      id: 1,
      projectId: 1,
      name: 'הסכם התקשרות עם היזם',
      type: 'PDF',
      uploadDate: '2023-05-15'
    },
    {
      id: 2,
      projectId: 1,
      name: 'תוכניות אדריכליות - גרסה 3',
      type: 'PDF',
      uploadDate: '2023-06-10'
    },
    {
      id: 3,
      projectId: 1,
      name: 'פרוטוקול אסיפת דיירים 05/2023',
      type: 'DOCX',
      uploadDate: '2023-05-25'
    },
    {
      id: 4,
      projectId: 2,
      name: 'הצעת היזם - סופי',
      type: 'PDF',
      uploadDate: '2023-06-05'
    }
  ];

  const polls = [
    {
      id: 1,
      projectId: 1,
      question: 'האם לאשר את התוכנית האדריכלית המוצעת?',
      deadline: '2023-06-30',
      voted: 65,
      total: 120
    },
    {
      id: 2,
      projectId: 1,
      question: 'בחירת חיפוי חיצוני לבניין',
      deadline: '2023-07-15',
      voted: 42,
      total: 120
    },
    {
      id: 3,
      projectId: 2,
      question: 'אישור הצעת היזם',
      deadline: '2023-06-25',
      voted: 28,
      total: 50
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'planning':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.planning}</span>;
      case 'approval':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t.approval}</span>;
      case 'construction':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">{t.construction}</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.completed}</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t.myProjects}</h1>
      
      {/* Projects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              {getStatusBadge(project.status)}
            </div>
            <div className="text-gray-600 mb-2">
              <div className="flex items-center">
                <Building size={16} className="mr-2" />
                <span>{project.address}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {t.lastUpdate}: {project.lastUpdate}
            </div>
          </div>
        ))}
      </div>
      
      {/* Project Status */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t.projectStatus}</h2>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="w-1/4 text-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mx-auto mb-2">
                <CheckCircle size={20} />
              </div>
              <span className="text-sm">{t.planning}</span>
            </div>
            <div className="w-1/4 text-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white mx-auto mb-2">
                <Clock size={20} />
              </div>
              <span className="text-sm">{t.approval}</span>
            </div>
            <div className="w-1/4 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white mx-auto mb-2">
                <Building size={20} />
              </div>
              <span className="text-sm">{t.construction}</span>
            </div>
            <div className="w-1/4 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white mx-auto mb-2">
                <CheckCircle size={20} />
              </div>
              <span className="text-sm">{t.completed}</span>
            </div>
          </div>
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0">
            <div className="h-full bg-blue-500" style={{ width: '37.5%' }}></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Updates */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t.projectUpdates}</h2>
            <a href="#" className="text-blue-600 text-sm">{t.viewAll}</a>
          </div>
          <div className="space-y-4">
            {updates.slice(0, 3).map(update => (
              <div key={update.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{update.title}</h3>
                  <span className="text-sm text-gray-500">{update.date}</span>
                </div>
                <p className="text-sm text-gray-600">{update.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Meetings */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t.upcomingMeetings}</h2>
            <a href="#" className="text-blue-600 text-sm">{t.viewAll}</a>
          </div>
          <div className="space-y-4">
            {meetings.map(meeting => (
              <div key={meeting.id} className="flex items-center p-3 border rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{meeting.subject}</p>
                  <p className="text-sm text-gray-500">{meeting.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{meeting.time}</p>
                  <p className="text-sm text-gray-500">{meeting.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Committee Members */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t.committeeMembers}</h2>
          </div>
          <div className="space-y-3">
            {committeeMembers.map(member => (
              <div key={member.id} className="flex items-center p-3 border rounded-lg">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Users className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <div className="text-right">
                  <a href={`tel:${member.contact}`} className="text-blue-600">{member.contact}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Project Documents */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t.projectDocuments}</h2>
            <a href="#" className="text-blue-600 text-sm">{t.viewAll}</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">{t.documentName}</th>
                  <th className="text-center py-2">{t.type}</th>
                  <th className="text-right py-2">{t.uploadDate}</th>
                </tr>
              </thead>
              <tbody>
                {documents.slice(0, 4).map(doc => (
                  <tr key={doc.id} className="border-b">
                    <td className="py-2">
                      <div className="flex items-center">
                        <FileText size={16} className="text-gray-400 mr-2" />
                        <span>{doc.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-2">{doc.type}</td>
                    <td className="text-right py-2">{doc.uploadDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Voting & Polls */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t.votingAndPolls}</h2>
          <a href="#" className="text-blue-600 text-sm">{t.viewAll}</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {polls.map(poll => (
            <div key={poll.id} className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">{poll.question}</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{t.deadline}: {poll.deadline}</span>
                <span>{poll.voted}/{poll.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(poll.voted / poll.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-end">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                  {poll.voted === poll.total ? t.voted : t.notVoted}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;