import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Download, 
  FileText, 
  CheckCircle,
  Lock,
  MessageSquare,
  Share2
} from 'lucide-react';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState('1');

  // Mock course data
  const course = {
    id: '1',
    title: 'React.js Fundamentals',
    description: 'Aprenda os conceitos fundamentais do React.js, desde componentes básicos até hooks avançados. Este curso abrangente foi desenvolvido para levar você do iniciante ao intermediário em React.',
    instructor: 'Maria Silva',
    instructorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
    students: 1243,
    duration: '40h',
    level: 'beginner',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?w=800&h=450&fit=crop',
    progress: 65,
    rating: 4.8,
    category: 'Frontend',
    price: 'Gratuito',
    whatYouWillLearn: [
      'Componentes funcionais e de classe',
      'Hooks (useState, useEffect, useContext)',
      'Gerenciamento de estado',
      'Roteamento com React Router',
      'Consumo de APIs',
      'Boas práticas e padrões'
    ],
    modules: [
      {
        id: '1',
        title: 'Introdução ao React',
        lessons: [
          { id: '1', title: 'O que é React?', duration: '15min', completed: true },
          { id: '2', title: 'Configurando o ambiente', duration: '20min', completed: true },
          { id: '3', title: 'Primeiro componente', duration: '25min', completed: true }
        ]
      },
      {
        id: '2',
        title: 'Componentes e Props',
        lessons: [
          { id: '4', title: 'Criando componentes', duration: '30min', completed: true },
          { id: '5', title: 'Trabalhando com props', duration: '25min', completed: false },
          { id: '6', title: 'Props vs State', duration: '20min', completed: false }
        ]
      },
      {
        id: '3',
        title: 'Hooks Essenciais',
        lessons: [
          { id: '7', title: 'useState Hook', duration: '35min', completed: false },
          { id: '8', title: 'useEffect Hook', duration: '40min', completed: false },
          { id: '9', title: 'useContext Hook', duration: '30min', completed: false }
        ]
      }
    ]
  };

  const currentLesson = course.modules
    .flatMap(module => module.lessons)
    .find(lesson => lesson.id === selectedLesson);

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-blue-100 mb-6">{course.description}</p>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{course.students} alunos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-current" />
                <span>{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-12 h-12 rounded-full border-2 border-white/20"
              />
              <div>
                <p className="font-medium">Instrutor</p>
                <p className="text-blue-100">{course.instructor}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Continuar Assistindo</span>
              </motion.button>
              
              <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-64 lg:h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100 text-sm">Progresso do curso</span>
            <span className="text-white font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-white h-2 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* What You'll Learn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">O que você vai aprender</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Lesson Video */}
          {currentLesson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentLesson.title}
                </h2>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{currentLesson.duration}</span>
                </div>
              </div>
              
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Baixar</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>Materiais</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Dúvidas</span>
                  </button>
                </div>
                
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                  Marcar como concluída
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Modules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conteúdo do curso</h3>
            
            <div className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-500">
                      {module.lessons.length} aulas
                    </p>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson.id)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          selectedLesson === lesson.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {lesson.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                              {selectedLesson === lesson.id ? (
                                <Play className="w-3 h-3 text-blue-500" />
                              ) : (
                                <Lock className="w-3 h-3 text-gray-400" />
                              )}
                            </div>
                          )}
                          <span className={`text-sm ${
                            lesson.completed ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Course Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Progresso</span>
                <span className="font-medium text-gray-900">{course.progress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Aulas concluídas</span>
                <span className="font-medium text-gray-900">3/9</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tempo restante</span>
                <span className="font-medium text-gray-900">28h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Certificado</span>
                <span className="text-green-600 font-medium">Disponível</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;