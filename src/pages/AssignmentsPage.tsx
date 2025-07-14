import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Upload,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Assignment {
  id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  points: number;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  submittedAt?: string;
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Projeto Final React',
    course: 'React.js Fundamentals',
    description: 'Desenvolva uma aplicação completa usando React, incluindo hooks, contexto e consumo de API.',
    dueDate: '2024-02-15',
    points: 100,
    status: 'pending'
  },
  {
    id: '2',
    title: 'API RESTful com Node.js',
    course: 'Node.js & Express',
    description: 'Crie uma API RESTful completa com autenticação, validação e documentação.',
    dueDate: '2024-02-10',
    points: 80,
    status: 'submitted',
    submittedAt: '2024-02-08'
  },
  {
    id: '3',
    title: 'Modelagem de Banco PostgreSQL',
    course: 'PostgreSQL Database Design',
    description: 'Projete e implemente um esquema de banco de dados para um e-commerce.',
    dueDate: '2024-02-20',
    points: 90,
    status: 'graded',
    grade: 87,
    submittedAt: '2024-02-18'
  }
];

const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesFilter = filter === 'all' || assignment.status === filter;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'graded': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return AlertCircle;
      case 'submitted': return Clock;
      case 'graded': return CheckCircle;
      default: return FileText;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'submitted': return 'Enviada';
      case 'graded': return 'Avaliada';
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
          <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'student' && 'Gerencie suas tarefas e entregas'}
            {user?.role === 'teacher' && 'Crie e avalie tarefas dos alunos'}
            {user?.role === 'admin' && 'Supervisione todas as tarefas da plataforma'}
          </p>
        </div>

        {(user?.role === 'teacher' || user?.role === 'admin') && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Tarefa</span>
          </motion.button>
        )}
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['all', 'pending', 'submitted', 'graded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {status === 'all' ? 'Todas' : getStatusText(status)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredAssignments.map((assignment, index) => {
              const StatusIcon = getStatusIcon(assignment.status);
              const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status === 'pending';
              
              return (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-all ${
                    selectedAssignment?.id === assignment.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100'
                  } ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}`}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{assignment.course}</p>
                      <p className="text-gray-700 line-clamp-2">{assignment.description}</p>
                    </div>
                    
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(assignment.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{getStatusText(assignment.status)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Vence em {new Date(assignment.dueDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{assignment.points} pontos</span>
                      </div>
                    </div>

                    {assignment.status === 'graded' && assignment.grade && (
                      <div className="text-sm font-medium">
                        <span className="text-gray-500">Nota: </span>
                        <span className={assignment.grade >= 70 ? 'text-green-600' : 'text-red-600'}>
                          {assignment.grade}/{assignment.points}
                        </span>
                      </div>
                    )}
                  </div>

                  {isOverdue && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm font-medium">
                        ⚠️ Esta tarefa está atrasada
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Assignment Detail Sidebar */}
        <div>
          <AnimatePresence>
            {selectedAssignment ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Detalhes da Tarefa
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{selectedAssignment.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{selectedAssignment.course}</p>
                    <p className="text-gray-700">{selectedAssignment.description}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Data de entrega</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedAssignment.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Pontos</span>
                      <span className="font-medium text-gray-900">{selectedAssignment.points}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className={`px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedAssignment.status)}`}>
                        {getStatusText(selectedAssignment.status)}
                      </span>
                    </div>

                    {selectedAssignment.submittedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Enviado em</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedAssignment.submittedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}

                    {selectedAssignment.grade && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Nota</span>
                        <span className={`font-medium ${selectedAssignment.grade >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedAssignment.grade}/{selectedAssignment.points}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedAssignment.status === 'pending' && (
                    <div className="border-t border-gray-200 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Enviar Tarefa</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Selecione uma tarefa para ver os detalhes
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;