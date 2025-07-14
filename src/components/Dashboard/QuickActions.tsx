import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, MessageSquare, Calendar, Upload, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const QuickActions: React.FC = () => {
  const { user } = useAuth();

  const getActionsForRole = () => {
    if (user?.role === 'student') {
      return [
        { icon: FileText, label: 'Enviar Tarefa', color: 'bg-blue-500', href: '/assignments' },
        { icon: MessageSquare, label: 'Dúvidas', color: 'bg-green-500', href: '/messages' },
        { icon: Calendar, label: 'Agenda', color: 'bg-purple-500', href: '/schedule' },
        { icon: Upload, label: 'Materiais', color: 'bg-orange-500', href: '/library' }
      ];
    } else if (user?.role === 'teacher') {
      return [
        { icon: Plus, label: 'Nova Aula', color: 'bg-blue-500', href: '/courses/new' },
        { icon: FileText, label: 'Criar Tarefa', color: 'bg-green-500', href: '/assignments/new' },
        { icon: Users, label: 'Alunos', color: 'bg-purple-500', href: '/students' },
        { icon: Upload, label: 'Upload Material', color: 'bg-orange-500', href: '/library/upload' }
      ];
    } else {
      return [
        { icon: Plus, label: 'Novo Curso', color: 'bg-blue-500', href: '/courses/new' },
        { icon: Users, label: 'Gerenciar Usuários', color: 'bg-green-500', href: '/users' },
        { icon: FileText, label: 'Relatórios', color: 'bg-purple-500', href: '/reports' },
        { icon: Calendar, label: 'Eventos', color: 'bg-orange-500', href: '/events' }
      ];
    }
  };

  const actions = getActionsForRole();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Calendar Widget */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Próximos Eventos</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Prova de React.js</p>
              <p className="text-xs text-gray-500">Amanhã às 14:00</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Entrega do Projeto</p>
              <p className="text-xs text-gray-500">Sexta-feira às 23:59</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Reunião de Orientação</p>
              <p className="text-xs text-gray-500">Próxima semana</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;