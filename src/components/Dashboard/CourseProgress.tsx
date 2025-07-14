import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'React.js Avançado',
    progress: 78,
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?w=300&h=200&fit=crop',
    instructor: 'Carlos Silva',
    students: 156,
    nextLesson: 'Hooks Personalizados'
  },
  {
    id: 2,
    title: 'Node.js & Express',
    progress: 45,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=300&h=200&fit=crop',
    instructor: 'Ana Costa',
    students: 203,
    nextLesson: 'APIs RESTful'
  },
  {
    id: 3,
    title: 'PostgreSQL Database',
    progress: 92,
    image: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?w=300&h=200&fit=crop',
    instructor: 'Roberto Lima',
    students: 89,
    nextLesson: 'Performance Tuning'
  }
];

const CourseProgress: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Cursos em Progresso</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Ver todos
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
              <p className="text-sm text-gray-500 mb-2">Próxima aula: {course.nextLesson}</p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{course.students}</span>
                </div>
                <span>•</span>
                <span>{course.instructor}</span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">{course.progress}% concluído</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseProgress;