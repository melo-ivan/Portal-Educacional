import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for charts
  const enrollmentData = [
    { month: 'Jan', students: 45, teachers: 3 },
    { month: 'Fev', students: 52, teachers: 4 },
    { month: 'Mar', students: 48, teachers: 2 },
    { month: 'Abr', students: 61, teachers: 5 },
    { month: 'Mai', students: 55, teachers: 3 },
    { month: 'Jun', students: 67, teachers: 4 }
  ];

  const coursePopularityData = [
    { name: 'React.js', students: 1243, color: '#3b82f6' },
    { name: 'Node.js', students: 987, color: '#10b981' },
    { name: 'PostgreSQL', students: 765, color: '#8b5cf6' },
    { name: 'TypeScript', students: 892, color: '#f59e0b' },
    { name: 'DevOps', students: 543, color: '#ef4444' }
  ];

  const performanceData = [
    { course: 'React.js', completion: 78, satisfaction: 4.8 },
    { course: 'Node.js', completion: 82, satisfaction: 4.6 },
    { course: 'PostgreSQL', completion: 85, satisfaction: 4.7 },
    { course: 'TypeScript', completion: 79, satisfaction: 4.9 },
    { course: 'DevOps', completion: 73, satisfaction: 4.5 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
          <p className="text-gray-600 mt-1">Dashboard completo de métricas e indicadores</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Semana</option>
            <option value="month">Mês</option>
            <option value="quarter">Trimestre</option>
            <option value="year">Ano</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Usuários</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">2,847</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% este mês
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Cursos Ativos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">124</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8 novos este mês
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Taxa de Conclusão</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">79%</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3% este mês
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Satisfação Média</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">4.7</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.2 este mês
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tendência de Matrículas</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Estudantes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Professores</span>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
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
                  dataKey="students" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="teachers" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Course Popularity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Popularidade dos Cursos</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coursePopularityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="students"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {coursePopularityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Performance Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance dos Cursos</h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="course" 
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
              <Bar 
                dataKey="completion" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Taxa de Conclusão (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Detailed Statistics Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Estatísticas Detalhadas</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Curso</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Estudantes</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Taxa de Conclusão</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Satisfação</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Receita</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {performanceData.map((course, index) => (
                <motion.tr
                  key={course.course}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{course.course}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {coursePopularityData.find(c => c.name === course.course)?.students || 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${course.completion}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{course.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < Math.floor(course.satisfaction) ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{course.satisfaction}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    R$ {(Math.random() * 50000 + 10000).toLocaleString('pt-BR')}
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

export default ReportsPage;