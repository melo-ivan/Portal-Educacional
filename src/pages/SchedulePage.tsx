import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Video,
  MapPin,
  Users
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'class' | 'exam' | 'meeting' | 'deadline';
  date: string;
  time: string;
  duration: string;
  location?: string;
  instructor?: string;
  course?: string;
  description?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Aula: React Hooks Avançados',
    type: 'class',
    date: '2024-01-16',
    time: '14:00',
    duration: '2h',
    location: 'Sala Virtual',
    instructor: 'Maria Silva',
    course: 'React.js Fundamentals',
    description: 'Aprofundamento em hooks customizados e otimização'
  },
  {
    id: '2',
    title: 'Prova: Node.js Básico',
    type: 'exam',
    date: '2024-01-17',
    time: '10:00',
    duration: '1h30',
    location: 'Plataforma Online',
    course: 'Node.js & Express'
  },
  {
    id: '3',
    title: 'Entrega: Projeto Final',
    type: 'deadline',
    date: '2024-01-18',
    time: '23:59',
    duration: '-',
    course: 'React.js Fundamentals'
  },
  {
    id: '4',
    title: 'Reunião de Orientação',
    type: 'meeting',
    date: '2024-01-19',
    time: '16:00',
    duration: '45min',
    location: 'Zoom',
    instructor: 'Carlos Lima'
  }
];

const SchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-500 text-white';
      case 'exam': return 'bg-red-500 text-white';
      case 'meeting': return 'bg-green-500 text-white';
      case 'deadline': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return Video;
      case 'exam': return Clock;
      case 'meeting': return Users;
      case 'deadline': return Calendar;
      default: return Calendar;
    }
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'class': return 'Aula';
      case 'exam': return 'Prova';
      case 'meeting': return 'Reunião';
      case 'deadline': return 'Prazo';
      default: return type;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateStr);
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600 mt-1">Gerencie seus horários e compromissos</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Evento</span>
        </motion.button>
      </motion.div>

      {/* Calendar Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(newDate.getDate() - 7);
                setCurrentDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900">
              {formatDate(currentDate)}
            </h2>
            
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(newDate.getDate() + 7);
                setCurrentDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setSelectedView('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedView === 'week' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setSelectedView('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedView === 'month' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Mês
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const events = getEventsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 min-h-[200px] ${
                  isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-center mb-3">
                  <p className="text-sm font-medium text-gray-500">
                    {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </p>
                  <p className={`text-lg font-bold ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </p>
                </div>

                <div className="space-y-2">
                  {events.map((event) => {
                    const EventIcon = getEventTypeIcon(event.type);
                    
                    return (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-2 rounded-lg cursor-pointer ${getEventTypeColor(event.type)}`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <EventIcon className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            {getEventTypeName(event.type)}
                          </span>
                        </div>
                        <p className="text-xs font-medium truncate">{event.title}</p>
                        <p className="text-xs opacity-90">{event.time}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Próximos Eventos</h3>
        
        <div className="space-y-4">
          {mockEvents.map((event, index) => {
            const EventIcon = getEventTypeIcon(event.type);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                  <EventIcon className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {getEventTypeName(event.type)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {event.course && (
                    <p className="text-sm text-blue-600 font-medium">{event.course}</p>
                  )}
                  
                  {event.instructor && (
                    <p className="text-sm text-gray-600">Instrutor: {event.instructor}</p>
                  )}
                  
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SchedulePage;