import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, User, MapPin, X } from 'lucide-react';

interface CalendarProps {
  language: string;
}

const Calendar: React.FC<CalendarProps> = ({ language }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  
  const translations = {
    en: {
      calendar: 'Calendar',
      addEvent: 'Add Event',
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      eventTitle: 'Event Title',
      date: 'Date',
      startTime: 'Start Time',
      endTime: 'End Time',
      location: 'Location',
      description: 'Description',
      participants: 'Participants',
      save: 'Save',
      cancel: 'Cancel',
      noEvents: 'No events for this day'
    },
    he: {
      calendar: 'יומן',
      addEvent: 'הוסף אירוע',
      today: 'היום',
      month: 'חודש',
      week: 'שבוע',
      day: 'יום',
      sun: 'א',
      mon: 'ב',
      tue: 'ג',
      wed: 'ד',
      thu: 'ה',
      fri: 'ו',
      sat: 'ש',
      eventTitle: 'כותרת האירוע',
      date: 'תאריך',
      startTime: 'שעת התחלה',
      endTime: 'שעת סיום',
      location: 'מיקום',
      description: 'תיאור',
      participants: 'משתתפים',
      save: 'שמור',
      cancel: 'ביטול',
      noEvents: 'אין אירועים ליום זה'
    }
  };

  const t = translations[language];
  const isRTL = language === 'he';

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'פגישה עם דוד כהן',
      date: new Date(2023, 5, 15),
      startTime: '09:00',
      endTime: '10:00',
      location: 'משרד ראשי, תל אביב',
      participants: ['דוד כהן', 'מיכל לוי'],
      color: 'blue'
    },
    {
      id: 2,
      title: 'שיחת ועידה עם צוות פיתוח',
      date: new Date(2023, 5, 15),
      startTime: '14:00',
      endTime: '15:30',
      location: 'חדר ישיבות 2',
      participants: ['יוסי אברהם', 'רונית שמעוני', 'אבי גולן'],
      color: 'green'
    },
    {
      id: 3,
      title: 'הצגת מוצר חדש',
      date: new Date(2023, 5, 18),
      startTime: '11:00',
      endTime: '12:30',
      location: 'אולם הרצאות, קומה 3',
      participants: ['מיכל לוי', 'דוד כהן', 'יוסי אברהם'],
      color: 'purple'
    },
    {
      id: 4,
      title: 'פגישת סיכום חודשית',
      date: new Date(2023, 5, 30),
      startTime: '16:00',
      endTime: '17:00',
      location: 'חדר ישיבות ראשי',
      participants: ['כל הצוות'],
      color: 'red'
    }
  ];

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();
      
      // Get events for this day
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === currentMonth.getMonth() && 
        event.date.getFullYear() === currentMonth.getFullYear()
      );
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 overflow-hidden ${isToday ? 'bg-blue-50' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`flex justify-between items-center ${isSelected ? 'bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
            <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>{day}</span>
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className={`text-xs p-1 rounded truncate bg-${event.color}-100 text-${event.color}-800`}
              >
                {event.startTime} {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const renderSelectedDateEvents = () => {
    const dayEvents = events.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() && 
      event.date.getFullYear() === selectedDate.getFullYear()
    );
    
    if (dayEvents.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          {t.noEvents}
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {dayEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <h3 className="font-medium text-lg">{event.title}</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2" />
                <span>{event.startTime} - {event.endTime}</span>
              </div>
              {event.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.participants && event.participants.length > 0 && (
                <div className="flex items-center text-gray-600">
                  <User size={16} className="mr-2" />
                  <span>{event.participants.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const monthName = currentMonth.toLocaleString(language === 'he' ? 'he-IL' : 'en-US', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.calendar}</h1>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowAddEventModal(true)}
          >
            <Plus size={18} />
            <span>{t.addEvent}</span>
          </button>
          <button 
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md"
            onClick={goToToday}
          >
            {t.today}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={prevMonth}
            >
              {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <h2 className="text-xl font-semibold mx-4">
              {isRTL ? `${year} ${monthName}` : `${monthName} ${year}`}
            </h2>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={nextMonth}
            >
              {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">{t.month}</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">{t.week}</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">{t.day}</button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-0">
          <div className="h-10 flex items-center justify-center bg-gray-50 border-b border-r font-medium text-gray-500">{t.sun}</div>
          <div className="h-10 flex items-center justify-center bg-gray-50 border-b border-r font-medium text-gray-500">{t.mon}</div>
          <div className="h-10 flex items-center justify-center bg-gray-50 border-b border-r font-medium text-gray-500">{t.tue}</div>
          <div className="h-10 flex items-center justify-center bg-gray-50 border-b border-r font-medium text-gray-500">{t.wed}</div>
          <div className="h-10 flex items-center justify-center bg-gray-50 border-b border-r font-medium text-gray-500">{t.thu}</div>
          <div className="h-10 flex items-center justify-center bg-gray-50 border-b border-r font-medium text-gray-500">{t.fri}</div>
          <div className="h-10 flex items-center justify-center bg-gray-50 border-b font-medium text-gray-500">{t.sat}</div>
          
          {renderCalendarDays()}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          {selectedDate.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h2>
        
        {renderSelectedDateEvents()}
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.addEvent}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAddEventModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventTitle}</label>
                    <input type="text" className="w-full p-2 border rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.date}</label>
                    <input type="date" className="w-full p-2 border rounded-md" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.startTime}</label>
                      <input type="time" className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.endTime}</label>
                      <input type="time" className="w-full p-2 border rounded-md" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.location}</label>
                    <input type="text" className="w-full p-2 border rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.participants}</label>
                    <input type="text" className="w-full p-2 border rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
                    <textarea className="w-full p-2 border rounded-md" rows={3}></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                    onClick={() => setShowAddEventModal(false)}
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

export default Calendar;