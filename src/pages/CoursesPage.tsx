import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3X3, List, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/Courses/CourseCard';
import { Course } from '../types';

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React.js Fundamentals',
    description: 'Aprenda os conceitos fundamentais do React.js, desde componentes básicos até hooks avançados.',
    instructor: 'Maria Silva',
    students: 1243,
    duration: '40h',
    level: 'beginner',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?w=400&h=300&fit=crop',
    progress: 65,
    rating: 4.8,
    category: 'Frontend'
  },
  {
    id: '2',
    title: 'Node.js & Express',
    description: 'Construa APIs robustas e escaláveis usando Node.js, Express e as melhores práticas.',
    instructor: 'João Santos',
    students: 987,
    duration: '35h',
    level: 'intermediate',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=400&h=300&fit=crop',
    progress: 30,
    rating: 4.9,
    category: 'Backend'
  },
  {
    id: '3',
    title: 'PostgreSQL Database Design',
    description: 'Domine o design e otimização de bancos de dados PostgreSQL para aplicações web.',
    instructor: 'Ana Costa',
    students: 765,
    duration: '25h',
    level: 'advanced',
    thumbnail: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?w=400&h=300&fit=crop',
    progress: 80,
    rating: 4.7,
    category: 'Database'
  },
  {
    id: '4',
    title: 'Full Stack Development',
    description: 'Curso completo de desenvolvimento full stack com React, Node.js e PostgreSQL.',
    instructor: 'Carlos Lima',
    students: 2156,
    duration: '80h',
    level: 'intermediate',
    thumbnail: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=400&h=300&fit=crop',
    rating: 4.9,
    category: 'Full Stack'
  },
  {
    id: '5',
    title: 'TypeScript para React',
    description: 'Aprenda TypeScript aplicado ao desenvolvimento React para códigos mais robustos.',
    instructor: 'Fernanda Oliveira',
    students: 892,
    duration: '30h',
    level: 'intermediate',
    thumbnail: 'https://images.pexels.com/photos/11035665/pexels-photo-11035665.jpeg?w=400&h=300&fit=crop',
    progress: 15,
    rating: 4.8,
    category: 'Frontend'
  },
  {
    id: '6',
    title: 'DevOps com Docker',
    description: 'Containerização e deploy de aplicações usando Docker e ferramentas DevOps.',
    instructor: 'Roberto Silva',
    students: 543,
    duration: '45h',
    level: 'advanced',
    thumbnail: 'https://images.pexels.com/photos/11035437/pexels-photo-11035437.jpeg?w=400&h=300&fit=crop',
    rating: 4.6,
    category: 'DevOps'
  }
];

const CoursesPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'Frontend', 'Backend', 'Database', 'Full Stack', 'DevOps'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('courses.title')}</h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'student' && 'Explore e continue seus cursos'}
            {user?.role === 'teacher' && 'Gerencie seus cursos e crie novo conteúdo'}
            {user?.role === 'admin' && 'Supervisione todos os cursos da plataforma'}
          </p>
        </div>

        {(user?.role === 'teacher' || user?.role === 'admin') && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Curso</span>
          </motion.button>
        )}
      </motion.div>

      {/* Search and Filters */}
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
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                showFilters ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>

            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'Todas as categorias' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === 'all' ? 'Todos os níveis' : 
                         level === 'beginner' ? 'Iniciante' :
                         level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <p className="text-gray-600">
          {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      {/* Courses Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <CourseCard 
              course={course} 
              onClick={() => {/* Navigate to course detail */}}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou termos de busca
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CoursesPage;