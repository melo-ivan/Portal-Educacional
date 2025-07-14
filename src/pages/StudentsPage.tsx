import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone,
  MoreVertical,
  Edit3,
  Trash2,
  BookOpen,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive' | 'suspended';
  enrolledCourses: number;
  completedCourses: number;
  averageGrade: number;
  lastActivity: string;
  joinedDate: string;
  phone?: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@student.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
    status: 'active',
    enrolledCourses: 5,
    completedCourses: 3,
    averageGrade: 8.7,
    lastActivity: '2024-01-15T14:30:00Z',
    joinedDate: '2023-09-15',
    phone: '+55 11 99999-1111'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos@student.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
    status: 'active',
    enrolledCourses: 3,
    completedCourses: 2,
    averageGrade: 9.1,
    lastActivity: '2024-01-15T16:45:00Z',
    joinedDate: '2023-10-20',
    phone: '+55 11 99999-2222'
  },
  {
    id: '3',
    name: 'Beatriz Costa',
    email: 'beatriz@student.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
    status: 'inactive',
    enrolledCourses: 2,
    completedCourses: 1,
    averageGrade: 7.5,
    lastActivity: '2024-01-10T10:00:00Z',
    joinedDate: '2023-11-05',
    phone: '+55 11 99999-3333'
  }
];

const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const statuses = ['all', 'active', 'inactive', 'suspended'];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'suspended': return 'Suspenso';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatLastActivity = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return `${hours}h atrás`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d atrás`;
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
          <h1 className="text-3xl font-bold text-gray-900">Meus Alunos</h1>
          <p className="text-gray-600 mt-1">Acompanhe o progresso e desempenho dos seus alunos</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Aluno</span>
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
              <p className="text-sm font-medium text-gray-500">Total de Alunos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{mockStudents.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Alunos Ativos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockStudents.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Média Geral</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {(mockStudents.reduce((sum, s) => sum + s.averageGrade, 0) / mockStudents.length).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Cursos Concluídos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockStudents.reduce((sum, s) => sum + s.completedCourses, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
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
                placeholder="Buscar alunos..."
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Aluno</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Cursos</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Média</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Última Atividade</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(student.status)}`}>
                      {getStatusText(student.status)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.completedCourses}/{student.enrolledCourses}
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      student.averageGrade >= 8 ? 'text-green-600' : 
                      student.averageGrade >= 6 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.averageGrade.toFixed(1)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatLastActivity(student.lastActivity)}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
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
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentsPage;