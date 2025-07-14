import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Play } from 'lucide-react';
import { Course } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Play className="w-4 h-4 text-white" />
            </div>
          </div>
          {course.progress && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-white text-xs mt-2 font-medium">{course.progress}% concluído</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            course.level === 'beginner' ? 'bg-green-100 text-green-700' :
            course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {course.level}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students} {t('courses.students')}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700">{t('courses.instructor')}: {course.instructor}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;