import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Plus, 
  MapPin, 
  Users, 
  Filter,
  Search,
  Edit3,
  Trash2,
  MoreVertical
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'seminar' | 'conference' | 'webinar' | 'course';
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Workshop: React Performance',
    description: 'Aprenda técnicas avançadas de otimização em aplicações React',
    type: 'workshop',
    date: '2024-02-15',
    time: '14:00',
    duration: '3h',
    location: 'Auditório Principal',
    instructor: 'Maria Silva',
    maxParticipants: 50,
    currentParticipants: 35,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Seminário: Futuro do JavaScript',
    description: 'Discussão sobre as próximas features e tendências do JavaScript',
    type: 'seminar',
    date: '2024-02-20',
    time: '19:00',
    duration: '2h',
    location: 'Online - Zoom',
    instructor: 'João Santos',
    maxParticipants: 100,
    currentParticipants: 78,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Conferência: DevOps 2024',
    description: 'As melhores práticas de DevOps para o ano de 2024',
    type: 'conference',
    date: '2024-02-25',
    time: '09:00',
    duration: '8h',
    location: 'Centro de Convenções',
    instructor: 'Ana Costa',
    maxParticipants: 200,
    currentParticipants: 156,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=400&h=300&fit=crop'
  }
];

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const types = ['all', 'workshop', 'seminar', 'conference', 'webinar', 'course'];
  const statuses = ['all', 'upcoming', 'ongoing', 'completed', 'cancelled'];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'text-blue-600 bg-blue-100';
      case 'seminar': return 'text-green-600 bg-green-100';
      case 'conference': return 'text-purple-600 bg-purple-100';
      case 'webinar': return 'text-orange-600 bg-orange-100';
      case 'course': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ongoing': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'workshop': return 'Workshop';
      case 'seminar': return 'Seminário';
      case 'conference': return 'Conferência';
      case 'webinar': return 'Webinar';
      case 'course': return 'Curso';
      default: return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'ongoing': return 'Em andamento';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600 mt-1">Gerencie workshops, seminários e conferências</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Eventos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{mockEvents.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Próximos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockEvents.filter(e => e.status === 'upcoming').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Participantes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockEvents.reduce((sum, e) => sum + e.currentParticipants, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Taxa de Ocupação</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {Math.round((mockEvents.reduce((sum, e) => sum + e.currentParticipants, 0) / 
                mockEvents.reduce((sum, e) => sum + e.maxParticipants, 0)) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
              showFilters ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Evento
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'Todos os tipos' : getTypeText(type)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'Todos os status' : getStatusText(status)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(event.type)}`}>
                  {getTypeText(event.type)}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{event.currentParticipants}/{event.maxParticipants} participantes</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Instrutor: {event.instructor}</p>
                  <p className="text-gray-500">Duração: {event.duration}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Ocupação</span>
                  <span className="text-xs text-gray-500">
                    {Math.round((event.currentParticipants / event.maxParticipants) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Calendar className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou termos de busca
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default EventsPage;