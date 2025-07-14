import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, Star } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'completion',
    title: 'Aula "React Hooks" concluída',
    time: '2 horas atrás',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100'
  },
  {
    id: 2,
    type: 'assignment',
    title: 'Nova tarefa: Projeto Final',
    time: '4 horas atrás',
    icon: AlertCircle,
    color: 'text-orange-600 bg-orange-100'
  },
  {
    id: 3,
    type: 'grade',
    title: 'Nota recebida: 9.2',
    time: '1 dia atrás',
    icon: Star,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 4,
    type: 'course',
    title: 'Novo curso disponível',
    time: '2 dias atrás',
    icon: Clock,
    color: 'text-purple-600 bg-purple-100'
  }
];

const RecentActivity: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Atividade Recente</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;