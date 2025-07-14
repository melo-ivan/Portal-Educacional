import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';

const data = [
  { name: 'Jan', progresso: 65, notas: 7.5 },
  { name: 'Fev', progresso: 78, notas: 8.2 },
  { name: 'Mar', progresso: 82, notas: 8.7 },
  { name: 'Abr', progresso: 88, notas: 8.9 },
  { name: 'Mai', progresso: 92, notas: 9.1 },
  { name: 'Jun', progresso: 95, notas: 9.3 }
];

const engagementData = [
  { name: 'Seg', horas: 4.5 },
  { name: 'Ter', horas: 6.2 },
  { name: 'Qua', horas: 5.8 },
  { name: 'Qui', horas: 7.1 },
  { name: 'Sex', horas: 5.5 },
  { name: 'Sáb', horas: 3.2 },
  { name: 'Dom', horas: 2.8 }
];

const ProgressChart: React.FC = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {user?.role === 'student' ? 'Progresso Acadêmico' : 'Métricas de Ensino'}
          </h3>
          <p className="text-sm text-gray-500">Últimos 6 meses</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Progresso</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Notas</span>
          </div>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="progresso" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="notas" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Engagement */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Horas de Estudo Semanal</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <XAxis 
                dataKey="name" 
                stroke="#64748b"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="horas" 
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressChart;