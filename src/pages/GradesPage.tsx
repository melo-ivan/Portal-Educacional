import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Award, FileText, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const gradesData = [
  { month: 'Jan', nota: 8.2 },
  { month: 'Fev', nota: 8.7 },
  { month: 'Mar', nota: 8.9 },
  { month: 'Abr', nota: 9.1 },
  { month: 'Mai', nota: 8.8 },
  { month: 'Jun', nota: 9.3 }
];

const courseGrades = [
  { course: 'React.js', grade: 9.2, maxGrade: 10, color: '#3b82f6' },
  { course: 'Node.js', grade: 8.7, maxGrade: 10, color: '#10b981' },
  { course: 'PostgreSQL', grade: 9.0, maxGrade: 10, color: '#8b5cf6' },
  { course: 'TypeScript', grade: 8.5, maxGrade: 10, color: '#f59e0b' }
];

const recentGrades = [
  {
    id: 1,
    assignment: 'Projeto Final React',
    course: 'React.js Fundamentals',
    grade: 95,
    maxGrade: 100,
    date: '2024-01-15',
    feedback: 'Excelente trabalho! Código bem estruturado e componentes bem organizados.'
  },
  {
    id: 2,
    assignment: 'API RESTful',
    course: 'Node.js & Express',
    grade: 87,
    maxGrade: 100,
    date: '2024-01-10',
    feedback: 'Boa implementação. Poderia melhorar a documentação da API.'
  },
  {
    id: 3,
    assignment: 'Modelagem DB',
    course: 'PostgreSQL Database',
    grade: 92,
    maxGrade: 100,
    date: '2024-01-05',
    feedback: 'Esquema bem planejado. Bom uso de índices e relacionamentos.'
  }
];

const GradesPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  const overallAverage = gradesData.reduce((sum, grade) => sum + grade.nota, 0) / gradesData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notas e Desempenho</h1>
          <p className="text-gray-600 mt-1">Acompanhe seu progresso acadêmico</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Boletim</span>
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
              <p className="text-sm font-medium text-gray-500">Média Geral</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overallAverage.toFixed(1)}</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.3 este mês
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Posição na Turma</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">3º</p>
              <p className="text-sm text-gray-600 mt-2">de 45 alunos</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Tarefas Entregues</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
              <p className="text-sm text-green-600 mt-2">100% no prazo</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-500">Melhor Nota</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">9.5</p>
              <p className="text-sm text-gray-600 mt-2">Projeto React</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Evolução das Notas</h3>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semester">Semestre</option>
              <option value="year">Ano</option>
            </select>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gradesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  domain={[0, 10]}
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
                  dataKey="nota" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Course Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Desempenho por Curso</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseGrades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="course" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  domain={[0, 10]}
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
                  dataKey="grade" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Grades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notas Recentes</h3>
        
        <div className="space-y-4">
          {recentGrades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{grade.assignment}</h4>
                  <p className="text-sm text-gray-600">{grade.course}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(grade.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    grade.grade >= 80 ? 'text-green-600' : 
                    grade.grade >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {grade.grade}
                  </div>
                  <div className="text-sm text-gray-500">
                    /{grade.maxGrade}
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      grade.grade >= 80 ? 'bg-green-500' : 
                      grade.grade >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(grade.grade / grade.maxGrade) * 100}%` }}
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                <strong>Feedback:</strong> {grade.feedback}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GradesPage;