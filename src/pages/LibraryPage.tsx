import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Video, 
  Image, 
  File,
  Folder,
  Grid3X3,
  List,
  Upload,
  Star
} from 'lucide-react';

interface LibraryItem {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'image' | 'document' | 'folder';
  size: string;
  date: string;
  course: string;
  downloads: number;
  rating: number;
  thumbnail?: string;
}

const mockLibraryItems: LibraryItem[] = [
  {
    id: '1',
    name: 'React Hooks - Guia Completo',
    type: 'pdf',
    size: '2.4 MB',
    date: '2024-01-15',
    course: 'React.js Fundamentals',
    downloads: 1243,
    rating: 4.8,
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?w=200&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Aula 1 - Introdução ao React',
    type: 'video',
    size: '156 MB',
    date: '2024-01-14',
    course: 'React.js Fundamentals',
    downloads: 987,
    rating: 4.9,
    thumbnail: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=200&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Exercícios Práticos React',
    type: 'document',
    size: '1.1 MB',
    date: '2024-01-13',
    course: 'React.js Fundamentals',
    downloads: 765,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Node.js Express API Examples',
    type: 'folder',
    size: '12.5 MB',
    date: '2024-01-12',
    course: 'Node.js & Express',
    downloads: 532,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Database Schema Diagram',
    type: 'image',
    size: '856 KB',
    date: '2024-01-11',
    course: 'PostgreSQL Database',
    downloads: 432,
    rating: 4.5,
    thumbnail: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?w=200&h=150&fit=crop'
  },
  {
    id: '6',
    name: 'TypeScript Configuration Guide',
    type: 'pdf',
    size: '1.8 MB',
    date: '2024-01-10',
    course: 'TypeScript para React',
    downloads: 698,
    rating: 4.8
  }
];

const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const types = ['all', 'pdf', 'video', 'document', 'image', 'folder'];
  const courses = ['all', 'React.js Fundamentals', 'Node.js & Express', 'PostgreSQL Database', 'TypeScript para React'];

  const filteredItems = mockLibraryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCourse = selectedCourse === 'all' || item.course === selectedCourse;
    return matchesSearch && matchesType && matchesCourse;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'image': return Image;
      case 'folder': return Folder;
      default: return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'image': return 'text-green-600 bg-green-100';
      case 'folder': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
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
          <h1 className="text-3xl font-bold text-gray-900">Biblioteca</h1>
          <p className="text-gray-600 mt-1">Acesse materiais de estudo, vídeos e recursos</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Enviar Arquivo</span>
        </motion.button>
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
                placeholder="Buscar materiais..."
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
                    Tipo de Arquivo
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'Todos os tipos' : 
                         type === 'pdf' ? 'PDF' :
                         type === 'video' ? 'Vídeo' :
                         type === 'document' ? 'Documento' :
                         type === 'image' ? 'Imagem' : 'Pasta'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Curso
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {courses.map(course => (
                      <option key={course} value={course}>
                        {course === 'all' ? 'Todos os cursos' : course}
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
          {filteredItems.length} arquivo{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      {/* Library Items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="relative mb-4">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                        <TypeIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    
                    <div className={`absolute top-2 right-2 p-1 rounded-lg text-xs font-medium ${getTypeColor(item.type)}`}>
                      <TypeIcon className="w-3 h-3" />
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">{item.course}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{item.size}</span>
                    <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredItems.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type);
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.course}</p>
                      </div>
                      
                      <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500">
                        <span>{item.size}</span>
                        <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                        <span>{item.downloads} downloads</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum arquivo encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou termos de busca
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default LibraryPage;